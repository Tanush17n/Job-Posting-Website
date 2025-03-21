import React, { useEffect, useState } from "react";
import { getApplicationDetail } from "../services/apiService";
import { toast } from "react-toastify";

function DetailApplicationUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  useEffect(() => {
    if (!id) {
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getApplicationDetail(id);
        setData(response);
      } catch (error) {
        console.error('Error fetching application:', error);
        toast.error(error.message || 'Failed to fetch application details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Application Not Found</h2>
        <p className="text-gray-600">The application you're looking for doesn't exist or you don't have permission to view it.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="user"
              className="lg:w-1/4 w-3/4 lg:h-auto h-64 object-cover rounded mx-auto"
              src={data.user.photo}
            />
            <div className="lg:w-1/2 w-full lg:pl-20 lg:py-6 mt-6 lg:mt-0 justify-around mx-auto">
              <h2 className="ml-56">Company name</h2>
              <p className="text-gray-900 font-bold title-font mb-10 -mt-5 ml-56">
                {data.company}
              </p>
              <h2 className="ml-56">Category</h2>
              <p className="text-gray-900 font-bold title-font mb-10 -mt-5 ml-56">
                {data.category}
              </p>
              <h2 className="ml-56">Cover Letter</h2>
              <p className="text-gray-900 font-bold title-font mb-10 -mt-5 ml-56">
                {data.coverLetter}
              </p>
              <h2 className="ml-56">Status</h2>
              <p className="text-gray-900 font-bold title-font mb-10 -mt-5 ml-56">
                <span className={`px-2 py-1 rounded ${
                  data.status === 'accepted' ? 'bg-green-200 text-green-800' :
                  data.status === 'rejected' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {data.status || 'pending'}
                </span>
              </p>
              <h4 className=" ml-56 mt-9">Application Date</h4>
              <br />
              <hr />
              <p className="font-bold -mt-12 ml-56">
                {new Date(data?.createAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailApplicationUser;
