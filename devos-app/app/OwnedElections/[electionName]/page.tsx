"use client";
import { useParams } from "next/navigation";

export default function ElectionInfo() {
  const params = useParams();
  //const { electionName } = router.query;

  return (
    <div className="p-12 h-full bg-slate-200">
      <h1 className="text-3xl text-black">{params.electionName}</h1>
      <hr className="my-3 border-black"></hr>
      <div className="justify-center bg-slate-900 text-white p-7 rounded-lg max-w-s m-4">
        <PositionTable positionName="President" />
        <PositionTable positionName="Secretary" />
        <VoterInfo voterCount={42} />
      </div>
      <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded float-right m-4">
        Get Winners
      </button>
    </div>
  );

  // list of pos and candidates, add voter, open election button, number of votes beside candidate
  // getWinner only appears when closed
}

const PositionTable = ({ positionName }: { positionName: string }) => (
  <div className="mt-4">
    <h2 className="font-semibold text-lg border-solid border-gray-800">
      {positionName}
    </h2>
    <table className="border-white border-solid border-4 my-6 w-full">
      <tbody>
        <tr className="tableData">
          <th className="tableData">Candidates</th>
          <th className="tableData">Votes</th>
        </tr>
        <tr className="tableData">
          <th className="font-light tableData">Juan Dela Cruz</th>
          <th className="font-light tableData">14</th>
        </tr>
        <tr className="tableData">
          <th className="font-light tableData">Jose Rizal</th>
          <th className="font-light tableData">40</th>
        </tr>
        <tr className="tableData">
          <th className="font-light tableData">Abstain</th>
          <th className="font-light tableData">2</th>
        </tr>
      </tbody>
    </table>
    <hr className="my-3"></hr>
  </div>
);

const VoterInfo = ({ voterCount }: { voterCount: any }) => (
  <div>
    <h2 className="font-semibold text-lg mb-4">Voters</h2>
    <h2 className="text-base border-solid border-gray-800 mb-2">
      Voter Count: {voterCount}
    </h2>
    <div className="p-2 text-black bg-slate-300 w-auto h-40 overflow-auto">
      BnSbhJfrKtCXH2RTN7RGdZDgdUV4527ygPB WEo1qPH8uKFDHHQPbh23ghR1tXh6roRvVtz
      3a0ROrFOMfQQskfbJjVbwVb9kYDoUZp9VAp Eg5uJhKXAFG2wTtemV8VUOKquSZqSr1zFFS
      K35AQRuqFwHtmZFrncKQnR6pPqKjyNMB4JV RUWwOCQZfh4mMmsZJDeZqYXtf1dQahbhKJw
      7VeccDxEGyuwX2H1VTnURrPwPYpNOe2voYZ zPdR4rGS5bmDvtFYmnWaDDqRorBOoCy6bH1
      uVdjQnZMey3j61qYk4wXcuJTe6BSGBK77k3 EzW5EBGhH3qB75ejOUF6FgmoaYyVDDHZdbT
      qGpV8rp5RoYF2EaUuKDKWa3kAvmBmubYrJf xxfwFdhKCmrCkDgW8OjAAQ0zA2MMQ7c3qdh
      O3eKA4aOhjY46d4d6sYNTDRnO4TpwoOWjfN bEF7X9RrogpdHYu9OAZjkw6aT9VNc5jn46d
      y2nkXCf9jBKYrWYxYJ83PcBE8Nz00BMyrfj PzJUKdte4qtsv5kK2RtGnaV1fWKB7Ze0eqs
      1zf5mUvMWFz3bHHcs24n62XoHAFmFGBUK85 oFvnThcdAduHweRwoEM8engne7gTGmrNQqY
    </div>
    <div className="inline">
      <input
        className="text-black my-4 p-2 mb-2 rounded mr-4"
        type="text"
        placeholder="Voter Address"
      />
      <button className="mt-4 bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-5">
        Add Voter
      </button>
    </div>
  </div>
);
