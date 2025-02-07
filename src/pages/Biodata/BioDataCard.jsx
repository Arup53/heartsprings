import { Link } from "react-router-dom";

function BioDataCard({ bio }) {
  const {
    _id,

    BioId,
    type,
    image,

    permanent_division,
    age,

    occupation,
    ViewProfile,
  } = bio || [];

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4   h-60">
      {/* Left Side: Circular Image */}
      <div className="flex-shrink-0">
        <img
          src={image}
          alt="Profile"
          className="rounded-full h-32 w-32 object-cover"
        />
      </div>

      {/* Vertical Divider */}
      <div className="h-full w-px bg-gray-300 mx-4"></div>

      {/* Right Side: Content */}
      <div className="flex-grow flex flex-col overflow-hidden ">
        <h2 className="text-base font-semibold text-gray-800 truncate">
          ID: {BioId}
        </h2>
        <p className="text-xs text-gray-600 mt-2 overflow-hidden text-ellipsis truncate">
          Gender: {type}
        </p>

        <p className="text-xs text-gray-600 mt-2 overflow-hidden text-ellipsis truncate">
          Division: {permanent_division}
        </p>
        <p className="text-xs text-gray-600 mt-2 overflow-hidden text-ellipsis truncate">
          Age: {age}
        </p>
        <p className="text-xs text-gray-600 mt-2 overflow-hidden text-ellipsis truncate">
          Profession: {occupation}
        </p>
        <Link
          to={`/details/${_id}`}
          className="mt-4 bg-amber-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default BioDataCard;
