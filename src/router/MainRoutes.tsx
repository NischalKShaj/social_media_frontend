// <====================== file to show the main routes for the application ================>

// importing the required modules
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
