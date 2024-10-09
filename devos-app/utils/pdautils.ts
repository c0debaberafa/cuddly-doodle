import { PublicKey } from "@solana/web3.js";

// Function to derive the PDA
const deriveElectionPDA = async (electionName, authorityPubkey, programId) => {
  const [pda, bump] = await PublicKey.findProgramAddress(
    [
      Buffer.from(electionName), // Seed 1: election_name
      authorityPubkey.toBuffer(), // Seed 2: authority's public key
    ],
    programId // Program ID of your Solana Anchor program
  );
  return pda;
};

export default deriveElectionPDA;
