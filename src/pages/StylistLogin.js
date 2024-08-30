
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

function StylistLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        setError('');


        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {

            const { data: userData, error: userError } = await supabase
                .from('stylists')
                .select('*')
                .eq('email', email)
                .single();

            if (userError || !userData) {
                setError('Invalid stylist credentials.');
            } else {
                navigate('/stylist-dashboard'); 
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#e9ede6]">
            <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#A9B49F]">Stylist Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded w-full"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="p-2 border border-gray-300 rounded w-full"
                        required
                    />
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="bg-[#A9B49F] text-white px-4 py-2 rounded-lg w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StylistLogin;
