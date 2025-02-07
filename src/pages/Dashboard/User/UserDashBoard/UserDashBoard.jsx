import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxios";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useAuth } from "../../../../context/AuthProvider";
import { useState } from "react";
import toast from "react-hot-toast";

const imgKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgUploadAPI = `https://api.imgbb.com/1/upload?key=${imgKey}`;

function UserDashBoard() {
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const axiosBasic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    "Form Data Submitted:", data;

    const imgFile = { image: data.imageUpload[0] };
    let res;
    if (imgFile.image) {
      res = await axiosBasic.post(imgUploadAPI, imgFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    }

    // /success_story
    if (res?.data.success || !imgFile.image) {
      const successObj = {
        self_bioid: data.selfBiodataId,
        marriageDate: data.marriage,
        partner_bioid: data.partnerBiodataId,
        image_link: data.coupleImage,
        image_upload: res?.data.data.url || null,
        story: data.successStory,
      };

      const result = await axiosSecure.post("/success_story", successObj);

      toast.success("Operation Successful");

      setIsSubmitted(true);
      result;
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md sm:max-w-lg lg:max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Share Your Success Story
        </h2>

        <div className="mb-4">
          <label
            htmlFor="selfBiodataId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Self Biodata ID
          </label>
          <input
            type="text"
            id="selfBiodataId"
            {...register("selfBiodataId", {
              required: "This field is required",
            })}
            placeholder="Enter your biodata ID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.selfBiodataId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.selfBiodataId.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="partnerBiodataId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Partner Biodata ID
          </label>
          <input
            type="text"
            id="partnerBiodataId"
            {...register("partnerBiodataId", {
              required: "This field is required",
            })}
            placeholder="Enter partner biodata ID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.partnerBiodataId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.partnerBiodataId.message}
            </p>
          )}
        </div>
        {/* marriage data */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marriage Date
          </label>
          <input
            type="date"
            {...register("marriage", { required: "Marriage date is required" })}
            className={`block w-full p-2 border rounded`}
            placeholder="Select a date"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="coupleImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Couple Image (Link or Upload)
          </label>
          <input
            type="text"
            id="coupleImage"
            {...register("coupleImage", {
              required: "Please provide an image link or upload an image",
            })}
            placeholder="Paste image link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            type="file"
            id="imageUpload"
            {...register("imageUpload")}
            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.coupleImage && (
            <p className="text-red-500 text-xs mt-1">
              {errors.coupleImage.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="successStory"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Success Story Review
          </label>
          <textarea
            id="successStory"
            {...register("successStory", {
              required: "This field is required",
            })}
            placeholder="Share your feelings about using this website"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
          ></textarea>
          {errors.successStory && (
            <p className="text-red-500 text-xs mt-1">
              {errors.successStory.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitted}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto disabled:bg-slate-200 disabled:text-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserDashBoard;
