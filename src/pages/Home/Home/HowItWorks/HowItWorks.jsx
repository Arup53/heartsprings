import { FaUserPlus, FaSearch, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-blue-500 text-4xl mb-4" />,
      title: "Create Your Profile",
      description:
        "Sign up and create a profile with your biodata to get started on your journey.",
    },
    {
      icon: <FaSearch className="text-green-500 text-4xl mb-4" />,
      title: "Search for Matches",
      description:
        "Explore profiles using filters like age, location, and categories.",
    },
    {
      icon: <FaHeart className="text-red-500 text-4xl mb-4" />,
      title: "Connect and Chat",
      description:
        "Show interest in profiles, request contact information , or ask for premium membership.",
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center flex flex-col"
            >
              {/* Icon */}
              <p className="self-center">{step.icon}</p>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
