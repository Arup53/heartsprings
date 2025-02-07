import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxios";
import ApprovedContactReqCard from "./ApprovedContactReqCard";

function ApprovedContactReq() {
  const axiosSecure = useAxiosSecure();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["contactreq"],

    queryFn: async () => {
      const data = await axiosSecure.get(`/mycontactrequest`);

      return data.data;
    },
  });

  data;
  return (
    <div className="">
      <table className="w-full min-w-full  overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Biodata ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* ---------content------ */}
          {data &&
            data?.map((req) => (
              <ApprovedContactReqCard key={req._id} req={req} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovedContactReq;
