import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function PremiumMembers() {
  const axiosPublic = useAxiosPublic();
  const [sortOrder, setSortOrder] = useState("default");

  const { data: members, isSuccess } = useQuery({
    queryKey: ["premiumMembersHome", sortOrder],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/premimumlimited?sort=${sortOrder}`
      );
      return result.data;
    },
  });

  if (isSuccess) {
    toast.success("Data Fetch Successfully");
  }

  members;

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  //

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Premium Members
        </h2>

        <div className="flex flex-col my-2">
          <select
            className="self-end w-36 px-2 py-1 bg-white text-gray-700 text-sm rounded border border-gray-300"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="default" className="hidden">
              Sort by Age
            </option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members &&
            members?.map((member) => (
              <div
                key={member._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col space-y-2"
              >
                <img
                  src={member.image}
                  alt=""
                  className="w-full h-64 object-cover "
                />

                <div className="p-4 flex flex-col space-y-2">
                  <p className="text-sm text-gray-500">
                    Biodata ID: {member.BioId}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.type}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Division: {member.permanent_division}
                  </p>
                  <p className="text-sm text-gray-600">Age: {member.age}</p>
                  <p className="text-sm text-gray-600">
                    Occupation: {member.occupation}
                  </p>

                  <Link
                    to={`/details/${member._id}`}
                    className="w-24 mt-4 px-2 py-1 bg-amber-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default PremiumMembers;
