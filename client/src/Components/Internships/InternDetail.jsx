import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Feature/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { submitApplication } from "../../services/apiService";
import axios from "axios";
import { toast } from "react-toastify";
import "./detail.css";

function InternDetail() {
  const user = useSelector(selectUser);
  const [isDivVisible, setDivVIsible] = useState(false);
  const [textare, setTextare] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const show = () => {
    if (!user) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    setDivVIsible(true);
  };

  const hide = () => {
    setDivVIsible(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const response = await axios.get(
          `https://intershipbackend-vok7.onrender.com/api/internship/${id}`
        );
        const { company, category } = response.data;
        setCompany(company);
        setCategory(category);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching internship details:", error);
        toast.error("Error loading internship details");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    let text = document.getElementById("text");
    if (text.value === "") {
      toast.error("Please fill in the cover letter");
      return;
    }

    try {
      setIsSubmitting(true);
      const applicationData = {
        coverLetter: textare,
        category: category,
        company: company,
        user: user,
        Application: id,
      };

      await submitApplication(applicationData);
      toast.success("Application submitted successfully!");
      navigate("/Internships");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <p className="mt-3 text-xl font-bold text-start">
                {" "}
                About Internship
              </p>
              <p className="ml-2 text-start">{data.aboutInternship}</p>
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
                <p>Applying for {data.company}</p>
                <p className="m-3 text-sm font-bold text-start">
                  {data.aboutCompany}
                </p>
              </div>
              <div className="moreSteps text-center">
                <p className="font-semibold text-xl">Your resume</p>
                <small className="flex justify-center">
                  Your current resume will be submitted along with the application
                </small>
                <div className="mt-5">
                  <p className="font-semibold text-xl">Cover letter</p>
                  <textarea
                    name=""
                    id="text"
                    cols="30"
                    rows="10"
                    className="mt-4"
                    value={textare}
                    onChange={(e) => setTextare(e.target.value)}
                    placeholder="Why should you be hired for this internship?"
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InternDetail;
