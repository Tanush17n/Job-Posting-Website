import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
          <button
            onClick={() => navigate('/adminPanel')}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

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
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {applications.map((application) => (
                <li key={application._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {application.user?.name || 'Unknown User'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {application.category}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-900 truncate">
                          Company: {application.company}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Email: {application.user?.email}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Cover Letter: {application.coverLetter}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewApplications;
