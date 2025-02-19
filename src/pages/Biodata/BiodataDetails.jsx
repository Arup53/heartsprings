import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxios";
import { useState } from "react";

function BiodataDetails() {
  const { user } = useAuth();
  const axiosBasic = useAxiosPublic();
  const axiosBasicSecure = useAxiosSecure();
  const { id } = useParams();
  const [isFavourite, setFavourite] = useState(false);

  const { data } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const result = await axiosBasic.get(`/biodetails/${id}`);

      return result.data;
    },
  });

  const { data: isPremium } = useQuery({
    queryKey: ["premium", user?.email],
    queryFn: async () => {
      const result = await axiosBasicSecure.get(
        `/singleUser?email=${user?.email}`
      );

      return result.data;
    },
  });

  const { data: similarBiodata } = useQuery({
    queryKey: ["similar", id],
    enabled: !!data?.type,
    queryFn: async () => {
      const result = await axiosBasic.get(
        `/biodetails?type=${data?.type}&id=${id}`
      );

      return result.data;
    },
  });

  const handleFavourite = async () => {
    const obj = {
      name: data.name,
      bioId: data.BioId,
      permanent_division: data?.permanent_division,
      occupation: data?.occupation,
      email: user?.email,
    };

    const result = axiosBasicSecure.post("/myfavourite", obj);
    result;
    setFavourite(true);
  };

  data;
  similarBiodata;
  const { premium } = isPremium || {};
  premium;
  return (
    <>
      <div className="min-h-[calc(100vh-200px)] my-6 max-w-md mx-auto border border-gray-300 rounded-lg shadow-md p-4 bg-white">
        <div className="flex flex-col items-center">
          <img
            src={data?.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ID: {data?.BioId}
          </h2>
          <p className="text-sm text-gray-500 mb-4">Type: {data?.type}</p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-gray-700">
              Division: {data?.permanent_division}
            </span>
            {}
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Age: {data?.age}
            </span>{" "}
            {}
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Occupation: {data?.occupation}
            </span>
          </p>
          {premium && (
            <p className="flex flex-col">
              <span className="font-semibold text-gray-700">
                Email: {data?.email}
              </span>
              <span className="font-semibold text-gray-700">
                Phone: {data?.mobile}
              </span>
            </p>
          )}
        </div>
        <div className="mt-4 text-center">
          <button
            disabled={isFavourite && true}
            onClick={handleFavourite}
            className=" text-sm bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-500 disabled:bg-slate-200 disabled:text-gray-400  "
          >
            Add to favourite
          </button>
          <Link
            className={`text-sm bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600 ${
              premium === true ? "hidden" : "inline"
            }`}
            state={data}
            to={`/checkout/${id}`}
          >
            Request Contact Information
          </Link>
        </div>
      </div>
      {/* similar */}
      <h3 className="text-xl text-center font-bold text-gray-800 mb-6">
        Similar Profiles
      </h3>
      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {similarBiodata &&
          similarBiodata?.map((similar) => (
            <div
              key={similar._id}
              className=" bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <img
                src={similar.image}
                alt=""
                className=" h-48 object-cover object-center rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-800">
                {similar.name}
              </h4>
              <p className="text-sm text-gray-500">ID: {similar.BioId}</p>
              <p className="text-gray-600">Age: {similar.age}</p>
              <p className="text-gray-600">Occupation: {similar.occupation}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default BiodataDetails;
