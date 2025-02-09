import React from "react";
import Internships from "../Data/InternshipDatAvl";

function InternDetail() {
  const show = () => {
    console.log("show");
  };

  return (
    <div>
      <div className="details-app ml-4 mr-4">
        {Internships.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-3xl mt-5 text-center">
              {data.title}
            </h1>
            <div className="mt-14 shadow-sm rounded-md border">
              <button className="mb-4 mt-3 pointer-events-none" id="boxer">
                {" "}
                <i className="bi bi-arrow-up-right text-blue-500"></i> Actively
                Hiring
              </button>
              <p className="text-xl font-bold mt-4">{data.title}</p>
              <p className="text-sm text-slate-300 font-bold">{data.company}</p>
              <p>
                <i className="bi bi-geo-alt-fill"></i> {data.location}
              </p>

              <div className="flex text-sm justify-between m-5">
                <p className="mt-3 text-slate-400">
                  {" "}
                  <i className="bi bi-play-circle-fill"></i> Start Date <br />{" "}
                  {data.StartDate}
                </p>

                <p className="mt-3 text-slate-400">
                  {" "}
                  <i className="bi bi-calendar-check-fill"></i> Duration <br />
                  {data.Duration}
                </p>

                <p className="mt-3 text-slate-400">
                  {" "}
                  <i className="bi bi-cash"></i> Stipend <br /> {data.stipend}
                </p>
              </div>
              <div className="flex mb-3">
                <p className="bg-green-100 rounded-md ml-4 text-green-300">
                  {" "}
                  <i className="bi bi-clock"></i> 12/12/2012
                </p>
              </div>
              <hr />
              <div className="about-company m-3">
                <div className="aboutCompany flex justify-start">
                  <p className="mt-3 text-xl font-bold text-start">
                    {" "}
                    About {data.company}
                  </p>
                  <br />
                </div>
                <div className="flex">
                  <p className="text-blue-500">
                    {" "}
                    instagram page{" "}
                    <i className="bi bi-arrow-up-right-square"></i>
                  </p>
                </div>
                <p className="m-5 text-start"> {data.aboutCompany}</p>
                <div className="about-Job">
                  <p className="mt-3 text-xl font-bold text-start">
                    {" "}
                    about Job
                  </p>
                  <p className="ml-2 text-start">{data.aboutJob}</p>
                </div>
                <p className="text-blue-500 justify-start">
                  {" "}
                  Learn Business Communication
                </p>
                <div className="whocan">
                  <p className="mt-3 text-xl font-bold text-start">
                    Who can apply
                  </p>
                  <p className="ml-2 text-start">{data.Whocanapply}</p>
                </div>
                <p className="mt-3 text-xl font-bold text-start">Perks</p>
                <p className="ml-2 text-start">{data.perks}</p>

                <p className="mt-3 text-xl font-bold text-start">
                  {" "}
                  Additional information
                </p>
                <p className="ml-2 text-start">{data.AdditionalInfo}</p>
                <p className="mt-3 text-xl font-bold text-start">
                  {" "}
                  Number of opening
                </p>
                <p className="ml-2 text-start">{data.numberOfopning}</p>
                <div className="flex justify-center mt-6 bg-blue-500 w-40 text-center text-white font-bold ">
                  <button
                    className="flex justify-center align-middle"
                    onClick={show}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternDetail;
