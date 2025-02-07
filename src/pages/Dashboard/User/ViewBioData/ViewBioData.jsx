import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../../context/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxios";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ViewBiodata = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  user;
  const { data, isSuccess } = useQuery({
    queryKey: [user?.email, "user"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/biodataDetails/${user?.email}`);
      return result.data;
    },
  });

  const { data: isPremium, refetch } = useQuery({
    queryKey: ["premiumReqChecker", user?.email],

    queryFn: async () => {
      const data = await axiosSecure.get(`/premium/${user?.email}`);

      return data.data;
    },
  });

  if (isSuccess) {
    toast.success("Data Fetching Successful");
  }

  isPremium;

  const handlePremiumReq = async () => {
    const premiumReq = {
      isPremium: false,
      premimumReq: true,
      email: user?.email,
      name: user?.displayName,
      bio_id: data?.BioId,
    };

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You Want To Be Premium Member",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Send Request!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post("/premium", premiumReq);
        res;
        if (res.data.insertedId) {
          await Swal.fire({
            title: "Send",
            text: "Your Request has been Send.",
            icon: "success",
          });
        }
      }
      refetch();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };

  data;

  return (
    <>
      {data && (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
          <h1 className="text-2xl font-bold mb-6">View Biodata</h1>
          <div className="space-y-4">
            {/* Profile Image */}
            <div className="flex items-center space-x-4">
              <img
                src={data?.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div>
                <h2 className="text-xl font-semibold">{data?.name}</h2>
                <p className="text-sm text-gray-500">{data?.type}</p>
              </div>
            </div>

            {/* Biodata Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Date of Birth:</h3>
                <p>{data?.dob}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Height:</h3>
                <p>{data?.height}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Weight:</h3>
                <p>{data?.weight}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Age:</h3>
                <p>{data?.age}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Occupation:</h3>
                <p>{data?.occupation}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  Race (Skin Color):
                </h3>
                <p>{data?.race}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Father's Name:</h3>
                <p>{data?.father_name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Mother's Name:</h3>
                <p>{data?.mother_name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  Permanent Division:
                </h3>
                <p>{data?.permanent_division}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Present Division:</h3>
                <p>{data?.present_division}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  Expected Partner Age:
                </h3>
                <p>{data?.expected_partner_age}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  Expected Partner Height:
                </h3>
                <p>{data?.expected_partner_height}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  Expected Partner Weight:
                </h3>
                <p>{data?.expected_partner_weight}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Contact Email:</h3>
                <p>{data?.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Mobile Number:</h3>
                <p>{data?.mobile}</p>
              </div>
            </div>
          </div>
          <button
            disabled={isPremium?.premimumReq === true ? true : false}
            onClick={handlePremiumReq}
            className="px-2 py-1 bg-blue-400 text-white w-full disabled:bg-slate-200 disabled:text-gray-400"
          >
            {isPremium?.premimumReq
              ? isPremium?.isPremium
                ? "Premium"
                : "Request Pending"
              : "Make Premium"}
          </button>
        </div>
      )}
    </>
  );
};

export default ViewBiodata;
