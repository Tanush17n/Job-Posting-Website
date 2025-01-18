import React, { useState } from "react";
import first from "../../Assets/Firstslide.png";
import second from "../../Assets/secondslide.webp";
import third from "../../Assets/thirdsilde.webp";
import fourth from "../../Assets/fourthslide.webp";
import "./home.css";
import Job from "./Job";
import InterShipData from "../Data/InternshipDatAvl";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filterInternships = InterShipData.filter(
    (item) => !selectedCategory || item.category === selectedCategory
  );

  const handleSlide = (direction) => {
    const container = document.getElementById("container");
    const step = 100;
    if (direction === "left") {
      setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
    } else {
      setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
    }
    setScroll(container, direction, 25, step, 10);
  };

  const handleSlideIntern = (direction) => {
    const container = document.getElementById("container2");
    const step = 100;
    if (direction === "left") {
      setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
    } else {
      setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
    }
    setScrollIntern(container, direction, 25, step, 10);
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-5">
        Make your dream career a reality
      </h1>
      <p className="text-center text-lg font-bold">Trending on InternArea 🔥</p>

      <div className="imgs flex justify-center" id="container">
        <div className="slide flex mt-10" id="content">
          <img className="slide_Img ml-2" src={first} alt="" />
          <img className="slide_Img ml-2" src={second} alt="" />
          <img className="slide_Img ml-2" src={third} alt="" />
          <img className="slide_Img ml-2" src={fourth} alt="" />
        </div>
      </div>
      <div className="flex Buttons">
        <button className="back" onClick={() => handleSlide("left")}>
          <i className="bi bi-chevron-left" id="slideleft"></i>
        </button>
        <button className="next" onClick={() => handleSlide("right")}>
          <i className="bi bi-chevron-right" id="slideright"></i>
        </button>
      </div>

      <div className="infos">
        <div className="info-intern">
          <div className="mt-16">
            <h1 className="text-center font-bold mt-3">
              Latest internships on Intern Area
            </h1>
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
        <div className="internships" id="container2">
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
                  {data.stipend}
                </p>
                <p className="mt-1">
                  <i className="bi bi-calendar-fill  text-slate-400 mr-2"></i>
                  {data.Duration}
                </p>
                <div className="more flex justify-between mt-6">
                  <span className="bg-slate-200 text-slate-400 w-20 rounded-sm text-center">
                    Internship
                  </span>

                  <span className="text-blue-500 mr-2">
                    View Details <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex Buttons mt-5">
          <button className="back" onClick={() => handleSlideIntern("left")}>
            <i className="bi bi-chevron-left" id="slideleft"></i>
          </button>
          <button className="next" onClick={() => handleSlideIntern("right")}>
            <i className="bi bi-chevron-right" id="slideright"></i>
          </button>
        </div>
      </div>

      <Job />

      <hr />

      <div className="analytics mt-8 flex flex-wrap justify-center items-center text-center">
        <div className="text-block mt-5 ml-5">
          <span className="font-bold text-6xl text-blue-600">300K+</span>
          <p>companies hiring</p>
        </div>
        <div className="text-block mt-5 ml-5">
          <span className="font-bold text-6xl text-blue-600">10K+</span>
          <p>new openings everyday</p>
        </div>
        <div className="text-block mt-5 ml-5">
          <span className="font-bold text-6xl text-blue-600">21Mn+</span>
          <p>active students</p>
        </div>
        <div className="text-block mt-5 ml-5">
          <span className="font-bold text-6xl text-blue-600">600K+</span>
          <p>learners</p>
        </div>
      </div>

      <div className="logins flex  h-32 mt-8">
        <div className="cont">
          <p className="flex justify-center text-white text-xl items-center m-5 w-30">
            Empower your career with InternArea today
          </p>
        </div>
        <div className="log flex mt-5">
          <a to="/register">
            <button className="btn6 "> Register</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;

function setScroll(element, direction, speed, distance, step) {
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

function setScrollIntern(element, direction, speed, distance, step) {
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
