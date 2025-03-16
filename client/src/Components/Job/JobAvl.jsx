import React, { useEffect, useState } from "react";
import "./job.css";
// import JobData from "../Data/JobsDataAvl";
import { Link } from "react-router-dom";
import compLogo from "../../Assets/netflix.png";
import axios from "axios";

function JobAvl() {
  const [serachCategory, setSearchCategory] = useState("");
  const [searchLoaction, setSearchLocation] = useState("");
  const [filterJob, setFilterJob] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);
  const [jobData, setjobData] = useState([]);

  const showDiv = () => {
    setDivVisible(true);
  };
  const hidediv = () => {
    setDivVisible(false);
  };

  const handleCategoryChange = (e) => {
    const categeoryValue = e.target.value;
    setSearchCategory(categeoryValue);
    setFilterJob([categeoryValue, searchLoaction]);
  };

  const handleCategoryLocationChange = (e) => {
    const loactionValue = e.target.value;
    setSearchLocation(loactionValue);
    setFilterJob([serachCategory, loactionValue]);
  };

  const filterJobs = (category, location) => {
    if (jobData && jobData.length > 0) {
      const filterData = jobData.filter(
        (job) =>
          job.category.toLowerCase().includes(category.toLowerCase()) &&
          job.location.toLowerCase().includes(location.toLowerCase())
      );
      setFilterJob(filterData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const response = await axios.get(
          `https://intershipbackend-vok7.onrender.com/api/job`
        );
        setjobData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (jobData.length > 0) {
      filterJobs(serachCategory, searchLoaction);
    }
  }, [searchLoaction, serachCategory, jobData]);

  return (
    <>
      <div className="flex internship-filter">
        <div className="first-int mb-14">
          <div className="filter-section w-1/6">
            <p id="filter-ico" className=" text-center mt-3">
              <i className="bi bi-funnel text-blue-400"></i> Filter
            </p>
            <div className="fill flex flex-col ml-2">
              <label htmlFor="pro">Category</label>
              <input
                type="text"
                id="pro"
                value={serachCategory}
                onChange={handleCategoryChange}
                className="location border-2 mr-4 mb-2"
                placeholder="MBA"
              />
              <label htmlFor="loc">Location</label>
              <input
                type="text"
                id="loc"
                value={searchLoaction}
                onChange={handleCategoryLocationChange}
                className="location border-2 mr-4"
                placeholder="Mumbai"
              />
            </div>
            <div className=" preferences mt-4 flex flex-col">
              <div className="flex mt-3 ml-3 mr-3">
                <input
                  type="checkbox"
                  name="wfh"
                  id="whf"
                  className="mr-2 ml-3"
                />
                <label htmlFor="wfh">Work From home</label>
              </div>
              <div className="flex mt-3 ml-3 mr-3 mb-3">
                <input
                  type="checkbox"
                  name="pt"
                  id="whf"
                  className="mr-2 ml-3"
                />
                <label htmlFor="pt">Part-time</label>
              </div>
              <p>Desired Annual Salary (₹)</p>
              <input type="range" name="" id="" />
              {/* <p className="mt-2 flex justify-between w-full">
                0 &nbsp; 2K &nbsp; 4k &nbsp; 6K &nbsp; 8k &nbsp; 10K
              </p> */}
              <p className="mt-2 flex justify-between w-full">
                <span className="flex-1 text-center">0</span>
                <span className="flex-1 text-center">2K</span>
                <span className="flex-1 text-center">4K</span>
                <span className="flex-1 text-center">6K</span>
                <span className="flex-1 text-center">8K</span>
                <span className="flex-1 text-center">10K</span>
              </p>
            </div>

            <p className=" mt-5 text-blue-400">
              View more filters <i className="bi bi-chevron-down"></i>
            </p>
            <span className="justify-end flex text-blue-400 mr-3">
              Clear all
            </span>
          </div>
          {/* <div className="search-2">
            <div className="search-container">
              <input type="text" placeholder="eg. Design Media MBA" />
              <div className="search-icon">
                <i className="bi bi-search"></i>
              </div>
            </div>
          </div> */}
        </div>
        <div className="all-internships">
          <div className=" show show2 flex justify-center">
            <p className="filterico text-center mt-5" onClick={showDiv}>
              filter{" "}
              <i className="bi bi-funnel cursor-pointer text-blue-400"></i>{" "}
            </p>
          </div>
          <p className="head font-bold text-lg text-center mt-3">
            {filterJob.length} total Jobs
          </p>
          {filterJob.map((data, index) => (
            <div
              className="shadow-lg rounded-lg bg-white m-7"
              key={index}
              id="display"
            >
              <div className="m-4">
                <button className="mb-4 mt-3 pointer-events-none" id="boxer">
                  {" "}
                  <i className="bi bi-arrow-up-right text-blue-500"></i>{" "}
                  Actively Hiring
                </button>
                <div className="flex justify-end">
                  <img src={compLogo} className="w-14" alt="" />
                </div>
                <div className="all-ele">
                  <div className="text-lg text-black m-2 mt-7 font-bold">
                    {data.title}
                  </div>
                  <div className="info">
                    <p className="text-sm text-slate-300 font-bold">
                      {data.company}
                    </p>
                    <p className=" mt-2">{data.location}</p>
                  </div>
                  <div className="flex text-sm justify-between">
                    <p className="mt-3">
                      {" "}
                      <i className="bi bi-play-circle-fill"></i> Start Date{" "}
                      <br /> {data.StartDate}
                    </p>

                    <p className="mt-3">
                      {" "}
                      <i className="bi bi-calendar-check-fill"></i> Experience{" "}
                      <br />
                      {data.Experience}
                    </p>

                    <p className="mt-3">
                      {" "}
                      <i className="bi bi-cash"></i> Salary <br /> {data.CTC}
                    </p>
                  </div>
                </div>
                <button className="bg-slate-200 text-slate-400 w-20 rounded-sm text-center mt-2 mb-2 pointer-events-none">
                  Job
                </button>
                <br />
                <span>
                  <i className="bi bi-stopwatch text-green-300"></i>23/11/2065
                </span>
                <div className="flex justify-end" id="hr">
                  <Link to={`/detailJob?q=${data._id}`} className="mt-10">
                    <button
                      id="viewButtons"
                      className="bg-transparent text-blue-500"
                    >
                      View In Deatils
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isDivVisible && (
          <>
            <div className="first2-int mb-14">
              <div className="filter-section w-1/6">
                <span
                  className="flex justify-end cursor-pointer mr-2 mt-2 text-xl"
                  onClick={hidediv}
                >
                  <i className="bi bi-x"></i>
                </span>
                {/* <p id="filter-ico" className=" text-center mt-3">
                  <i
                    className="bi bi-funnel cursor-pointer text-blue-400"
                    onClick={showDiv}
                  ></i>{" "}
                  Filter
                </p> */}
                <div className="fill flex flex-col ml-2">
                  <label htmlFor="pro">Category</label>
                  <input
                    type="text"
                    id="pro"
                    value={serachCategory}
                    onChange={handleCategoryChange}
                    className="profile border-2 mr-4 mb-2"
                    placeholder="MBA"
                  />
                  <label htmlFor="loc">Location</label>
                  <input
                    type="text"
                    id="loc"
                    value={searchLoaction}
                    onChange={handleCategoryLocationChange}
                    className="location border-2 mr-4"
                    placeholder="Mumbai"
                  />
                </div>
                <div className=" preferences mt-4 flex flex-col">
                  <div className="flex mt-3 ml-3 mr-3">
                    <input
                      type="checkbox"
                      name="wfh"
                      id="whf"
                      className="mr-2 ml-3"
                    />
                    <label htmlFor="wfh">Work From home</label>
                  </div>
                  <div className="flex mt-3 ml-3 mr-3 mb-3">
                    <input
                      type="checkbox"
                      name="pt"
                      id="whf"
                      className="mr-2 ml-3"
                    />
                    <label htmlFor="pt">Part-time</label>
                  </div>
                  <p>Desired Annual Salary (₹)</p>
                  <input type="range" name="" id="" />
                  {/* <p className="mt-2 flex justify-between w-full">
                0 &nbsp; 2K &nbsp; 4k &nbsp; 6K &nbsp; 8k &nbsp; 10K
              </p> */}
                  <p className="mt-2 flex justify-between w-full">
                    <span className="flex-1 text-center">0</span>
                    <span className="flex-1 text-center">2K</span>
                    <span className="flex-1 text-center">4K</span>
                    <span className="flex-1 text-center">6K</span>
                    <span className="flex-1 text-center">8K</span>
                    <span className="flex-1 text-center">10K</span>
                  </p>
                </div>

                <p className=" mt-5 text-blue-400">
                  View more filters <i className="bi bi-chevron-down"></i>
                </p>
                <span className="justify-end flex text-blue-400 mr-3">
                  Clear all
                </span>
              </div>
              {/* <div className="search-2">
                <div className="search-container">
                  <input type="text" placeholder="eg. Design Media MBA" />
                  <div className="search-icon">
                    <i className="bi bi-search"></i>
                  </div>
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default JobAvl;
