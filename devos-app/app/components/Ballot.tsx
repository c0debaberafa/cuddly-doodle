export default function Ballot() {
    return (
        <div className="">
            <h1 className="text-3xl text-black">ESC 2024</h1>
            <div className="justify-center bg-slate-900 text-white p-8 rounded-3xl max-w-s
                            m-4">
                <h2 className="text-lg">Presidents</h2>
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
                <h2 className="text-lg">Vice President</h2>
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