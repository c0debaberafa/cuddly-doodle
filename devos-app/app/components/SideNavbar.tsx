import { FaUser, FaVoteYea, FaWallet } from 'react-icons/fa';

export default function SideNavbar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-20 m-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg">
            <SideBarIcon icon={<FaUser size="28"/>} text={"My Elections"} />
            <SideBarIcon icon={<FaVoteYea size="28"/>} text={"Enrolled Elections"} />
            <SideBarIcon icon={<FaWallet size="28"/>} text={"Phantom Wallet"}/>
        </div>
    );
    
}

const SideBarIcon = ({ icon, text } : { icon:any, text:any}) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);