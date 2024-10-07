import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

const WalletProviderComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const endpoint = clusterApiUrl("devnet"); // Change to "mainnet-beta" for production
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProviderComponent;
