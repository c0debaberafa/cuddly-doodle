use anchor_lang::prelude::*;

// --- states
#[account]
pub struct Election {
    pub authority: Pubkey,        // The account that controls the election
    pub election_name: String,    // Name of the election
    pub positions: Vec<Position>, // List of positions
    pub max_positions: u32,
    pub max_candidates_per_position: u32,
    pub voters: Vec<Pubkey>,
    pub votes: Vec<VoteRecord>,
    pub is_open: bool,
}
impl Election {
    pub fn calculate_size(
        max_positions: usize,
        max_candidates_per_position: usize,
        voters: Vec<Pubkey>,
    ) -> usize {
        let num_voters = voters.len();
        let base_size = 8 + 1 + 1 // Discriminator (for the Election account) + bool
            + 32           // Pubkey for authority
            + 4 + 32       // String: length prefix (4 bytes) + max length of election_name (32 bytes)
            + 4; // Vec<Position> prefix (4 bytes for length of positions vector)

        let position_size = 4 + 32  // String: length prefix (4 bytes) + position_name (32 bytes)
            + 4                     // Vec<Candidate> prefix
            + (4 + 32 + 8) * max_candidates_per_position; // Each candidate: 4 bytes (prefix) + name (32 bytes) + vote_count (u64)
        let voter_size = 4 + 32 * num_voters * 2; //vector of voters
        let vote_size = 4 + (32 + 4) * num_voters; //vector of votes, assuming it is equal to the number of voters
        base_size + max_positions * position_size + voter_size + vote_size
    }
}
// The Position state, nested in the Election
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Position {
    pub name: String,               // Name of the position
    pub candidates: Vec<Candidate>, // List of candidates for the position
}

// The Candidate state, nested in a Position
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Candidate {
    pub name: String,    // Candidate's name
    pub vote_count: u64, // Number of votes received by the candidate
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct VoteRecord {
    pub voter: Pubkey,       // Voter who cast the vote
    pub position_index: u32, // The index of the position voted on
}

// end of states ---
