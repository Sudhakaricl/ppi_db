import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'; // ✅ Import Home component
import Cover from './components/Cover';
import Test from './components/Test';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> {/* ✅ Add this route */}
        <Route path="/cover" element ={<Cover />}/>
         <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
