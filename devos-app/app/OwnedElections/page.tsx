"use client";
import React from "react";
import { useRouter } from "next/navigation";

const OwnedElections = () => {
  const router = useRouter();

  const navigate = (electionName: string) => {
    router.push(`/OwnedElections/${electionName}`);
  };

  return (
    <div className="h-full p-12 bg-slate-200">
      <h1 className="text-3xl text-black mb-1">Owned Elections</h1>
      <p>
        <i>This is the list of all elections you have created.</i>
      </p>
      <hr className="my-3 border-black"></hr>
      <div className="mt-5 justify-center">
        <div>
          <div
            onClick={() => router.push(`/CreateElection`)}
            className="w-1/2 h-10 bg-green-500 text-[#0c0430] hover:font-bold flex items-center justify-center rounded-lg mx-auto mb-5"
          >
            Create New Election
          </div>
          <div>
            <div
              onClick={() => navigate("Election1")}
              className="w-full h-20 bg-[#0c0430] hover:bg-green-500 text-white hover:text-[#0c0430] hover:font-bold flex items-center justify-center rounded-lg mb-5"
            >
              Election 1
            </div>
            <div
              onClick={() => navigate("Election2")}
              className="w-full h-20 bg-[#0c0430] hover:bg-green-500 text-white hover:text-[#0c0430] hover:font-bold flex items-center justify-center rounded-lg mb-5"
            >
              Election 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedElections;
