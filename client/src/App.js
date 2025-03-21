import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footerr/Footer';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import ProtectedRoute from './Components/auth/ProtectedRoute';
import Intern from './Components/Internships/Intern';
import JobAvl from './Components/Job/JobAvl';
import JobDetail from './Components/Job/JobDetail';
import InternDetail from './Components/Internships/InternDetail';
import { useDispatch } from 'react-redux';
import { login, logout } from './Feature/UserSlice';
import { auth } from './Firebase/firebase';
import Profile from './Profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewApplications from './Admin/ViewApplications';
import PostJOb from './Admin/PostJob';
import Postinternships from './Admin/Postinternships';
import DeatilApplication from './Applications/DeatilApplication';
import DetailApplicationUser from "./Applications/DetailApplicationUser";
import UserApplication from './Profile/UserApplication';
import { AuthProvider } from './context/AuthContext';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(login({
          uid: authuser.uid,
          photo: authuser.photoURL,
          name: authuser.displayName,
          emailid: authuser.email
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/internships' element={<Intern />} />
          <Route path='/jobs' element={<JobAvl />} />
          
          {/* Protected Routes */}
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/detailJob' element={
            <ProtectedRoute>
              <JobDetail />
            </ProtectedRoute>
          } />
          <Route path='/detailInternship' element={
            <ProtectedRoute>
              <InternDetail />
            </ProtectedRoute>
          } />
          <Route path='/userApplications' element={
            <ProtectedRoute>
              <UserApplication />
            </ProtectedRoute>
          } />
          <Route path='/detailApplicationUser' element={
            <ProtectedRoute>
              <DetailApplicationUser />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/adminPanel' element={<Adminpanel />} />
          <Route path='/applications' element={<ViewApplications />} />
          <Route path='/postJob' element={<PostJOb />} />
          <Route path='/postInternship' element={<Postinternships />} />
          <Route path='/detailApplication' element={<DeatilApplication />} />
          <Route path='/userApplication' element={<ProtectedRoute><UserApplication /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
