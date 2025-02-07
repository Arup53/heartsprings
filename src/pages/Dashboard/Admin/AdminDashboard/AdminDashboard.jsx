import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../context/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxios";
import useDataFetching from "../../../../hooks/useDataFetching";
import PieChartDisplay from "./PieChartDisplay";
import toast from "react-hot-toast";

function AdminDashboard() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending, refetch, isSuccess } = useQuery({
    queryKey: [user?.email, "adminDashboard"],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSecure.get(`/biodata_count?email=${user?.email}`);

      return data.data;
    },
  });

  if (isSuccess) {
    toast.success("Data Fetch Successfully");
  }

  const {
    totalBiodataCount,
    maleBiodataCount,
    femaleBiodataCount,
    totalRevenue,
    totalPremiumCount,
  } = data || {};

  const pieData = data && [
    { name: "total_biodata", value: totalBiodataCount },
    { name: "male", value: maleBiodataCount },
    { name: "female", value: femaleBiodataCount },
    { name: "premium", value: totalPremiumCount },
    { name: " revenue", value: totalRevenue },
  ];

  pieData;
  return (
    <>
      {data && (
        <div className="w-[100vh] mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Biodata Statistics
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
              <p className="text-xl font-bold">{totalBiodataCount}</p>
              <p className="text-sm">Total Biodata</p>
            </div>
            <div className="bg-green-100 text-green-800 p-4 rounded-lg">
              <p className="text-xl font-bold">{maleBiodataCount}</p>
              <p className="text-sm">Male Biodata</p>
            </div>
            <div className="bg-pink-100 text-pink-800 p-4 rounded-lg">
              <p className="text-xl font-bold">{femaleBiodataCount}</p>
              <p className="text-sm">Female Biodata</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
              <p className="text-xl font-bold">{totalPremiumCount}</p>
              <p className="text-sm">Premium Biodata</p>
            </div>
            <div className="bg-purple-100 text-purple-800 p-4 rounded-lg">
              <p className="text-xl font-bold">{totalRevenue}$</p>
              <p className="text-sm">Total Revenue</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {data && <PieChartDisplay pieData={pieData} />}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
