'use client';
import { useRouter } from 'next/navigation';

export default function ElectionList() {
  const router = useRouter();

  const navigate = (electionName: string) => {
    router.push(`/OwnedElections/${electionName}`);
  };

  return (
    <div>
      {/* <div className="justify-center bg-slate-900 text-white p-7 rounded-3xl max-w-s m-4">
      <h1 className="text-2xl text-white">ESC 2024</h1>
        <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-5">
          Add Voter
        </button>
        <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
          Tally Votes
        </button>
      </div> */}
      <div>
        <div 
          onClick={() => navigate('Election1')}
          className="w-full h-20 bg-[#0c0430] hover:bg-green-500 text-white hover:text-[#0c0430] flex items-center justify-center rounded-lg mb-5"
        >
          Election 1
        </div>
        <div 
          onClick={() => navigate('Election2')}
          className="w-full h-20 bg-[#0c0430] hover:bg-green-500 text-white hover:text-[#0c0430] flex items-center justify-center rounded-lg"
        >
          Election 2
        </div>
      </div>
    </div>
  );
}
