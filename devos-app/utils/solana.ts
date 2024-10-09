// utils/solanaUtils.ts
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import deriveElectionPDA from "./pdautils";
import { useWallet } from "@solana/wallet-adapter-react";
import { idl, programId } from "./constants";

// Network connection (e.g., devnet or mainnet)
const connection = new Connection("https://api.devnet.solana.com");

// Fetch provider using the wallet from context
const getProvider = (wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  return provider;
};

// Fetch the program
const getProgram = async (provider, idl, programId) => {
  const program = new Program(idl, programId, provider);
  return program;
};

// Function for creating an election
export const createElection = async (
  electionName: string,
  publicKey: PublicKey
) => {
  const provider = getProvider(window.solana); // Use the wallet from the window object
  const program = await getProgram(provider, idl, programId);

  try {
    const electionPDA = await deriveElectionPDA(
      electionName,
      publicKey,
      programId
    );

    const tx = await program.rpc.createElection(electionName, 10, 10, [], {
      accounts: {
        election: electionPDA,
        authority: publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    });

    console.log("Election created successfully. Transaction:", tx);
  } catch (error) {
    console.error("Error creating election:", error);
  }
};

export const addPosition = async (
  electionName: string,
  positionName: string,
  publicKey: PublicKey
) => {
  const provider = getProvider(window.solana); // Use the wallet from the window object
  const program = await getProgram(provider, idl, programId);

  try {
    const electionPDA = await deriveElectionPDA(
      electionName,
      publicKey,
      programId
    );

    const tx = await program.rpc.addPosition(electionName, positionName, {
      accounts: {
        election: electionPDA,
        authority: publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    });

    console.log("Position created successfully. Transaction:", tx);
  } catch (error) {
    console.error("Error creating position:", error);
  }
};

export const addCandidate = async (
  electionName: string,
  positionIndex: number,
  candidateName: string,
  publicKey: PublicKey
) => {
  const provider = getProvider(window.solana); // Use the wallet from the window object
  const program = await getProgram(provider, idl, programId);

  try {
    const electionPDA = await deriveElectionPDA(
      electionName,
      publicKey,
      programId
    );

    const tx = await program.rpc.addCandidate(
      electionName,
      positionIndex,
      candidateName,
      {
        accounts: {
          election: electionPDA,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [],
      }
    );

    console.log("Candidate created successfully. Transaction:", tx);
  } catch (error) {
    console.error("Error creating candidate:", error);
  }
};

// Export connection if needed
export { connection, getProvider, getProgram };
