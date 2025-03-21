import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./admin.css";

function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) {
      toast.error("Please login as admin first");
      navigate('/adminLogin');
      return;
    }

    // Fetch all applications
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://intershipbackend-vok7.onrender.com/api/admin/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch applications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  return (
    <div>
      <div className="hide">
        <h1 className="text-3xl font-semibold mt-3 text-center">
          Total Applications
        </h1>
        <div className="flex justify-center" id="tabel">
          <div className="applications flex flex-col mt-7">
            <div className="overflow-x-auto sm:-mx-6 lg:mx-8">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading applications...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No applications found.</p>
                </div>
              ) : (
                <table className="inline-block min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr className="bg-gray-200">
                      <th scope="col" className="px-5 py-4">
                        Company
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Category
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Applied On
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Applied By
                      </th>
                      <th scope="col" className="px-5 py-4">
                        View Detail
                      </th>
                      <th scope="col" className="px-5 py-4">
                        Application Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((data) => (
                      <tr key={data._id} className="border-b">
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.company}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.category}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {new Date(data?.createAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.user?.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link to={`/detailApplication?q=${encodeURIComponent(data._id)}`}>
                            <i className="bi bi-envelope-open text-blue-500"></i>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="show">
        <h1 className="text-xl font-semibold mt-6 ml-6 mb-5">
          View All Applications
        </h1>
        {applications.map((data) => (
          <section key={data._id} className="text-gray-600 body-font">
            <div className="container px-5 py-2 mx-auto flex flex-wrap">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                        {data.user?.name}
                      </h2>
                      <p className="leading-relaxed text-base">
                        Company: {data.company}
                        <br />
                        Category: {data.category}
                        <br />
                        Applied On: {new Date(data?.createAt).toLocaleDateString()}
                      </p>
                      <Link
                        to={`/detailApplication?q=${encodeURIComponent(data._id)}`}
                        className="mt-3 text-indigo-500 inline-flex items-center"
                      >
                        View Details
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ViewApplications;
