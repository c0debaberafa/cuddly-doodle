use anchor_lang::prelude::*;

pub mod error;
pub mod states;
use crate::{error::*, states::*};

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("7yd93bBfwbcrPEBKWqDSJ4Q6SLQnQMfNF8EsQy7RTVb2");

#[program]
mod devos {
    use super::*;

    pub fn create_election(
        ctx: Context<CreateElection>,
        election_name: String,
        max_positions: u32,
        max_candidates_per_position: u32,
        voters: Vec<Pubkey>,
    ) -> Result<()> {
        let election = &mut ctx.accounts.election;
        election.authority = *ctx.accounts.authority.key;
        election.election_name = election_name;
        election.positions = Vec::new(); // Initialize with an empty list of positions
        election.max_positions = max_positions;
        election.max_candidates_per_position = max_candidates_per_position;
        election.voters = voters;
        election.votes = Vec::new(); // Initialize with an empty list of votes

        Ok(())
    }

    pub fn add_position(
        ctx: Context<AddPosition>,
        election_name: String,
        position_name: String,
    ) -> Result<()> {
        let election = &mut ctx.accounts.election;

        // Ensure the position is not already in the list
        for position in &election.positions {
            if position.name == position_name {
                return Err(CreateElectionError::PositionAlreadyAdded.into());
            }
        }

        let position = Position {
            name: position_name,
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

        // Ensure the position is not already in the list
        for candidate in &position.candidates {
            if candidate.name == candidate_name {
                return Err(CreateElectionError::CandidateAlreadyAdded.into());
            }
        }

        // Create a new candidate
        let candidate = Candidate {
            name: candidate_name,
            vote_count: 0, // Initialize with 0 votes
        };

        // Add the candidate to the position's list of candidates
        position.candidates.push(candidate);

        Ok(())
    }

    pub fn add_voter(ctx: Context<AddVoter>, election_name: String, voter: Pubkey) -> Result<()> {
        let election = &mut ctx.accounts.election;

        // Ensure the voter is not already in the list
        if election.voters.contains(&voter) {
            return Err(CreateElectionError::VoterAlreadyAdded.into());
        }

        // Add the voter to the voters array
        election.voters.push(voter);

        Ok(())
    }
    pub fn vote(
        ctx: Context<Vote>,
        election_name: String,
        authority: Pubkey,
        position_index: u32,  // Index of the position being voted for
        candidate_index: u32, // Index of the candidate being voted for
    ) -> Result<()> {
        let election = &mut ctx.accounts.election;
        let voter_key = ctx.accounts.voter.key();

        // Ensure the position index is valid
        require!(
            (position_index as usize) < election.positions.len(),
            VoteError::InvalidPosition
        );

        // Ensure the voter is allowed to vote
        require!(
            election.voters.contains(&voter_key),
            VoteError::VoterNotAllowed
        );

        // Ensure the voter has not already voted for this position
        for vote in election.votes.iter() {
            if vote.voter == voter_key && vote.position_index == position_index {
                return Err(VoteError::AlreadyVoted.into());
            }
        }

        // Get the position and candidate
        let position = &mut election.positions[position_index as usize];
        require!(
            (candidate_index as usize) < position.candidates.len(),
            VoteError::InvalidCandidate
        );

        let candidate = &mut position.candidates[candidate_index as usize];

        // Increment the candidate's vote count
        candidate.vote_count += 1;

        // Record the vote in the votes list
        election.votes.push(VoteRecord {
            voter: voter_key,
            position_index,
        });

        Ok(())
    }

}

// --- contexts
#[derive(Accounts)]
#[instruction(
    election_name: String, 
    max_positions: u32, 
    max_candidates_per_position: u32,
    voters:Vec<Pubkey>)]
pub struct CreateElection<'info> {
    #[account(
        init,
        seeds = [election_name.as_bytes(),authority.key().as_ref()],
        bump,
        payer = authority,
        space = Election::calculate_size(
            max_positions as usize, 
            max_candidates_per_position as usize,
            voters))]
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

#[derive(Accounts)]
#[instruction(election_name: String, authority: Pubkey)]
pub struct Vote<'info> {
    #[account(
        mut,
        seeds = [election_name.as_bytes(),authority.key().as_ref()],
        bump, 
        has_one = authority)]
    pub election: Account<'info, Election>,
    pub voter: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(election_name: String)]
pub struct AddVoter<'info> {
    #[account(
        mut,
        seeds = [election_name.as_bytes(),authority.key().as_ref()],
        bump, 
        has_one = authority)]
    pub election: Account<'info, Election>,
    pub authority: Signer<'info>,
}
// end of contexts ---
