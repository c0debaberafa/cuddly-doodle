import { FaUser, FaVoteYea, FaWallet } from "react-icons/fa";

export default function SideNavbar() {
  return (
    <div
      className="h-full w-20 m-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg"
    >
      <SideBarIcon icon={<FaUser size="28" />} text={"My Elections"} />
      <SideBarIcon icon={<FaVoteYea size="28" />} text={"Enrolled Elections"} />
      <SideBarIcon
        icon={<FaWallet size="28" />}
        text={"Phantom Wallet"}
        isBottom
      />
    </div>
  );
}

interface SideBarIconProps {
  icon: React.ReactNode;
  text: string;
  isBottom?: boolean;
}

const SideBarIcon = ({ icon, text, isBottom }: SideBarIconProps) => (
  <div className={`sidebar-icon group ${isBottom ? "mt-auto" : ""}`}>
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);
