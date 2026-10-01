/**
 *
 * Sidebar content
 *
 * primary image
 * menu
 *  - personal info
 *  - Technical skills
 *  - Experiences
 *  - Projects
 *  - Education
 *
 */

import { useState } from "react";
import { Link } from "react-router";

// components
import UploadPrimaryImg from "./components/modals/UploadPrimaryImg";

// assets
import Blank from "../assets/blank.png";
import { useQuery } from "@tanstack/react-query";

// types
import type { PrimaryImg } from "../types/personal.type";

// queries
import { profileImage } from "../queries/upload.queries";

export default function Sidebar() {
  // const queryClient = useQueryClient();
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const { data: primaryImg } = useQuery<PrimaryImg>({
    queryKey: ["primary"],
    queryFn: profileImage,
  });
  return (
    <>
      <div className="px-5 py-5">
        <div className="">
          {primaryImg?.image ? (
            <img
              src={`http://localhost:3221/uploads/${primaryImg.image}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
              onClick={() => setOpenUploadModal(true)}
            />
          ) : (
            <svg onClick={() => setOpenUploadModal(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M17.925 20.056a6 6 0 0 0-11.851.001" /><circle cx="12" cy="11" r="4" /><circle cx="12" cy="12" r="10" /></svg>
          )}
          {/* <img
            src={`http://localhost:3221/uploads/${primaryImg?.image || Blank}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          /> */}
        </div>

        <div className="mt-5">
          <small className="text-xs text-green-500">Menu</small>
          <ul className="mt-3 text-white">
            <li>
              <Link to="/dashboard/settings/#/generate">Generate Resume</Link>
            </li>
            <li>
              <Link to="/dashboard/settings/#/personal">Personal Info</Link>
            </li>
            <li>
              <Link to="/dashboard/settings/#/skills">Technical skills</Link>
            </li>
            <li>
              <Link to="/dashboard/settings/#/experiences">Experiences</Link>
            </li>
            <li>
              <Link to="/dashboard/settings/#/projects">Projects</Link>
            </li>
            <li>
              <Link to="/dashboard/settings/#/education">Education</Link>
            </li>
          </ul>
        </div>
      </div>

      <UploadPrimaryImg
        openUploadModal={openUploadModal}
        setOpenUploadModal={setOpenUploadModal}
      />
    </>
  );
}
