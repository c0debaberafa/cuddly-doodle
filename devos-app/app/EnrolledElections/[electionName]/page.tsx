"use client";
import { useParams } from "next/navigation";
import Ballot from "../../components/Ballot"; // Import your component

export default function ElectionInfo() {
  const params = useParams();
  //const { electionName } = router.query;

  return (
    <div className="h-full p-12 bg-slate-200">
      <Ballot />
    </div>
  );

  // list of pos and candidates, add voter, open election button, number of votes beside candidate
  // getWinner only appears when closed
}
