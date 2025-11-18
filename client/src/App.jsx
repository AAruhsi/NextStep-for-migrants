import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HealthcareSearch from "./pages/HealthcareSearch";
import Institutes from "./pages/institute_Front";
import GovernmentPolicies from "./pages/GovernmentPolicies";
import JobListings from "./pages/Migration_Front";
import ProfilePage from "./pages/Profile";
import Employers from "./pages/Employers";
import ForgotPassword from "./components/ForgotPassword";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster /> {/* Add Toaster here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/governmentPolicies" element={<GovernmentPolicies />} />

          <Route path="/healthCareSearch" element={<HealthcareSearch />} />
          <Route path="/jobListings" element={<JobListings />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/institute" element={<Institutes />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
