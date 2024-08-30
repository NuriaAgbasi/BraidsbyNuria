
import React from 'react';
import { supabase } from '../supabaseClient';

const SignIn = () => {
    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
    };

    return (
        <div>
            <h2>Sign In</h2>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

export default SignIn;
