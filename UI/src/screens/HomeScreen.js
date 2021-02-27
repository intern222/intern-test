import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

export default function HomeScreen() {


    return (
        <div className="footer-position">
            <HeroSection />
            <Cards />
            <Footer />
        </div>
    );
}