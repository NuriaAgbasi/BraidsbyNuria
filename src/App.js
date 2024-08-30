import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import Profile from './pages/Profile';
import PickYourStylist from './pages/PickYourStylist';
import ConfirmYourBooking from './pages/ConfirmBooking';
import WellDone from './pages/Welldone';
import Error from './pages/Error'
import StylistDashboard from './pages/StylistDashboard';
import Login from './pages/LoginPage';
import StylistLogin from './pages/StylistLogin';
import StylistSignup from './pages/StylistSignup';
import Founder from './pages/founder'
import WorkWithUs from './pages/workwithus'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pick-your-stylist" element={<PickYourStylist />} />
        <Route path="/confirm-your-booking" element={<ConfirmYourBooking />} />
        <Route path="/well-done" element={<WellDone />} />
        <Route path="/dashboard" element={<StylistDashboard />} />
        <Route path="/error" element={<Error />} />
        <Route path="/stylist-login" element={<StylistLogin />} />
        <Route path="/stylist-signup" element={<StylistSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/work-with-us" element={<WorkWithUs />} />


      </Routes>
    </Router>
  );
}

export default App;
