use anchor_lang::prelude::*;

#[error_code]
pub enum CreateElectionError {
    #[msg("The position is invalid.")]
    InvalidPosition,
    #[msg("The maximum number of candidates has been reached.")]
    MaxCandidatesReached,
    #[msg("The maximum number of positions has been reached.")]
    MaxPositionsReached,
    #[msg("This position has already been added.")]
    PositionAlreadyAdded,
    #[msg("This candidate has already been added.")]
    CandidateAlreadyAdded,
    #[msg("This voter has already been added.")]
    VoterAlreadyAdded,
    #[msg("This user is unauthorized.")]
    Unauthorized,
    #[msg("This election is open, no candidates or positions can be added.")]
    ElectionIsOpen,
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
    #[msg("This user is unauthorized.")]
    Unauthorized,
    #[msg("This election is closed.")]
    ElectionIsClosed,
}

#[error_code]
pub enum GetWinnerError {
    #[msg("Election is still open.")]
    ElectionIsOpen,
}
