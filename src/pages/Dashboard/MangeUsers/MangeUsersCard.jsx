import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxios";
import React from "react";
import toast from "react-hot-toast";

function MangeUsersCard({ user, toggleStatusAdmin }) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const axiosSecure = useAxiosSecure();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["premiumReq", user?.email],
    queryFn: async () => {
      const data = await axiosSecure.get(`/premium/${user?.email}`);
      return data.data;
    },
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMakePremium = async (email) => {
    const res = await axiosSecure.patch(`/premium/${email}`, {
      changevalue: true,
    });
    refetch();
    toast.success("Post Successfull");
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{user?.name}</div>
        </td>
        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{user?.email}</div>
        </td>
        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
          <button
            disabled={user?.role === "admin"}
            onClick={() => toggleStatusAdmin(user?._id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              user?.role === "admin"
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {user?.role === "admin" ? "Admin" : "Make Admin"}
          </button>
        </td>
        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
          <button
            disabled={data?.premimumReq === true ? false : true}
            onClick={() => handleMakePremium(user?.email)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 disabled:bg-slate-200 disabled:text-gray-400 ${
              data?.isPremium
                ? "bg-yellow-100 text-yellow-800 pointer-events-none"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {data?.isPremium ? "Premium" : "Make Premium"}
          </button>
        </td>
        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
          <div className="text-sm text-black">
            {data?.premimumReq ? <span className="font-bold">Yes</span> : "No"}
          </div>
        </td>
      </tr>
    </>
  );
}

export default MangeUsersCard;
