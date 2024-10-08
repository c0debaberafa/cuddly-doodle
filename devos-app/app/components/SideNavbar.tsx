"use client";
import React from "react";
import { FaUser, FaVoteYea, FaWallet } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function SideNavbar() {
  const router = useRouter();
  const visitCreatedElections = () => {
    router.push("/OwnedElections"); // Navigate to the "elections" page
  };
  const visitEnrolledElections = () => {
    router.push("/EnrolledElections"); // Navigate to the "elections" page
  };
  const visitCreateElection = () => {
    router.push("/CreateElection");
  }
  const visitWalletPage = () => {
    router.push("/WalletPage"); // Navigate to the "elections" page
  };

  return (
    <div
      className="h-full w-20 m-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg"
    >
      <SideBarIcon
        icon={<FaUser size="28" />}
        text={"Owned Elections"}
        onClick={visitCreatedElections}
      />
      <SideBarIcon
        icon={<FaVoteYea size="28" />}
        text={"Enrolled Elections"}
        onClick={visitEnrolledElections}
      />
      <SideBarIcon
        icon={<FaFileCirclePlus size="28" />}
        text={"Create Election"}
        onClick={visitCreateElection}
      />
      <SideBarIcon
        icon={<FaWallet size="28" />}
        text={"Connect Wallet"}
        onClick={visitWalletPage}
        isBottom
      />
    </div>
  );
}

const SideBarIcon = ({
  icon,
  text,
  isBottom,
  onClick, // Add an onClick prop
}: {
  icon: React.ReactNode;
  text: string;
  isBottom?: boolean;
  onClick?: () => void; // Optional click handler
}) => (
  <div
    className={`sidebar-icon group ${isBottom ? "mt-auto" : ""}`}
    onClick={onClick}
  >
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);
