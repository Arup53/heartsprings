import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxios";
import { useAuth } from "../../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const imgKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgUploadAPI = `https://api.imgbb.com/1/upload?key=${imgKey}`;

const BiodataForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosBasic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: isExist } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const result = await axiosBasic.get(`/biodata/${user?.email}`);
      return result.data;
    },
  });

  isExist;

  const onSubmit = async (data) => {
    data;

    const imgFile = { image: data.image[0] };

    const res = await axiosBasic.post(imgUploadAPI, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    res.data.data.url;
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        type: data.type,
        image: res.data.data.url,

        name: data.name,
        age: parseInt(data.age),
        dob: data.dob,
        email: user?.email,
        mobile: data.mobile,
        expected_partner_age: data.expected_partner_age,
        expected_partner_height: data.expected_partner_height,
        expected_partner_weight: data.expected_partner_weight,
        father_name: data.father_name,
        mother_name: data.mother_name,
        height: data.height,
        weight: data.weight,
        occupation: data.occupation,
        permanent_division: data.permanent_division,
        present_division: data.present_division,
        race: data.race,
      };

      menuItem;

      if (isExist) {
        const result = await axiosSecure.patch("/biodata", menuItem);

        toast.success("Operation Successful");

        result;
      } else {
        const result = await axiosSecure.post("/biodata", menuItem);
        toast.success("Operation Successful");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        Biodata Form ({isExist ? "Edit" : "Create"}){" "}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Biodata Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biodata Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("type", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your name"
          />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image Link or Upload Image
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            {...register("dob", { required: true })}
            type="date"
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height <span className="text-red-500">*</span>
          </label>
          <select
            {...register("height", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Height
            </option>
            <option value="Short">Short</option>
            <option value="Average">Average</option>
            <option value="Tall">Tall</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight <span className="text-red-500">*</span>
          </label>
          <select
            {...register("weight", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Weight
            </option>
            <option value="Underweight">Underweight</option>
            <option value="Normal">Normal</option>
            <option value="Overweight">Overweight</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            {...register("age", { required: true })}
            type="number"
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your age"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation <span className="text-red-500">*</span>
          </label>
          <select
            {...register("occupation", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Occupation
            </option>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
            <option value="Self-Employed">Self-Employed</option>
          </select>
        </div>

        {/* Race */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Race (Skin Color) <span className="text-red-500">*</span>
          </label>
          <select
            {...register("race", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Skin Color
            </option>
            <option value="Fair">Fair</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father’s Name
          </label>
          <input
            {...register("father_name", { required: true })}
            type="text"
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your father's name"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother’s Name
          </label>
          <input
            {...register("mother_name", { required: true })}
            type="text"
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your mother's name"
          />
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Permanent Division Name <span className="text-red-500">*</span>
          </label>
          <select
            {...register("permanent_division", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Division
            </option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagra">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Present Division */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Present Division Name <span className="text-red-500">*</span>
          </label>
          <select
            {...register("present_division", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Division
            </option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagra">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Expected Partner Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Partner Age
          </label>
          <input
            {...register("expected_partner_age", { required: true })}
            type="number"
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter expected partner age"
          />
        </div>

        {/* Expected Partner Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Partner Height <span className="text-red-500">*</span>
          </label>
          <select
            {...register("expected_partner_height", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Height
            </option>
            <option value="Short">Short</option>
            <option value="Average">Average</option>
            <option value="Tall">Tall</option>
          </select>
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Partner Weight <span className="text-red-500">*</span>
          </label>
          <select
            {...register("expected_partner_weight", { required: true })}
            required
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Weight
            </option>
            <option value="Underweight">Underweight</option>
            <option value="Normal">Normal</option>
            <option value="Overweight">Overweight</option>
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            disabled={true}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="User email (read-only)"
            value={user?.email}
            readOnly
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("mobile", { required: true })}
            type="number"
            required
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your mobile number"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiodataForm;
