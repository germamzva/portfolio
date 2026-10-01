import React from 'react';

const GenerateResume = () => {
  return (
    <>
      <h1 className="font-bold font-manrope text-white mb-15 text-fsize2">
        <span className="text-green-400 text-5xl">.</span>Generate Resume
      </h1>

      <div className="">
        <form>
          <div className="mt-5 pe-5">
            <label
              htmlFor="about_summary"
              className="block mb-2 text-sm font-medium text-white"
            >
              Paste Your Resume Here
            </label>
            <textarea
              name="generate_resume"
              id="generate_resume"
              cols={30}
              rows={10}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-2.5"

            ></textarea>

          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="bg-white hover:bg-green-400 text-slate-700 hover:text-white transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
            >
              Generate Resume
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default GenerateResume;
