import React, { forwardRef } from "react";

const AboutUs = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="bg-gray-50 py-12 px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          About Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-amber-500">HeartStrings</span>,
          your trusted companion in finding meaningful relationships and
          building lifelong partnerships. We are dedicated to connecting hearts
          and helping individuals start their beautiful journey of love and
          togetherness.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Trust & Transparency
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We prioritize your privacy and ensure a transparent matchmaking
            experience built on trust and authenticity.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Seamless Experience
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Our user-friendly platform is designed to make your journey of
            finding a life partner as simple and seamless as possible.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Community & Support
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We foster a supportive community that helps individuals connect with
            like-minded people for meaningful relationships.
          </p>
        </div>
      </div>
    </section>
  );
});

export default AboutUs;
