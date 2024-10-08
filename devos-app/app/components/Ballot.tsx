export default function Ballot() {
  return (
    <div className="">
      <h1 className="text-3xl text-black mb-6">ESC 2024</h1>
      <hr className="my-3 border-black"></hr>
      <div
        className="justify-center bg-slate-900 text-white p-7 rounded-lg max-w-s
                            m-4"
      >
        <h2 className="font-semibold text-lg border-solid border-gray-800">
          President
        </h2>
        <hr className="my-3"></hr>
        <ul className="text-center">
          <li className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="presidentCandidates"
                className="form-radio"
              />
              <span>Candidate 1</span>
            </label>
          </li>
          <li className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="presidentCandidates"
                className="form-radio"
              />
              <span>Candidate 2</span>
            </label>
          </li>
          <li className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="presidentCandidates"
                className="form-radio"
              />
              <span>ABSTAIN</span>
            </label>
          </li>
        </ul>
      </div>
      <div
        className="justify-center bg-slate-900 text-white p-8 rounded-lg max-w-s
                            m-4"
      >
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
      <div className="w-1/2 h-10 bg-green-500 text-[#0c0430] hover:font-bold flex items-center justify-center rounded-lg mx-auto mb-5">
        Vote
      </div>
    </div>
  );
}
