import { useAuth } from "../../../../context/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function MyContactRequest() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending, refetch, isSuccess } = useQuery({
    queryKey: [user?.email, "mycontacts"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/mycontactrequestUser/${user?.email}`
      );
      return response.data;
    },
  });

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/mycontactrequest/${id}`);
    refetch();
    toast.success("Post Deleted");
  };

  if (isSuccess) {
    toast.success("Data Fetching Successful");
  }
  return (
    <div className="p-6 bg-gray-100">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 text-right">ID</th>
              <th className="px-6 py-3 text-right">Status</th>
              <th className="px-6 py-3 text-right">
                Requested Biodata Mobile No
              </th>
              <th className="px-6 py-3 text-right">Requested Biodata Email</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-right">{item.id}</td>
                <td className="px-6 py-4 text-right">{item.status}</td>
                <td className="px-6 py-4 text-right">
                  {item.status !== "pending" && item.phone}
                </td>
                <td className="px-6 py-4 text-right">
                  {item.status !== "pending" && item.bioemail}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyContactRequest;
