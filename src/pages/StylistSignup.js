import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

function StylistSignup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleGoogleSignup = async () => {
        try {
            const { data: user, error: authError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });

            if (authError) throw authError;

            const { data: existingStylist, error: checkError } = await supabase
                .from('stylists')
                .select('*')
                .eq('id', user.user.id)
                .single();

            if (checkError && checkError.code !== 'PGRST116') throw checkError;


            if (!existingStylist) {
                const { error: insertError } = await supabase
                    .from('stylists')
                    .insert({
                        id: user.user.id,
                        email: user.user.email,
                        name: user.user.user_metadata.full_name || 'Unnamed Stylist',
                        phone: '',
                        role: 'stylist',
                    });

                if (insertError) throw insertError;
            }

            navigate('/stylist-dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#e9ede6]">
            <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#A9B49F]">Stylist Signup</h1>
                <button
                    onClick={handleGoogleSignup}
                    className="bg-[#A9B49F] text-white px-4 py-2 rounded-lg w-full"
                >
                    Sign up with Google
                </button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default StylistSignup;
