import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import Background from '../components/Background.js';

function Profile() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();


    if (!user) {
      setUser(null);
    } else {
      setUser(user);
    }
  };

  const fetchAppointments = async () => {
    if (!user) {
      return;
    }

    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching appointments:', error);
      return;
    }

    setAppointments(appointments);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      navigate('/');
    }
  };

  if (!user) {

    return (
      <div className="relative min-h-screen bg-[#e9ede6] overflow-hidden flex items-center justify-center">
        <Background
          showLeaf1={true}
          showLeaf2={true}
          showLeaf3={true}
          showGhanaWeaving={false}
          showTwist={false}
          showBraidsStack={false}
          showStitchBraidsStack={false}
        />
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Please Log In or Sign Up</h2>
          <p className="mb-6">To view your profile and appointments, please log in or sign up.</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#e9ede6] overflow-hidden">
      <Background
        showLeaf1={true}
        showLeaf2={true}
        showLeaf3={true}
        showGhanaWeaving={false}
        showTwist={false}
        showBraidsStack={false}
        showStitchBraidsStack={false}
      />
      <div className="profile-page mt-28 container mx-auto py-8 flex flex-col items-center">
        <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1
            className="text-5xl text-center font-bold text-[#A9B49F] mb-4"
            style={{
              fontFamily: 'Matemasie, sans-serif',
              textShadow: `
                -1px -1px 0 #000,  /* Top Left */
                1px -1px 0 #000,   /* Top Right */
                -1px 1px 0 #000,   /* Bottom Left */
                1px 1px 0 #000    /* Bottom Right */
              `,
            }}
          >
            Profile
          </h1>

          {/* User Information */}
          <div className="mb-6 text-center">
            <img
              src={user?.user_metadata?.avatar_url || 'default-avatar.png'}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{user?.user_metadata?.full_name || 'No Name'}</h2>
            <p className="text-lg text-gray-600">{user?.email}</p>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="bg-[#A9B49F] hover:bg-[#e9ede6] text-white font-bold py-2 px-4 rounded mt-6"
          >
            Sign Out
          </button>

          {/* Appointments Section */}
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-center mb-4 font-jersey underline">Your Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-center">No appointments found.</p>
            ) : (
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="border-b border-gray-300 py-2">
                    <p>Date: {appointment.appointment_date}</p>
                    <p>Services: {appointment.services.map(service => service.name).join(', ')}</p>
                    <p>Total Price: ${appointment.total_price}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
