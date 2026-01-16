import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi2';
import aboutImage from '../assets/images/about.png';

const AboutSection = () => {
    const features = [
        'Quality Craftsmanship',
        'On-Time Delivery',
        'Experienced Team',
        'Modern Technology',
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-50" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={aboutImage}
                                    alt="Our Team"
                                    className="w-full h-[400px] lg:h-[500px] object-cover"
                                />
                            </motion.div>

                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent rounded-xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">15+</span>
                                    </div>
                                    <div>
                                        <p className="text-navy-800 font-bold text-lg">Years of</p>
                                        <p className="text-gray-500">Excellence</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative Element */}
                            <div className="absolute -z-10 -top-6 -left-6 w-full h-full border-2 border-primary-200 rounded-2xl" />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.span
                            variants={itemVariants}
                            className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4"
                        >
                            About Us
                        </motion.span>

                        <motion.h2
                            variants={itemVariants}
                            className="section-title text-navy-800 mb-6"
                        >
                            Building Excellence <br />
                            <span className="gradient-text">With Integrity</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-gray-600 mb-6 leading-relaxed"
                        >
                            Vaishno Infra is a premier construction company dedicated to transforming architectural
                            dreams into solid reality. With over 15 years of experience, we have established ourselves
                            as leaders in the construction industry.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-gray-600 mb-8 leading-relaxed"
                        >
                            Our commitment to quality, safety, and innovation drives every project we undertake.
                            From residential complexes to commercial buildings, we deliver excellence at every step.
                        </motion.p>

                        {/* Features List */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 gap-4 mb-8"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center gap-3"
                                >
                                    <HiCheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0" />
                                    <span className="text-navy-700 font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Link to="/about">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary group"
                                >
                                    Discover Our Story
                                    <HiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
