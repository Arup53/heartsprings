import { useQuery } from "@tanstack/react-query";
import BioDataCard from "./BioDataCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import toast from "react-hot-toast";

function Biodata() {
  const axiosBasic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [pages, setPages] = useState(0);
  const [filters, setFilters] = useState({
    BiodataType: "",
    minAge: "",
    maxAge: "",
    division: "",
  });

  useEffect(() => {
    async function countData() {
      const res = await axiosBasic.get("/biodatacount");
      res.data.count;
      const totalData = res.data.count;
      const total = Math.ceil(totalData / itemsPerPage);
      setPages(total);
    }
    countData();
  }, []);

  // Fetching query with the current filters
  const { isFetching, data, refetch, isSuccess } = useQuery({
    queryKey: ["biodata", filters, currentPage], // Include filters as a dependency
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const result = await axiosBasic(
        `/biodata?${params}&page=${currentPage}&items=${itemsPerPage}`
      );
      return result.data;
    },
    keepPreviousData: true, // Keeps previous data while fetching new data
  });

  if (isSuccess) {
    toast.success("Data Fetch Successfully");
  }

  // Handle filter change for each filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters manually when user wants to refresh the data
  const applyFilters = () => {
    refetch();
  };

  const handlePagination = (e, value) => {
    setCurrentPage(value);

    value;
  };

  data;

  return (
    <>
      <div className="min-h-[calc(100vh-100px)] flex flex-col md:flex-row gap-4 p-4">
        {/* Left Side: Filter Options */}
        <div className="w-full md:w-1/4 min-h-[40vh] p-4 border border-gray-300 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            {/* Filter by Biodata Type */}
            <div>
              <label
                htmlFor="BiodataType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                name="BiodataType"
                value={filters.BiodataType}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Filter by Age Range */}
            <div className="space-x-2">
              <label
                htmlFor="minAge"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Min Age
              </label>
              <input
                type="number"
                name="minAge"
                value={filters.minAge}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Min Age"
              />
              <label
                htmlFor="maxAge"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Max Age
              </label>
              <input
                type="number"
                name="maxAge"
                value={filters.maxAge}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Max Age"
              />
            </div>

            {/* Filter by Division */}
            <div>
              <label
                htmlFor="division"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Division
              </label>
              <select
                name="division"
                value={filters.division}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Division</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagra">Chattagra</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Content</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data &&
              data?.map((bio) => <BioDataCard key={bio._id} bio={bio} />)}
          </div>
          <div className=" h-[20rem]  flex justify-center items-center  ">
            {data?.length === 0 && (
              <p className="text-2xl font-bold">No Data Found</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Pagination
          onChange={handlePagination}
          count={pages}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
}

export default Biodata;
