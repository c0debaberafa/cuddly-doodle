"use client";
import React from "react";
import { FaHome, FaUser, FaVoteYea, FaWallet } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SideNavbar() {
  const router = useRouter();
  const visitHome = () => {
    router.push("/"); // Navigate to the "elections" page
  };
  const visitCreatedElections = () => {
    router.push("/OwnedElections"); // Navigate to the "elections" page
  };
  const visitEnrolledElections = () => {
    router.push("/EnrolledElections"); // Navigate to the "elections" page
  };
  const visitWalletPage = () => {
    router.push("/WalletPage"); // Navigate to the "elections" page
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-20 m-0
                 flex flex-col
                bg-[#0c0430] text-white shadow-lg z-50"
    >
      <SideBarIcon
        icon={<FaHome size="28" />}
        text={"Home"}
        onClick={visitHome}
      />
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
