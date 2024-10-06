import Ballot from "../components/Ballot";
import SideNavbar from "../components/SideNavbar";

export default function VoterPage() {
    return (
        <div className="p-24">
            <h1 className="text-3xl text-black mb-6">Enrolled Elections</h1>
            <Ballot />
            <div className="mt-8">
                <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
}