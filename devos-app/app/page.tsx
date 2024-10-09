"use client";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-6 bg-slate-300">
      <h1 className="font-mono text-6xl font-bold">Create. Vote. Secure.</h1>
      <div className="mt-6 w-1/2">
        <p className="mb-4">
          Devos provides a platform that create elections that are fast
          yet secure, with the use of the Solana blockchain. Connect your
          Phantom Wallet to get started and join the wave.
        </p>
        <WalletMultiButton style={{}} />
      </div>
      
    </div>
  );
}
