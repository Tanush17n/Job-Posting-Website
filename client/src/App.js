import React from 'react';

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

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/register' element = {<Register/>}/>
        <Route path='/Internships' element = {<Intern/>} />
        <Route path='/Jobs' element = {<JobAvl/>} />
        <Route path='/JobDetail' element = {<JobDetail/>}/>
        <Route path='/InternshipDetail' element = {<InternDetail/>}/>

      
      </Routes>


      <Footer/>
    </div>
  );
}

export default App;
