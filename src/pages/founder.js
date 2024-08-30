import React from 'react';
import Background from '../components/Background.js';

function Founder() {
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
            <div className="about-founder-page mt-28 container mx-auto py-8 flex flex-col items-center">
                <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
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
                        Meet Our Founder!
                    </h1>
                    <div className="relative mb-6">
                        <img
                            src="https://via.placeholder.com/150" 
                            alt="Founder"
                            className="rounded-full border-4 border-[#A9B49F] shadow-lg"
                            style={{ width: '150px', height: '150px' }}
                        />
                    </div>
                    <p className="text-lg text-gray-700 mb-4">
                        Hello there!

                        You’ve probably guessed it—I'm Nuria, a 17-year-old Nigerian who journeyed from home to the UK in search of greener pastures (or as I like to call it, “bread”). I created BraidsByNuria to showcase my passion for braiding. From learning how to braid when I was little to crafting countless styles, I wanted a platform to share my skills.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        BraidsByNuria is also a medium to help students like me, who are skilled at handling the crown of your head, showcase their talent. So, don't wait—book your appointment now! At the time of writing this, I’m the only braider on this app, but I’m excited to see how many more talented braiders will join us in the future.
                    </p>
                    <blockquote className="text-lg italic text-gray-600 mb-4">
                        ~ Nuria, August 2024
                    </blockquote>
                    <div className="flex justify-center mt-6">
                        <a
                            href="/book-appointment"
                            className="bg-[#A9B49F] text-white px-4 py-2 rounded shadow-lg hover:bg-[#8a8a6e]"
                        >
                            Book an Appointment
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Founder;
