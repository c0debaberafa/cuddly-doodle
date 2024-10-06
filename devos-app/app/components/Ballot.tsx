export default function Ballot() {
    return (
        <div className="">
            <h1 className="text-2xl text-black">ESC 2024</h1>
            <div className="justify-center bg-slate-900 text-white p-7 rounded-3xl max-w-s
                            m-4">
                <h2 className="font-semibold text-lg border-solid border-gray-800">President</h2>
                <hr className="my-3"></hr>
                <ul className="text-center">
                    <li className="mb-2">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="presidentCandidates" className="form-radio" />
                            <span>Candidate 1</span>
                        </label>
                    </li>
                    <li className="mb-2">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="presidentCandidates" className="form-radio" />
                            <span>Candidate 2</span>
                        </label>
                    </li>
                    <li className="mb-2">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="presidentCandidates" className="form-radio" />
                            <span>ABSTAIN</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="justify-center bg-slate-900 text-white p-8 rounded-3xl max-w-s
                            m-4">
                <h2 className="text-lg font-semibold">Vice President</h2>
                <hr className="my-3"></hr>
                <ul className="text-center">
                    <li className="mb-2">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="vpCandidates" className="form-radio" />
                            <span>Candidate 1</span>
                        </label>
                    </li>
                    <li className="mb-2">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="vpCandidates" className="form-radio" />
                            <span>ABSTAIN</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
}