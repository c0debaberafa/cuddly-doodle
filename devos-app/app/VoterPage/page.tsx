
import Ballot from "../components/Ballot";

export default function VoterPage() {
    return (
        <div className="p-12 bg-slate-200">
            <h1 className="text-3xl text-black mb-6">Enrolled Elections</h1>
            <hr className="my-3 border-black"></hr>
            <Ballot />
            <div className="mt-8">
                <button className="bg-gray-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
}