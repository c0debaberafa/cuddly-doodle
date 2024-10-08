'use client';
import { useParams } from 'next/navigation';

export default function ElectionInfo() {
  const params = useParams();
  //const { electionName } = router.query;

  return (
    <div>
      <h1 className="text-2xl text-black">{params.electionName}</h1>
      <div className="justify-center bg-slate-900 text-white p-7 rounded-3xl max-w-s m-4">
        <h2 className="font-semibold text-lg border-solid border-gray-800">President</h2>
        <hr className="my-3"></hr>
        <ul>
          <li className="mb-2">
            <span>Candidate 1 - 15 votes</span>
          </li>
          <li className="mb-2">
            <span>Candidate 2 - 20 votes</span>
          </li>
          <li className="mb-2">
            <span>ABSTAIN - 5 votes</span>
          </li>
        </ul>
        <table>
          <tr>
            <th>Candidates</th>
            <th>24</th>
          </tr>
          <tr>
            <th>Candidate 1</th>
            <th>14</th>
          </tr>
          <tr>
            <th>Abstain</th>
            <th>2</th>
          </tr>
        </table>
      </div>
      <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-5">
        Add Voter
      </button>
      <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded float-right">
        Get Winners
      </button>
    </div>
  );

  // list of pos and candidates, add voter, open election button, number of votes beside candidate
  // getWinner only appears when closed
}