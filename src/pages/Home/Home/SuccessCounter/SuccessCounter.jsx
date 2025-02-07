import CountUp from "react-countup";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const SuccessCounter = () => {
  const axiosPublic = useAxiosPublic();

  const { data: counters, isSuccess } = useQuery({
    queryKey: ["successCounter"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/counter_home`);
      return result.data;
    },
  });

  counters;

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Statstaics
        </h2>

        {/* Counter Items */}
        {counters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                Total Profiles
              </h3>
              <p className="text-4xl font-bold text-amber-500">
                <CountUp end={counters?.totalBiodataCount} duration={2.5} />
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Male</h3>
              <p className="text-4xl font-bold text-amber-500">
                <CountUp end={counters?.maleBiodataCount} duration={2.5} />
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Female</h3>
              <p className="text-4xl font-bold text-amber-500">
                <CountUp end={counters?.femaleBiodataCount} duration={2.5} />
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                Marriage
              </h3>
              <p className="text-4xl font-bold text-amber-500">
                <CountUp end={counters?.totalSuccessCount} duration={2.5} />
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessCounter;
