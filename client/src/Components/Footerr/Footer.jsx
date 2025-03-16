import React from "react";

function Footer() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl fonat-semibold text-blueGray-700">
                Let's keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-dribbble"></i>
                </button>
                <button
                  className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled block">
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block text-sm pb-2">
                        About Us
                      </div>
                    </li>
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block text-sm pb-2">
                        Blog
                      </div>
                    </li>
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block text-sm pb-2">
                        Github
                      </div>
                    </li>
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block text-sm pb-2">
                        Free Products
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled block">
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        MIT License
                      </div>
                    </li>
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Terms &amp; Conditions
                      </div>
                    </li>
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Privacy Policy
                      </div>
                    </li>
                    <li>
                      <div className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                        Contact Us
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
