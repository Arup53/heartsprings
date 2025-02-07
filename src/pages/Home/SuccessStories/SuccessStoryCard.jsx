const SuccessStoryCard = ({ story }) => {
  story;
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 max-w-md mx-auto">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={story?.image_link}
            alt="Couple"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Marriage Date */}
        <div>
          <h3 className="text-gray-600 font-medium">Marriage Date</h3>
          <p className="text-lg font-semibold text-gray-800">
            {story?.marriageDate}
          </p>
        </div>
      </div>

      {/* Success Story */}
      <p className="mt-4 text-gray-700 text-sm leading-6">{story?.story}</p>
    </div>
  );
};

export default SuccessStoryCard;
