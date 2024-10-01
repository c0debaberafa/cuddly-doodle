use anchor_lang::prelude::*;

#[error_code]
pub enum CreateElectionError {
    #[msg("The position is invalid.")]
    InvalidPosition,
    #[msg("The maximum number of candidates has been reached.")]
    MaxCandidatesReached,
    #[msg("The maximum number of positions has been reached.")]
    MaxPositionsReached,
    #[msg("This voter has already been added.")]
    VoterAlreadyAdded,
}

#[error_code]
pub enum VoteError {
    #[msg("Intending to vote on an invalid position.")]
    InvalidPosition,
    #[msg("Intending to vote on an invalid candidate.")]
    InvalidCandidate,
    #[msg("Voter not allowed to vote on this election.")]
    VoterNotAllowed,
    #[msg("Voter has already voted on this position.")]
    AlreadyVoted,
}
