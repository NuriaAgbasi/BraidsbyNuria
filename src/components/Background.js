import React from 'react';
import leaf1 from '../images/flower.png';
import leaf2 from '../images/headphone.png';
import leaf3 from '../images/leave.png';
import bow from '../images/bow.png'
import cherries from '../images/cherries.png'
import braidsImage from '../images/Braids.jpeg';
import stitchBraidsImage from '../images/stitch braids 🧵.jpeg';
import twist from '../images/twist.jpeg';
import ghanaweaving from '../images/ghanaweaving.jpeg';

function Background({ showLeaf1 = true, showLeaf2 = true, showLeaf3 = true, showGhanaWeaving = true, showTwist = true, showBraidsStack = true, showStitchBraidsStack = true, showCherries = true, showBow = true }) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Leaf Decorations */}
            {showLeaf1 && (
                <div className="absolute top-[10%] left-[15%] z-20">
                    <img src={leaf1} alt="Leaf 1" className="w-[50px] opacity-70" />
                </div>
            )}
            {showLeaf2 && (
                <div className="absolute top-[30%] right-[20%] z-20">
                    <img src={leaf2} alt="Leaf 2" className="w-[70px] opacity-70" />
                </div>
            )}
            {showLeaf3 && (
                <div className="absolute top-[60%] left-[5%] z-20">
                    <img src={leaf3} alt="Leaf 3" className="w-[60px] opacity-70" />
                </div>
            )}
            {showCherries && (
                <div className="absolute top-[75%] left-[40%] z-20">
                    <img src={bow} alt="bow" className="w-[60px] opacity-70" />
                </div>
            )}
            {showBow && (
                <div className="absolute top-[60%] left-[80%] z-20">
                    <img src={cherries} alt="cherries" className="w-[60px] opacity-70" />
                </div>
            )}

            {/* Additional Image Layers */}
            {showGhanaWeaving && (
                <div className="absolute top-[20%] left-[5%] z-20">
                    <img src={ghanaweaving} alt="Ghana Weaving" className="w-[300px] rounded-lg shadow-lg transform rotate-2" />
                </div>
            )}
            {showTwist && (
                <div className="absolute top-[40%] right-[10%] z-20">
                    <img src={twist} alt="Twist Braids" className="w-[250px] rounded-lg shadow-lg transform rotate-3" />
                </div>
            )}

            {/* Stacked Images */}
            {showBraidsStack && (
                <div className="absolute top-[70%] left-[15%] z-20">
                    <img src={braidsImage} alt="Braids Stack" className="w-[200px] h-[200px] rounded-xl transform -rotate-6" />
                </div>
            )}
            {showStitchBraidsStack && (
                <div className="absolute top-[80%] left-[80%] z-20">
                    <img src={stitchBraidsImage} alt="Stitch Braids Stack" className="w-[180px] h-[200px] rounded-xl transform rotate-6" />
                </div>
            )}
        </div>
    );
}

export default Background;
