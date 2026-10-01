import { Routes, Route } from "react-router-dom";

// pages
import Home from "../pages/Home";
import Resume from "../pages/Resume";
import Projects from "../pages/Projects";
import AboutMe from "../pages/AboutMe";
import ViewPDF from "../pages/ViewPDF";

// TODO: Add dashboard and settings routes when implemented
import Dashboard from "../dashboard/Dashboard";
import Settings from "../dashboard/Settings";

export default function Web() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutMe />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/view_pdf" element={<ViewPDF />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<Settings />} />
    </Routes>
  );
}
