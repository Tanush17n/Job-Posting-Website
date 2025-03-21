import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DeatilApplication() {
  const [data, setData] = useState([]);
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://intershipbackend-vok7.onrender.com/api/admin/application/${id}`
        );
        setData([response.data]);
      } catch (error) {
        console.error("Error fetching application:", error);
        navigate("/applications");
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleAcceptAndReject = async (id, action) => {
    try {
      const response = await axios.put(
        `https://intershipbackend-vok7.onrender.com/api/admin/application/${id}`,
        { action }
      );
      const UpdateApplication = data.map((app) =>
        app._id === id ? response.data.data : app
      );
      setData(UpdateApplication);
      if (action === "accepted") {
        alert("Application Accepted");
      } else {
        alert("Application Rejected");
      }
      navigate("/applications");
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Failed to update application status");
    }
  };

  return (
    <div>
      {data.map((data) => (
        <section
          key={data._id}
          className="text-gray-600 body-font overflow-hidden"
        >
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/4 w-3/4 lg:h-auto h-64 object-cover rounded mx-auto"
                src={data.user?.photo}
              />
              <div className="lg:w-1/2 w-full lg:pl-20 lg:py-6 mt-6 lg:mt-0 justify-around mx-auto ">
                <h2 className="ml-56">Company name</h2>
                <p className="text-gray-900 font-bold title-font mb-10 -mt-5 ml-56">
                  {data.company}
                </p>
                <h2 className="ml-56">Cover Letter</h2>
                <p className="leading-relaxed font-bold -mt-6 ml-56">
                  {data.coverLetter}
                </p>

                <h4 className=" ml-56 mt-9">Application Date</h4>
                <br />
                <hr />
                <p className="font-bold -mt-12 ml-56">
                  {new Date(data?.createAt).toLocaleDateString()}
                </p>

                <h4 className=" ml-56 mt-9">Applied By</h4>
                <p className="font-bold -mt-6 ml-56">{data.user?.name}</p>
              </div>
            </div>
            <div className="flex mt-24 justify-center">
              <button
                className="bg-blue-700 text-green-400 w-24 font-bold mr-20"
                onClick={() => handleAcceptAndReject(data._id, "accepted")}
              >
                Accept
              </button>
              <button
                className="bg-blue-700 text-red-600 w-24 font-bold"
                onClick={() => handleAcceptAndReject(data._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default DeatilApplication;
