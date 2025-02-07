import useAxiosSecure from "../../../hooks/useAxios";
import { useAuth } from "../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import MangeUsersCard from "./MangeUsersCard";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function MangeUsers() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, watch } = useForm();
  const searchTerm = watch("search", "");
  const {
    data: users,
    isPending,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: [user?.email, "mangeUsers", searchTerm],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSecure.get(`/users?name=${searchTerm}`);
      return data.data;
    },
  });

  if (isSuccess) {
    toast.success("Data Fetch Successfully");
  }

  const toggleStatusAdmin = async (id) => {
    const res = await axiosSecure.patch(`/users/admin/${id}`);
    toast.success("Post Successfull");
    refetch();
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg px-4 md:px-8 py-4">
      {/* Search Bar */}
      <div className="flex justify-center my-4">
        <input
          {...register("search")}
          type="text"
          placeholder="Search by username"
          className="border border-gray-300 p-2 rounded-md w-full max-w-md sm:w-64"
        />
      </div>

      {/* Table */}
      <div className="">
        <table className="w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Admin Status
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Premium Status
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Premium Request
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users &&
              users?.map((user) => (
                <MangeUsersCard
                  key={user._id}
                  user={user}
                  toggleStatusAdmin={toggleStatusAdmin}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MangeUsers;
