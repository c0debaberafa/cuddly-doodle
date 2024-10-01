use anchor_lang::prelude::*;

pub mod error;
pub mod states;
use crate::{error::*, states::*};

#[program]
mod devos {
    use super::*;

    pub fn create_election(
        ctx: Context<CreateElection>,
        election_name: String,
        max_positions: u32,
        max_candidates_per_position: u32,
    ) -> Result<()> {
        let election = &mut ctx.accounts.election;
        election.authority = *ctx.accounts.authority.key;
        election.election_name = election_name;
        election.positions = Vec::new(); // Initialize with an empty list of positions
        election.max_positions = max_positions;
        election.max_candidates_per_position = max_candidates_per_position;

        Ok(())
    }

    pub fn add_position(
        ctx: Context<AddPosition>,
        election_name: String,
        position_name: String,
    ) -> Result<()> {
        let election = &mut ctx.accounts.election;

        let position = Position {
            position_name,
            candidates: Vec::new(), // Initialize with an empty candidate list
        };

        require!(
            (election.positions.len() + 1) <= (election.max_positions as usize),
            CreateElectionError::MaxPositionsReached
        );
        election.positions.push(position); // Add the position to the election

        Ok(())
    }

    pub fn add_candidate(
        ctx: Context<AddCandidate>,
        election_name: String,
        position_index: u32,    // Index of the position in the positions vector
        candidate_name: String, // Name of the candidate to add
    ) -> Result<()> {
        let election = &mut ctx.accounts.election;
        let max_candidates: u32 = election.max_candidates_per_position;

        // Ensure the position index is valid
        require!(
            (position_index as usize) < election.positions.len(),
            CreateElectionError::InvalidPosition
        );

        // Get the position at the given index
        let position = &mut election.positions[position_index as usize];

        require!(
            (position.candidates.len() + 1) <= (max_candidates as usize),
            CreateElectionError::MaxCandidatesReached
        );

        // Create a new candidate
        let candidate = Candidate {
            name: candidate_name,
            vote_count: 0, // Initialize with 0 votes
        };

        // Add the candidate to the position's list of candidates
        position.candidates.push(candidate);

        Ok(())
    }

}

// --- contexts
#[derive(Accounts)]
#[instruction(election_name: String, max_positions: u32, max_candidates_per_position: u32)]
pub struct CreateElection<'info> {
    #[account(
        init,
        seeds = [election_name.as_bytes(),authority.key().as_ref()],
        bump,
        payer = authority,
        space = Election::calculate_size(max_positions as usize, max_candidates_per_position as usize))]
    pub election: Account<'info, Election>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(election_name: String)]
pub struct AddPosition<'info> {
    #[account(
        mut,
        seeds = [election_name.as_bytes(),authority.key().as_ref()],
        bump, 
        has_one = authority)]
    pub election: Account<'info, Election>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(election_name: String)]
pub struct AddCandidate<'info> {
    #[account(
        mut,
        seeds = [election_name.as_bytes(),authority.key().as_ref()],
        bump,
        has_one = authority)]
    pub election: Account<'info, Election>,
    pub authority: Signer<'info>,
}
// end of contexts ---
