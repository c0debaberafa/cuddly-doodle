"use client";
import React from "react";
import Position from "../components/Position";

const EnrolledElections = () => {
  return (
    <div className="p-12 bg-slate-200 h-full">
      <h1 className="text-3xl text-black mb-1">Create Election</h1>
      <p>
        <i>
          You will be able to add voters in the Owned Elections page once the
          election has been created.
        </i>
      </p>
      <hr className="my-3 border-black"></hr>
      <Position />
    </div>
  );
};

export default EnrolledElections;
