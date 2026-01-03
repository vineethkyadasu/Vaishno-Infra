import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import StatsSection from '../components/StatsSection';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="page-transition"
        >
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <StatsSection />
            <ProjectsSection />
            <TestimonialsSection />
            <CTASection />
        </motion.div>
    );
};

export default Home;
