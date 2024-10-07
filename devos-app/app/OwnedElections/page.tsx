import React from "react";
import ElectionList from "../components/ElectionList"; // Import your component

const OwnedElections = () => {
  return (
    <div className="h-full p-12 bg-slate-200">
      <h1 className="text-3xl text-black mb-6">Owned Elections</h1>
      <hr className="my-3 border-black"></hr>
      <ElectionList />
    </div>
  );
};

export default OwnedElections;
