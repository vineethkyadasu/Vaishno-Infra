import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowRight, HiPlay } from 'react-icons/hi2';
import heroImage from '../assets/images/hero.png';

const HeroSection = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    const stats = [
        { number: '15+', label: 'Years Experience' },
        { number: '500+', label: 'Projects Completed' },
        { number: '200+', label: 'Happy Clients' },
        { number: '50+', label: 'Team Experts' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const headline = "Building Tomorrow's";
    const subheadline = "Infrastructure Today";

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={heroImage}
                    alt="Construction Site"
                    className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"
                />
            </div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 container-custom text-center"
            >
                <div className="w-full max-w-5xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            <span className="text-white/80 text-sm font-medium">Leading Construction Company</span>
                        </motion.div>

                        {/* Animated Headline */}
                        <motion.h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 leading-tight">
                            <motion.span className="block">
                                {headline.split('').map((char, index) => (
                                    <motion.span
                                        key={index}
                                        variants={letterVariants}
                                        className="inline-block"
                                        style={{ marginRight: char === ' ' ? '0.3em' : '0' }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </motion.h1>

                        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-accent">
                                {subheadline}
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
                            We transform ambitious visions into architectural masterpieces. With cutting-edge technology and
                            unmatched expertise, we deliver construction excellence that stands the test of time.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary group text-lg px-8 py-4"
                                >
                                    Start Your Project
                                    <HiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-lg group"
                                >
                                    <HiPlay className="mr-2 w-5 h-5" />
                                    Learn More
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary-500/50 transition-colors"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
                                        className="text-3xl md:text-4xl font-bold text-primary-400 mb-1"
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1.5 h-3 bg-primary-500 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
