import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsMailbox2Flag } from "react-icons/bs";
import { toast } from "react-toastify";

function Adminpanel() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simple check if admin is logged in
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) {
      toast.error("Please login as admin first");
      navigate('/adminLogin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    toast.success("Admin logged out successfully");
    navigate('/adminLogin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="hidden w-full overflow-hidden rounded-lg border bg-white shadow-sm lg:block">
          <div className="mx-auto flex max-w-screen-lg items-center gap-8 p-8">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/applications" className="group flex gap-4 p-6 rounded-lg border hover:border-indigo-500 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg transition duration-100 group-hover:bg-indigo-600 group-active:bg-indigo-700 md:h-12 md:w-12">
                  <BsMailbox2Flag />
                </div>

                <div>
                  <div className="mb-1 font-semibold">View Applications</div>
                  <p className="text-sm text-gray-500">
                    View All the Applications That you got from applicants
                  </p>
                </div>
              </Link>

              <Link to="/postJob" className="group flex gap-4 p-6 rounded-lg border hover:border-indigo-500 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg transition duration-100 group-hover:bg-indigo-600 group-active:bg-indigo-700 md:h-12 md:w-12">
                  <i className="bi bi-briefcase"></i>
                </div>

                <div>
                  <div className="mb-1 font-semibold">Post Job</div>
                  <p className="text-sm text-gray-500">
                    Post Jobs According to Your Requirements
                  </p>
                </div>
              </Link>

              <Link to="/postInternship" className="group flex gap-4 p-6 rounded-lg border hover:border-indigo-500 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg transition duration-100 group-hover:bg-indigo-600 group-active:bg-indigo-700 md:h-12 md:w-12">
                  <RiSendPlaneFill />
                </div>
                <div>
                  <div className="mb-1 font-semibold">Post Internships</div>
                  <p className="text-sm text-gray-500">
                    Post Internships According To Your Requirements
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminpanel;
