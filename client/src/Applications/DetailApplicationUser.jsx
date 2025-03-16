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
      const response = await axios.get(
        `https://intershipbackend-vok7.onrender.com/api/application/${id}`
      );
      setData([response.data]);
    };
    fetchData();
  }, [id]);

  console.log(data);
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
                src={data.user.photo}
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

                {/* <h4 className=" ml-56 mt-9">Applied By</h4>
                <p className="font-bold -mt-6 ml-56">{data.user?.name}</p> */}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default DeatilApplication;
