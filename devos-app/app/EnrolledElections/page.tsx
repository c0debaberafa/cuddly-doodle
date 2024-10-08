"use client";
import React from "react";
import { useRouter } from "next/navigation";

const EnrolledElections = () => {
  const router = useRouter();

  const navigate = (electionName: string) => {
    router.push(`/EnrolledElections/${electionName}`);
  };

  return (
    <div className="h-full p-12 bg-slate-200">
      <h1 className="text-3xl text-black mb-1">Enrolled Elections</h1>
      <p>
        <i>
          This is the list of all elections you have been added to and are
          eligible to vote in.
        </i>
      </p>
      <p>
        <i>Only the owner of an election can add voters to their election.</i>
      </p>
      <hr className="my-3 border-black"></hr>
      <div className="mt-5">
        <div>
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

export default EnrolledElections;
