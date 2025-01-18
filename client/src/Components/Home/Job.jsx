import React, { useState } from "react";
import JobData from "../Data/JobsDataAvl";

function Job() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filterInternships = JobData.filter(
    (item) => !selectedCategory || item.category === selectedCategory
  );

  const handleSlideJob = (direction) => {
    const container = document.getElementById("container3");
    const step = 100;
    if (direction === "left") {
      setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
    } else {
      setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
    }
    setScrollJob(container, direction, 25, step, 10);
  };

  return (
    <div>
      <div className="infos">
        <div className="info-intern">
          <div className="text-center font-bold">
            Latest Jobs on Intern Area
          </div>
          <div className="catergories flex flex-wrap mt-14">
            <p>POPULAR CATEGORIES :</p>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "Big Brands"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Big Brands" ? "" : "Big Brands"
                )
              }
            >
              Big Brands
            </span>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "Work From Home"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Work From Home" ? "" : "Work From Home"
                )
              }
            >
              Work From Home{" "}
            </span>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "Part-time" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Part-time" ? "" : "Part-time"
                )
              }
            >
              Part-time{" "}
            </span>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "MBA" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === "MBA" ? "" : "MBA")
              }
            >
              MBA{" "}
            </span>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "Engineering"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Engineering" ? "" : "Engineering"
                )
              }
            >
              Engineering
            </span>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "media" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === "media" ? "" : "media")
              }
            >
              Media{" "}
            </span>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "Design" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Design" ? "" : "Design"
                )
              }
            >
              Design{" "}
            </span>
            <span
              className={`category mr-2 ml-2 ${
                selectedCategory === "Data Science"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Data Science" ? "" : "Data Science"
                )
              }
            >
              Data Science{" "}
            </span>
          </div>
        </div>
        <div className="internships" id="container3">
          <div className="InternShip-Info flex">
            {filterInternships.map((data, index) => (
              <div className="int-1 mt-6" key={index}>
                <p className="mb-4 mt-3" id="boxer">
                  <i className="bi  bi-arrow-up-right text-blue-500"></i>
                  Actively Hiring
                </p>
                <p>{data.title}</p>
                <small className="text-slate-400 text-sm">{data.company}</small>

                <hr className="mt-5" />
                <p className="mt-3">
                  <i className="bi bi-geo-alt text-slate-400 mr-2"></i>
                  {data.location}
                </p>
                <p className="mt-1">
                  <i className="bi bi-cash-stack text-slate-400 mr-2"></i>
                  {data.CTC}
                </p>
                <p className="mt-1">
                  <i className="bi bi-calendar-fill  text-slate-400 mr-2"></i>
                  {data.Experience}
                </p>
                <div className="more flex justify-between mt-6">
                  <span className="bg-slate-200 text-slate-400 w-20 rounded-sm text-center">
                    Job
                  </span>

                  <span className="text-blue-500 mr-2">
                    View Details <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex Buttons mt-5 mb-5">
          <button className="back" onClick={() => handleSlideJob("left")}>
            <i className="bi bi-chevron-left" id="slideleft"></i>
          </button>
          <button className="next" onClick={() => handleSlideJob("right")}>
            <i className="bi bi-chevron-right" id="slideright"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Job;

function setScrollJob(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(function () {
    if (direction === "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}
