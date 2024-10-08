use anchor_lang::prelude::*;

pub mod error;
pub mod states;
use crate::{error::*, states::*};

// This is your program's public key and it will update
// automatically when you build the project.
//declare_id!("BxDGERvn12dMHLgUZttnPSLGy9wCUfZJi7da8K2qf1xX"); //sol-pg
//declare_id!("23Z7Jqq6LYZeSts5KJeQMyFsB9HMB7CxEZbqJ9uNkrEc"); //anchor-init

declare_id!("EP24aYmcChzvMHYSmi4SzEcuGLBm8xJJ6ijsXkv4Naj3"); //after-deploy


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
        election.max_candidates_per_position = max_candidates_per_position + 1; //to account for abstain
        election.voters = voters;
        election.votes = Vec::new(); // Initialize with an empty list of votes
        election.winners = Vec::new(); //initialize with an empty list of winners
        election.is_open = false; //Initialize election as closed

        Ok(())
    }

    pub fn add_position(
        ctx: Context<AddPosition>,
        election_name: String,
        position_name: String,
    ) -> Result<()> {
        let election = &mut ctx.accounts.election;

        // Ensure the signer is the authority
        require!(
            ctx.accounts.authority.key() == election.authority,
            CreateElectionError::Unauthorized
        );

        // Ensure the election is closed before adding position
        require!(
            election.is_open == false,
            CreateElectionError::ElectionIsOpen
        );

        // Ensure the position is not already in the list
        for position in &election.positions {
            if position.name == position_name {
                return Err(CreateElectionError::PositionAlreadyAdded.into());
            }
        }

        let position = Position {
            name: position_name,
            candidates: vec![Candidate {
                name: String::from("Abstain"),
                vote_count: 0,
            }], // Initialize the "Abstain" candidate properly
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

        // Ensure the signer is the authority
        require!(
            ctx.accounts.authority.key() == election.authority,
            CreateElectionError::Unauthorized
        );

        // Ensure the election is closed before adding candidate
        require!(
            election.is_open == false,
            CreateElectionError::ElectionIsOpen
        );

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

        // Insert the new candidate just before the "Abstain" candidate
        let abstain_index = position
            .candidates
            .iter()
            .position(|c| c.name == "Abstain")
            .unwrap();
        position.candidates.insert(abstain_index, candidate);

        Ok(())
    }

    pub fn add_voter(ctx: Context<AddVoter>, election_name: String, voter: Pubkey) -> Result<()> {
        let election = &mut ctx.accounts.election;

        // Ensure the signer is the authority
        require!(
            ctx.accounts.authority.key() == election.authority,
            CreateElectionError::Unauthorized
        );

        // Ensure the election is closed before adding voter
        require!(
            election.is_open == false,
            CreateElectionError::ElectionIsOpen
        );

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

        // Ensure the election is open before voting
        require!(election.is_open == true, VoteError::ElectionIsClosed);

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
            candidate_index,
        });

        Ok(())
    }

    pub fn tally_votes(ctx: Context<TallyVotes>, election_name: String) -> Result<()> {
        let election = &ctx.accounts.election; //does not need to be mutable

        // Ensure the signer is the authority
        require!(
            ctx.accounts.authority.key() == election.authority,
            VoteError::Unauthorized
        );

        // Iterate over all positions
        for (position_index, position) in election.positions.iter().enumerate() {
            msg!("Position {}: {}", position_index, position.name);

            // Iterate over all candidates in the position
            for (candidate_index, candidate) in position.candidates.iter().enumerate() {
                msg!(
                    "  Candidate {}: {} has {} votes",
                    candidate_index,
                    candidate.name,
                    candidate.vote_count
                );
            }
        }

        Ok(())
    }

    pub fn get_winner(ctx: Context<GetWinner>, election_name: String) -> Result<()> {
        let election = &mut ctx.accounts.election;

        // Ensure the signer is the authority
        require!(
            ctx.accounts.authority.key() == election.authority,
            VoteError::Unauthorized
        );

        // Ensure the election is closed before getting winners
        require!(election.is_open == false, GetWinnerError::ElectionIsOpen);

        let mut winners: Vec<Winner> = Vec::new(); // Updated to store multiple winners

        for position in &election.positions {
            let mut max_vote_count: u64 = 0;
            let mut top_candidates: Vec<String> = Vec::new();

            for candidate in &position.candidates {
                if candidate.vote_count > max_vote_count {
                    // Found a new candidate with the highest votes, reset the top candidates list
                    max_vote_count = candidate.vote_count;
                    top_candidates.clear();
                    top_candidates.push(candidate.name.clone());
                } else if candidate.vote_count == max_vote_count {
                    // Tie detected, add this candidate to the top candidates list
                    top_candidates.push(candidate.name.clone());
                }
            }

            // If there are candidates tied for the top position, record them
            if !top_candidates.is_empty() {
                winners.push(Winner {
                    position_name: position.name.clone(),
                    candidate_names: top_candidates, // Store the list of tied candidates
                });
            }
        }

        // Store the winners in the election account
        election.winners = winners;

        Ok(())
    }

    pub fn toggle_election(ctx: Context<ToggleElection>, election_name: String) -> Result<()> {
        let election = &mut ctx.accounts.election;

        // Ensure the signer is the authority
        require!(
            ctx.accounts.authority.key() == election.authority,
            CreateElectionError::Unauthorized
        );

        election.is_open = !election.is_open;
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
            realloc = Election::calculate_size(
                election.max_positions as usize,
                election.max_candidates_per_position as usize,
                election.voters.clone()),
            realloc::payer = authority,
            realloc::zero = true,
            has_one = authority)]
    pub election: Account<'info, Election>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(election_name: String)]
pub struct TallyVotes<'info> {
    #[account(
            seeds = [election_name.as_bytes(),authority.key().as_ref()],
            bump)]
    pub election: Account<'info, Election>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(election_name: String)]
pub struct GetWinner<'info> {
    #[account(
            mut,
            seeds = [election_name.as_bytes(),authority.key().as_ref()],
            bump)]
    pub election: Account<'info, Election>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(election_name: String)]
pub struct ToggleElection<'info> {
    #[account(
            mut,
            seeds = [election_name.as_bytes(),authority.key().as_ref()],
            bump)]
    pub election: Account<'info, Election>,
    pub authority: Signer<'info>,
}
// end of contexts ---
