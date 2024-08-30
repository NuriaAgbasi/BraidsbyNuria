import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);


    const handleProfileClick = () => {
        if (user) {
            navigate('/profile');
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-30 bg-white bg-opacity-80 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center">
            <div className="text-2xl font-custom text-[#4A4A4A]">BraidsbyNuria</div>
            <div className="hidden md:flex space-x-6 items-center">
                <a
                    href="/book-appointment"
                    className="text-lg bg-orange-500 text-white rounded-xl px-4 py-2 font-medium transition-transform transform hover:scale-105 hover:bg-orange-600"
                >
                    Book an appointment
                </a>
                <a
                    href="/founder"
                    className="text-lg font-medium text-[#4A4A4A] hover:text-orange-500 transition"
                >
                    Founder
                </a>
                <a
                    href="/work-with-us"
                    className="text-lg font-medium text-[#4A4A4A] hover:text-orange-500 transition"
                >
                    Work with us!
                </a>
                <a
                    href="#"
                    className="text-lg font-medium text-[#4A4A4A] hover:text-orange-500 transition"
                >
                    Stylist?
                </a>
                {/* Profile Image */}
                <button
                    onClick={handleProfileClick}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden"
                >
                    <img
                        src={user ? (user.user_metadata?.avatar_url || 'default-avatar.png') : 'blank-avatar.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
