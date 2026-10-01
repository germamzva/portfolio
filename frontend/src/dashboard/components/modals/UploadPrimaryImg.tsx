import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

// queries
import { uploadImage } from "../../../queries/upload.queries";

type Props = {
  openUploadModal: boolean;
  setOpenUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UploadPrimaryImg({
  openUploadModal,
  setOpenUploadModal,
}: Props) {
  const queryClient = useQueryClient();
  const [msg, setMsg] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const { mutate: addPrimaryImg } = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.error(error);
      setMsg("Failed to upload image");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["primary"] });
    },
  });

  // input file handle change
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFile(file || null);
  }

  // remove uploaded file
  function handleDeleteUpload() {
    setFile(null);
  }

  function handleCloseUploadPrimaryModal() {
    setOpenUploadModal(false);
    setFile(null);
  }

  // submit handle
  function handleSubmitUploadPrimaryImg(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setMsg("Please select a file");
      return;
    }
    addPrimaryImg(file);
  }

  return (

    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${openUploadModal
          ? "opacity-100 visible bg-black/30"
          : "opacity-0 invisible pointer-events-none"
        }
              `}
    >
      <div
        className={`
                  relative p-5 w-full max-w-4xl
                  transition-all duration-300 ease-in-out
                  ${openUploadModal ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
                `}
      >
        <div className="relative bg-white border border-gray-900/10 rounded-base shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-900/10 py-4 px-4">
            <strong className="font-bold text-xl text-center">
              Upload Profile Picture
            </strong>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={handleCloseUploadPrimaryModal}
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
            {msg && <p className="text-red-500">{msg}</p>}
            <form onSubmit={handleSubmitUploadPrimaryImg}>
              {/* <label htmlFor="file" className="block mb-2">
                Select Image <span className="text-red-500">*</span>
                <small className="text-xs text-gray-500 block">
                  Filetypes allow: jpeg, png, gif
                </small>
              </label> */}
              <div className="mb-7">
                {/* design input file with an icon in the middle */}
                <div className="relative">
                  <label className="flex mt-5 h-48 w-full cursor-pointer flex-col items-center justify-center border border-dashed border-stone-300 bg-white transition hover:bg-green-50">
                    <input
                      type="file"
                      name="file"
                      accept="image/jpeg,image/png,image/gif"
                      className="w-full border hidden border-gray-900/10 rounded-base p-2 focus:outline-none focus:ring-2 focus:ring-green-400 "
                      onChange={handleFileChange}
                    />

                    <span className="text-lg font-bold text-gray-900">Upload your file here</span>
                    <span className="mt-1 text-xs text-gray-500">Files supported: JPG, PNG, GIF</span>
                    {/* <span className="my-1 text-xs text-gray-700">OR</span> */}
                    {/* <span className="rounded border border-blue-300 px-9 py-1.5 text-xs font-semibold text-blue-600">
                      BROWSE
                    </span> */}
                    <span className="mt-1 text-xs text-gray-700">Maximum size: 2MB</span>
                  </label>
                </div>
              </div>
              <div className="mb-7">
                {file && (
                  <div className="flex gap-2 flex-col">
                    <span className="text-sm text-gray-700">Selected file:</span>
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="preview" className="h-20 w-20 object-cover rounded" onClick={handleDeleteUpload} />
                    ) : (
                      <span className="text-sm text-gray-900 font-medium">{file.name}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="mb-7 flex items-end justify-end">
                <button
                  type="submit"
                  className="bg-green-400 text-white hover:text-slate-700 transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div >
      </div>
    </div>
  );
}
