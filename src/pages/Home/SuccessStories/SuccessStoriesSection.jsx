import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SuccessStoryCard from "./SuccessStoryCard";

const SuccessStoriesSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: successStories, isSuccess } = useQuery({
    queryKey: ["successStoriesHome"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/successstory`);
      return result.data;
    },
  });

  successStories;

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Success Stories
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {successStories &&
            successStories?.map((story) => (
              <SuccessStoryCard key={story._id} story={story} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
