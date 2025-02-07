import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";
import useAxiosSecure from "./useAxios";

function useAdmin() {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const data = await axiosSecure.get(`/users/admin/${user?.email}`);

      return data.data;
    },
  });
  return [isAdmin, isPending];
}

export default useAdmin;
