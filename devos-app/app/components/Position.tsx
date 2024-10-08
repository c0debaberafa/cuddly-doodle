import { useState } from "react";

export default function Position() {
  const [positions, setPositions] = useState<Array<{}>>([]);

  const addPosition = () => {
    setPositions([...positions, {}]);
  };

  return (
    <div className="">
      <div className="">
        <label className="block justify-center">Election Name</label>
        <input className="my-4 w-full p-2 mb-2 rounded" type="text" />
        <button
          className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={addPosition}
        >
          Add Position
        </button>
        {positions.map((position, index) => (
          <PositionBox key={index} />
        ))}
      </div>
      <hr className="my-3 border-black"></hr>
      <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded float-right">
        Submit
      </button>
    </div>
  );
}

const PositionBox = ({}) => {
  const [candidates, setCandidates] = useState<string[]>([]);

  const addCandidate = () => {
    setCandidates([...candidates, ""]);
  };

  const handleCandidateChange = (value: string, i: number) => {
    const newCandidates = [...candidates];
    newCandidates[i] = value; // Update the candidate's name in the array
    setCandidates(newCandidates);
  };

  return (
    <div className="justify-center bg-slate-900 text-black p-8 rounded-lg max-w-s m-4 overflow-hidden">
      <input
        className="w-64 p-2 mb-2 rounded"
        type="text"
        placeholder="Position Name"
      />
      {/* <h2 className="text-white my-2">Candidates: </h2> */}
      {candidates.map((candidate, i) => (
        <CandidateField
          key={i}
          index={i}
          value={candidate}
          onChange={(e: any) => handleCandidateChange(e.target.value, i)}
        />
      ))}
      <button
        className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded float-right"
        onClick={addCandidate}
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
  index: any;
  value: any;
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
