import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxios";
import { useState } from "react";
import toast from "react-hot-toast";

function ApprovedContactReqCard({ req }) {
  const axiosSecure = useAxiosSecure();

  const { data, isPending, refetch, isFetching, isSuccess } = useQuery({
    queryKey: ["contactreq", req?.email],
    queryFn: async () => {
      const data = await axiosSecure.get(`/mycontactrequest/${req?.email}`);

      return data.data;
    },
  });

  const handleApproval = async (email) => {
    const res = await axiosSecure.patch(`/mycontactrequest/${email}`, {
      changevalue: "apporved",
    });
    toast.success("Operation Successfull");
    refetch();
  };

  if (isPending || isFetching) {
    return (
      <tr>
        <td colSpan={4} className="text-center">
          <span>Loading........</span>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">{req?.name}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{req?.email}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{req?.id}</span>
      </td>
      {/* make premium */}
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => handleApproval(req?.email)}
          className={`px-3 py-1 rounded-full text-sm font-medium disabled:bg-slate-200 disabled:text-gray-400  ${
            data?.status === "apporved"
              ? "bg-green-100 text-green-800 pointer-events-none "
              : "bg-gray-100 text-gray-800 "
          }`}
        >
          {data && data?.status === "apporved" ? "Approved" : "Approve Request"}
        </button>
      </td>
    </tr>
  );
}

export default ApprovedContactReqCard;
