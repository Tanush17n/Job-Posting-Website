import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../Feature/UserSlice";
import "./detail.css";
import axios from "axios";

function InternDetail() {
  // const show = () => {
  //   console.log("show");
  // };

  const user = useSelector(selectUser);
  const [isDivVisible, setDivVIsible] = useState(false);
  const [textare, setTextare] = useState("");
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const show = () => {
    setDivVIsible(true);
  };

  const hide = () => {
    setDivVIsible(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const respone = await axios.get(
        `http://localhost:5000/api/internship/${id}`
      );
      setData(respone.data);
    };
    fetchData();
  });

  return (
    <div>
      <div className="details-app ml-4 mr-4">
        <h1 className="font-bold text-3xl mt-5 text-center">{data.title}</h1>
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
                instagram page <i className="bi bi-arrow-up-right-square"></i>
              </p>
            </div>
            <p className="m-5 text-start"> {data.aboutCompany}</p>
            <div className="about-Job">
              <p className="mt-3 text-xl font-bold text-start"> about Job</p>
              <p className="ml-2 text-start">{data.aboutJob}</p>
            </div>
            <p className="text-blue-500 justify-start">
              {" "}
              Learn Business Communication
            </p>
            <div className="whocan">
              <p className="mt-3 text-xl font-bold text-start">Who can apply</p>
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
        {isDivVisible && (
          <>
            <div className="application-page">
              <div className="bg">
                <button id="cross" onClick={hide}>
                  <i className="bi bi-x"></i>
                </button>
                <p>Appliying for {data.company}</p>
                <p className="m-3 text-sm font-bold text-start ">
                  {data.aboutCompany}
                </p>
              </div>
              <div className="moreSteps text-center">
                <p className="font-semibold text-xl">Your resume</p>
                <small className="flex justify-center">
                  your current resume will be submitted along with the
                  application
                </small>

                <p className="mt-5 font-semibold text-xl mb-2">Cover letter</p>

                <p>why should we hire for this role?</p>
                <textarea
                  name="coverLetter"
                  placeholder=""
                  id="text"
                  value={textare}
                  onChange={(e) => setTextare(e.target.value)}
                ></textarea>
                <p className="mt-5 font-semibold text-xl">your availiblity</p>
                <p>confirm your availiblity</p>
              </div>
              <div className="options ml-5">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Yes, I am available to join immediately"
                    />
                    &nbsp; Yes, I am available to join immediately
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="No, I am currently on notice period"
                    />
                    &nbsp; No, I am currently on notice period
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="No, I will have to serve notice period"
                    />
                    &nbsp; No, I will have to serve notice period
                  </label>
                </div>

                <div>
                  <label>
                    <input type="checkbox" value="Other" />
                    &nbsp; Other{" "}
                    <span className="text-slate-500">
                      (Please specify your availability){" "}
                    </span>
                  </label>
                </div>
              </div>
              <p className="mt-5 font-semibold text-xl">
                Custom resume <span className="text-slate-500">(Optional)</span>
              </p>
              <small className="text-slate-500 flex justify-center">
                Employer can download and view this resume
              </small>

              <div className="submit flex justify-center mt-4">
                {user ? (
                  <button
                    className="submit-btn"
                    // onClick={submitApplication}
                  >
                    Submit application
                  </button>
                ) : (
                  <Link to={"/register"}>
                    <button className="submit-btn">Submit application</button>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InternDetail;
