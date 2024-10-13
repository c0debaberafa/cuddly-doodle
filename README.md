# DEVOS
### Components
```
Voting Smart Contract (Rust)
  - Initialize Voting
    - Set up candidates and initialize the voting session
  - Cast Vote
    - Allow users to cast their vote
    - Ensure each user votes only once
  - Tally Votes
    - After voting ends, tally results and declare results
  -Polling / Ballot Status?

Frontend (JavaScript / Next.js / Node.js, Vercel / React)
  - Connect Wallet 
  - View Candidates
  - Cast Votes
  - View Election Results

```
### How to Run
1. Open the website at https://devos-app.vercel.app/
2. Connect your wallet.
3. Go to the Owned Elections page to create a new election.
4. Input the election name, add positions and candidates as necessary, and click submit.
5. You will need to confirm transactions one by one, ensure there is adequate SOL in your wallet.
6. To see the individual transactions, open the browser console.
7. Alternatively, you can also use solana playground to verify that the election, position, and candidates are being added. Simply change the program ID to "EP24aYmcChzvMHYSmi4SzEcuGLBm8xJJ6ijsXkv4Naj3" and find the election among the list, or fetch it using the public key.
