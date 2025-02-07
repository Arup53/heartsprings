import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxios";
import toast from "react-hot-toast";

function ApprovePremium() {
  const axiosSecure = useAxiosSecure();

  const { data, isPending, refetch, isSuccess } = useQuery({
    queryKey: ["approvePremiumReq"],

    queryFn: async () => {
      const data = await axiosSecure.get(`/premium`);

      return data.data;
    },
  });

  const handleMakePremium = async (email) => {
    const res = await axiosSecure.patch(`/premium/${email}`, {
      changevalue: true,
    });

    refetch();
    toast.success("Post Successfull");
  };

  if (isSuccess) {
    toast.success("Data Fetched Successfully");
  }

  return (
    <div className="">
      <table className="w-full min-w-full   overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Requested Biodata ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Premium Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Premium Request
            </th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {/* ---------content------ */}
          {data &&
            data?.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {req?.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{req?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{req?.bio_id}</div>
                </td>
                {/* make premium */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    disabled={req?.premimumReq === true ? false : true}
                    onClick={() => handleMakePremium(req?.email)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 disabled:bg-slate-200 disabled:text-gray-400  ${
                      req?.isPremium
                        ? "bg-yellow-100 text-yellow-800 pointer-events-none "
                        : "bg-gray-100 text-gray-800 "
                    }`}
                  >
                    {req?.isPremium ? "Premium" : "Make Premium"}
                  </button>
                </td>
                {/* premium req */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-black ">
                    {req?.premimumReq ? (
                      <span className="font-bold">Yes</span>
                    ) : (
                      "No"
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovePremium;
