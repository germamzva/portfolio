import { PDFViewer } from '@react-pdf/renderer';

// components
import PDFDocument from './pdfDoc/PDFDocument';

// queries
import { useCurrentUser } from "../utils/useCurrentUser";
import { useResumeInfo } from '../utils/useResumeInfo';

type Props = {
  resumeOpen: boolean;
  setResumeOpen: (open: boolean) => void;
};

export default function Resume({ resumeOpen, setResumeOpen }: Props) {
  const { data: user } = useCurrentUser();
  const { data: resume } = useResumeInfo({ userId: user?._id || "" });

  return (
    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${resumeOpen
          ? "opacity-100 visible bg-black/30"
          : "opacity-0 invisible pointer-events-none"
        }
              `}
    >
      <div
        className={`
                  relative w-full max-w-7xl
                  transition-all duration-300 ease-in-out
                  ${resumeOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
                `}
      >
        <div className="relative bg-white rounded-base shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-900/10 py-4 px-4">

            <h3 className="text-xl font-bold font-manrope">My Resume</h3>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={() => setResumeOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 md:space-y-6">
            <PDFViewer width="100%" className="h-screen overflow-auto">
              <PDFDocument user={user} resume={resume} />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}