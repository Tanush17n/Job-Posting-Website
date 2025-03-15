import React, { useEffect } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footerr/Footer';
import Register from './Components/auth/Register';
import Intern from './Components/Internships/Intern';
import JobAvl from './Components/Job/JobAvl';
import JobDetail from './Components/Job/JobDetail';
import InternDetail from './Components/Internships/InternDetail';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './Feature/UserSlice';
import { auth } from './Firebase/firebase';
import Profile from './Profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from './Admin/ViewAllApplication';
import PostJOb from './Admin/PostJob';
import Postinternships from './Admin/Postinternships';
import DeatilApplication from './Applications/DeatilApplication'
import DetailApplicationUser from "./Applications/DetailApplicationUser"
import UserApplication from './Profile/UserApplication';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    auth.onAuthStateChanged((authuser)=>{
      if(authuser){
        dispatch(login({
          uid:authuser.uid,
          photo:authuser.photoURL,
          name:authuser.displayName,
          emailid:authuser.email
        }))
      }
      else{
        dispatch(logout())
      }
      
    })
  }, [dispatch])
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/register' element = {<Register/>}/>
        <Route path='/Internships' element = {<Intern/>} />
        <Route path='/Jobs' element = {<JobAvl/>} />
        <Route path='/detailJob' element = {<JobDetail/>}/>
        <Route path='/detailInternship' element = {<InternDetail/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/adminLogin' element = {<AdminLogin/>}/>
        <Route path='/adminPanel' element = {<Adminpanel/>}/>
        <Route path='/applications' element = {<ViewAllApplication/>}/>
        <Route path='/postJob' element = {<PostJOb/>}/>
        <Route path='/postInternship' element = {<Postinternships/>}/>
        <Route path='/detailApplication' element = {<DeatilApplication/>}/>
        <Route path='/detailApplicationUser' element = {<DetailApplicationUser/>}/>
        <Route path='/userApplications' element = {<UserApplication/>}/>
        
         

      
      </Routes>


      <Footer/>
    </div>
  );
}

export default App;
