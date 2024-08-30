import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; 

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const { data: user, error: authError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });

            if (authError) throw authError;

          
            const { data: stylistData, error: stylistError } = await supabase
                .from('stylists')
                .select('role')
                .eq('id', user.user.id)
                .single();

            if (stylistError && stylistError.code !== 'PGRST116') throw stylistError;

           
            if (stylistData && stylistData.role === 'stylist') {
                navigate('/stylist-dashboard');
            } else {
                navigate('/profile'); 
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#e9ede6]">
            <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#A9B49F]">Login</h1>
                <button
                    onClick={handleGoogleLogin}
                    className="bg-[#A9B49F] text-white px-4 py-2 rounded-lg w-full"
                >
                    Sign in with Google
                </button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                <p className="mt-6 text-center">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-orange-500 font-medium hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
