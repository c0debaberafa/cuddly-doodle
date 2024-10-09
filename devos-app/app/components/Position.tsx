import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { createElection, addPosition, addCandidate } from "@/utils/solana";

export default function Position() {
  const [electionName, setElectionName] = useState<string>("");
  const [positions, setPositions] = useState<
    Array<{ positionName: string; candidates: string[] }>
  >([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const addPositionF = () => {
    setPositions([...positions, { positionName: "", candidates: [""] }]);
  };

  const handleElectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElectionName(e.target.value);
  };

  const handleSubmit = async () => {
    const electionData = {
      electionName,
      positions,
    };
    console.log("Submitting election data: ", electionData);

    // createElection(electionName)
    try {
      await createElection(electionName, publicKey);
      console.log("Election creation request sent.");
    } catch (error) {
      console.error("Error creating election: ", error);
    }

    // loop addPosition
    try {
      for (var i = 0; i < positions.length; i++) {
        console.log(positions[i]);
        await addPosition(electionName, positions[i].positionName, publicKey);
        console.log("Done");
      }
    } catch (error) {
      console.error("Error adding position: ", error);
    }

    // loop addCandidate
    try {
      for (var i = 0; i < positions.length; i++) {
        for (var j = 0; j < positions[i].candidates.length; j++) {
          console.log(positions[i].candidates[j]);
          await addCandidate(
            electionName,
            i,
            positions[i].candidates[j],
            publicKey
          );
          console.log("Done");
        }
      }
    } catch (error) {
      console.error("Error adding position: ", error);
    }

    setShowSuccess(true);

    // Optionally, hide the popup after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  const { publicKey } = useWallet();

  return (
    <div className="">
      <div className="">
        <h1>Hello: </h1>
        {publicKey ? (
          <p>Public Key: {publicKey.toBase58()}</p>
        ) : (
          <p>Not connected to a wallet.</p>
        )}
        <label className="block justify-center">Election Name</label>
        <input
          className="my-4 w-full p-2 mb-2 rounded"
          type="text"
          value={electionName}
          onChange={handleElectionNameChange}
        />
        <button
          className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={addPositionF}
        >
          Add Position
        </button>
        {positions.map((position, index) => (
          <PositionBox
            key={index}
            index={index}
            position={position}
            updatePosition={(updatedPosition) => {
              const newPositions = [...positions];
              newPositions[index] = updatedPosition;
              setPositions(newPositions);
            }}
          />
        ))}
      </div>
      <hr className="my-3 border-black"></hr>
      <button
        className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded float-right"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {showSuccess && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Success!</h2>
            <p>The election has been created successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const PositionBox = ({
  index,
  position,
  updatePosition,
}: {
  index: number;
  position: { positionName: string; candidates: string[] };
  updatePosition: (position: {
    positionName: string;
    candidates: string[];
  }) => void;
}) => {
  const handlePositionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePosition({ ...position, positionName: e.target.value });
  };

  const addCandidateF = () => {
    updatePosition({
      ...position,
      candidates: [...position.candidates, ""],
    });
  };

  const handleCandidateChange = (value: string, i: number) => {
    const newCandidates = [...position.candidates];
    newCandidates[i] = value; // Update the candidate's name in the array
    updatePosition({ ...position, candidates: newCandidates });
  };

  return (
    <div className="justify-center bg-slate-900 text-black p-8 rounded-lg max-w-s m-4 overflow-hidden">
      <input
        className="w-64 p-2 mb-2 rounded"
        type="text"
        placeholder="Position Name"
        value={position.positionName}
        onChange={handlePositionNameChange}
      />
      {position.candidates.map((candidate, i) => (
        <CandidateField
          key={i}
          index={i}
          value={candidate}
          onChange={(e: any) => handleCandidateChange(e.target.value, i)}
        />
      ))}
      <button
        className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded float-right"
        onClick={addCandidateF}
      >
        Add Candidate
      </button>
    </div>
  );
};

const CandidateField = ({
  index,
  value,
  onChange,
}: {
  index: number;
  value: string;
  onChange: any;
}) => (
  <div className="my-2">
    <label className="text-white">Candidate {index + 1}: </label>
    <input
      className="w-full p-2 mb-2 rounded"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Candidate Name"
    />
  </div>
);
