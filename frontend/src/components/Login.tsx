import React from "react";

// queries
import { getAuth } from "../queries/auth.queries";

type Props = {
  loginOpen: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ loginOpen, setLoginOpen }: Props) {
  const googleLogin = async () => {
    const data = await getAuth();
    if (data && data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${
                  loginOpen
                    ? "opacity-100 visible bg-black/30"
                    : "opacity-0 invisible pointer-events-none"
                }
              `}
    >
      <div
        className={`
                  relative p-5 w-full max-w-2xl
                  transition-all duration-300 ease-in-out
                  ${loginOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
                `}
      >
        <div className="relative bg-white border border-gray-900/10 rounded-base shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-900/10 py-4 px-4">
            <strong className="font-bold text-xl text-center block w-full">
              Welcome to Resume Builder
            </strong>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={() => setLoginOpen(false)}
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
          <div className="border-white/10 px-4">
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="pb-5">
                <p>
                  Sign in to your account and create your resume in minutes.
                </p>
              </div>

              <button
                type="button"
                onClick={googleLogin}
                className="flex items-center justify-center gap-5 bg-gray-50 border border-gray-300 text-gray-900 hover:text-slate-700 transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                </svg>{" "}
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
