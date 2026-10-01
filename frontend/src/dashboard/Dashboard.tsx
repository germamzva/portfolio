import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-row gap-10 relative bg-slate-600/20 mt-30">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4  pt-10">
          <h1 className="font-bold font-manrope text-white mb-15 text-fsize2">
            <span className="text-green-400 text-5xl">.</span>Dashboard
          </h1>

          <h1 className="font-bold font-manrope text-white mb-15 text-fsize2">
            <span className="text-green-400 text-5xl">.</span>Contacts List
          </h1>
        </div>
      </div>
    </>
  );
}
