// components
import Coding from "../assets/me.png";
import Experiences from "../components/Experiences";

// queries  
import { useCurrentUser } from "../utils/useCurrentUser";
import { useResumeInfo } from "../utils/useResumeInfo";

// types
type roles = {
  role: string;
};

const stripHtml = (html?: string) => {
  if (!html) return "";

  const doc = new DOMParser().parseFromString(html, "text/html");

  return (doc.body.textContent || "")
    .replace(/\u00A0/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// constants
const roles: roles[] = [
  { role: "Fullstack" },
  { role: "Frontend" },
  { role: "Backend" },
  { role: "Wordpress" },
];

export default function Home() {

  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: resume, isLoading: resumeLoading } = useResumeInfo({ userId: user?._id || "" });

  if (userLoading || resumeLoading) {
    return <div className="mt-5 text-white text-2xl">Loading...</div>;
  }

  if (!user || !resume) {
    return <div className="mt-5 text-white text-2xl">User or resume not found</div>;
  }

  return (
    <>
      <section className="flex flex-col py-10 px-5 md:px-0 md:flex-row items-center justify-between">
        <div className="w-full md:w-3/5 sm:w-full text-center md:text-left">
          <h1 className="font-bold font-manrope text-white dark:text-green-400 mb-5 capitalize text-center md:text-left">
            <span className="text-green-400 dark:text-white text-5xl capitalize">.</span>Hello I'm {resume?.resumeInfo?.personalInfo?.[0]?.fullname ?? ""}
          </h1>
          <p className="mb-5 text-3xl md:text-6xl text-green-400 font-sora text-center md:text-left">
            {resume?.resumeInfo?.personalInfo?.[0]?.position ?? ""}
          </p>
          <p className="text-white font-manrope text-fsize3 text-center md:text-left">
            {/* strip html tags and nbsp */}
            {stripHtml(resume?.resumeInfo?.personalInfo?.[0]?.about_summary)}
          </p>

          <button className="bg-white font-mono dark:bg-slate-800 hover:bg-green-400 text-slate-700 dark:text-slate-200 hover:text-white transition font-bold py-2 px-6 rounded-4xl uppercase tracking-widest mt-5  text-center md:text-left">
            Hire Me
          </button>
        </div>
        <div className="w-full md:w-1/3 sm:w-full flex items-center justify-center sm:justify-center">
          <div className="flex items-center justify-center p-6">
            <div className="relative w-90 rounded-3xl border border-white/10 dark:border-slate-300/20 bg-slate-600/20 dark:bg-amber-50/30 overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,120,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,120,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

              <div className="relative z-10 p-0">
                <img
                  src={Coding}
                  alt="Coding"
                  className="w-full h-full object-cover"
                />

                {/* Email */}
                {/* <div className="mt-8 text-center">
                  <a
                    href="mailto:themesflat@gmail.com"
                    className="text-xl text-white underline underline-offset-4 hover:text-green-400 transition"
                  >
                    ranfeche@gmail.com
                  </a>

                  <p className="mt-4 text-gray-500 text-sm">
                    Esmeralda Residenses, Apokon, Tagum City
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <About /> */}

      <Experiences resume={resume} />
    </>
  );
}
