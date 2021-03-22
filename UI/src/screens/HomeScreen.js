import React from 'react';
import HeroSection from '../components/HeroSection.js';
import Footer from '../components/Footer.js';
import InfoSection_1 from '../components/InfoSection_1.js';
import InfoSection_2 from '../components/InfoSection_2.js';
import ProfileCard from '../components/ProfileCard.js'
import Scroll from '../components/Scroll.js';

export default function HomeScreen() {

    return (
        <div className="home">
            <Scroll/>
            <div className="hero_section">
                <HeroSection />
            </div>
            <div className="info_section">
                <InfoSection_1 />
            </div>
            {/*<div className="info_section_2">
                <InfoSection_2 />
            </div>*/}
            <div className="profile_section">
                <ProfileCard />
            </div>
            <div className="footer_section">
                <Footer />
            </div>
        </div>
    );
}