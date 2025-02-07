import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";
import useAxiosSecure from "./useAxios";

function useDataFetching(props) {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending, refetch } = useQuery({
    queryKey: [user?.email, "adminDashboard"],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSecure.get(`/${props}?email=${user?.email}`);

      return data.data;
    },
  });

  return [data, isPending];
}

export default useDataFetching;
