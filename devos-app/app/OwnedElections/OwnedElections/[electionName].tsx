import { useRouter } from 'next/router';

export default function ElectionInfo() {
  const router = useRouter();
  const { electionName } = router.query;

  return (
    <div>
      <h1 className="text-2xl font-bold">Details for {electionName}</h1>
      <p>This is the page for election: {electionName}</p>
    </div>
  );

  // list of pos and candidates, add voter, open election button, number of votes beside candidate
  // getWinner only appears when closed
}