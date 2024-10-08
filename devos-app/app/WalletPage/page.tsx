"use client";
import React, { useState, useEffect } from "react";

const WalletPage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Check if wallet is already connected (on component mount)
  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window !== "undefined") {
      const savedPublicKey = localStorage.getItem("publicKey");
      const savedWalletConnected = localStorage.getItem("walletConnected");

      // Check if we have stored a publicKey and connection status
      if (savedPublicKey && savedWalletConnected === "true") {
        setPublicKey(savedPublicKey);
        setWalletConnected(true);
      }
    }
  }, []);

  const handleClick = async () => {
    if (typeof window !== "undefined" && window.solana) {
      try {
        // Request wallet connection
        const response = await window.solana.request({ method: "connect" });
        console.log(response);

        // Check if the wallet is connected and get the public key
        if (window.solana.isConnected) {
          const publicKey = window.solana.publicKey.toString();
          setPublicKey(publicKey); // Save the public key
          setWalletConnected(true); // Update the connection status

          // Persist the public key and connection status in localStorage
          localStorage.setItem("publicKey", publicKey);
          localStorage.setItem("walletConnected", "true");

          setError("");
          console.log("Wallet connected with public key:", publicKey);
        } else {
          console.log("Wallet connection failed");
          setWalletConnected(false);
          setError("Wallet connection failed");
        }
      } catch (err) {
        console.error("Connection failed", err);
        setError("Connection failed. Please try again.");
      }
    } else {
      console.error("Phantom wallet not found");
      setError("Phantom wallet not found");
    }
  };

  return (
    <div className="h-full p-12 bg-slate-200">
      <h1 className="text-3xl text-black mb-6">Wallet Page</h1>
      <hr className="my-3 border-black"></hr>
      <div>
        <div
          className={`w-full h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
            walletConnected
              ? "bg-green-500 text-white"
              : "bg-[#0c0430] text-white hover:bg-purple-600"
          }`}
          onClick={handleClick}
        >
          {walletConnected
            ? `Connected: ${publicKey}`
            : error
            ? error
            : "Click to Connect Wallet"}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
