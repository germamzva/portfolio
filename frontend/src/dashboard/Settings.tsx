/*

NOTES:

Settings form

About - add, delete, edit
    - form fields ( name, username, email, address, short info )
Experiences - add, delete, edit
Skills - add, delete, edit
Projects - add, delete, edit
Certificates - add, delete, edit
*/

import { useLocation } from "react-router";

// components
import Sidebar from "./Sidebar";
import Personal from "./components/Personal";
import Skills from "../../src/dashboard/components/Skills";
import Experiences from "../../src/dashboard/components/Experiences";
import Projects from "../../src/dashboard/components/Projects";
import Education from "../../src/dashboard/components/Education";
import GenerateResume from "./components/GenerateResume";

export default function Settings() {
  const location = useLocation();

  type Tab = keyof typeof Tab_Components;
  const Tab_Components = {
    "#/generate": <GenerateResume />,
    "#/personal": <Personal />,
    "#/skills": <Skills />,
    "#/experiences": <Experiences />,
    "#/projects": <Projects />,
    "#/education": <Education />,
  };

  const currentTab = Tab_Components[location.hash as Tab] || <Personal />;

  return (
    <>
      <div className="flex flex-row gap-10 relative bg-slate-600/20 mt-30">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4 py-10">{currentTab}</div>
      </div>
    </>
  );
}
