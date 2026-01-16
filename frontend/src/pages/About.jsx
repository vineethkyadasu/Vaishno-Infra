import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi2';
import { FaBuilding, FaUsers, FaAward, FaHandshake } from 'react-icons/fa';
import aboutImage from '../assets/images/about.png';
import heroImage from '../assets/images/hero.png';

const About = () => {
    const values = [
        {
            icon: FaBuilding,
            title: 'Quality Excellence',
            description: 'We never compromise on quality. Every project reflects our commitment to the highest standards.',
        },
        {
            icon: FaUsers,
            title: 'Client Focus',
            description: 'Your vision is our mission. We work closely with clients to exceed their expectations.',
        },
        {
            icon: FaAward,
            title: 'Innovation',
            description: 'We embrace cutting-edge technology and modern construction methods for optimal results.',
        },
        {
            icon: FaHandshake,
            title: 'Integrity',
            description: 'Transparency and honesty guide every interaction. We build trust along with structures.',
        },
    ];

    const milestones = [
        { year: '2009', event: 'Company Founded', description: 'Started with a vision to transform construction' },
        { year: '2012', event: 'First Major Project', description: 'Completed our first commercial complex' },
        { year: '2016', event: '100+ Projects', description: 'Milestone of 100 successful project deliveries' },
        { year: '2020', event: 'Industry Recognition', description: 'Received multiple awards for excellence' },
        { year: '2024', event: 'Expansion', description: 'Expanded operations across the United States' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-transition"
        >
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-navy-800 overflow-hidden">
                <div className="absolute inset-0">
                    <img src={heroImage} alt="Construction" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/90" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-6">
                            About Us
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Building Dreams Into <span className="text-primary-400">Reality</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            For over 15 years, Vaishno Infra has been at the forefront of construction excellence,
                            delivering projects that stand as testaments to quality, innovation, and dedication.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img src={aboutImage} alt="Our Story" className="w-full h-[500px] object-cover" />
                            </div>
                            <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-primary-500 to-accent p-8 rounded-2xl text-white">
                                <div className="text-4xl font-bold">15+</div>
                                <div className="text-sm">Years of Excellence</div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.span variants={itemVariants} className="text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                Our Story
                            </motion.span>
                            <motion.h2 variants={itemVariants} className="section-title text-navy-800 mb-6">
                                A Legacy of <span className="gradient-text">Excellence</span>
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-gray-600 mb-6 leading-relaxed">
                                Founded in 2009, Vaishno Infra began with a simple yet powerful vision: to redefine
                                construction standards in the United States. What started as a small team of passionate engineers
                                has grown into one of the most trusted construction companies in the nation.
                            </motion.p>
                            <motion.p variants={itemVariants} className="text-gray-600 mb-8 leading-relaxed">
                                Today, we proudly stand as industry leaders, having completed over 500 projects across
                                residential, commercial, and infrastructure sectors. Our success is built on a foundation
                                of quality craftsmanship, innovative solutions, and an unwavering commitment to client satisfaction.
                            </motion.p>

                            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
                                {['Quality Assurance', 'On-Time Delivery', 'Safety First', 'Client Satisfaction'].map((item, i) => (
                                    <motion.div key={i} variants={itemVariants} className="flex items-center gap-2">
                                        <HiCheckCircle className="w-5 h-5 text-primary-500" />
                                        <span className="text-navy-700 font-medium">{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-10 rounded-2xl shadow-card"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl text-white">🎯</span>
                            </div>
                            <h3 className="text-2xl font-bold text-navy-800 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To deliver exceptional construction solutions that exceed client expectations through
                                innovation, integrity, and excellence. We aim to build structures that enhance
                                communities and stand the test of time.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 md:p-10 rounded-2xl shadow-card"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl text-white">🔭</span>
                            </div>
                            <h3 className="text-2xl font-bold text-navy-800 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be the most trusted and innovative construction company in the United States, recognized for
                                our commitment to sustainable building practices, cutting-edge technology, and
                                transforming the landscape of infrastructure development.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            Our Values
                        </span>
                        <h2 className="section-title text-navy-800">
                            What <span className="gradient-text">Drives Us</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent rounded-xl flex items-center justify-center">
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-800 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding bg-navy-800">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            Our Journey
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            Milestones That <span className="text-primary-400">Define Us</span>
                        </h2>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-500/30 hidden md:block" />

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                                >
                                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center mb-4 md:mb-0`}>
                                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl inline-block">
                                            <span className="text-primary-400 font-bold text-xl">{milestone.year}</span>
                                            <h3 className="text-white font-bold text-lg mt-2">{milestone.event}</h3>
                                            <p className="text-gray-400 text-sm mt-1">{milestone.description}</p>
                                        </div>
                                    </div>

                                    <div className="w-4 h-4 bg-primary-500 rounded-full relative z-10 hidden md:block">
                                        <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-30" />
                                    </div>

                                    <div className="flex-1" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-primary-500 to-accent">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Let&apos;s discuss how we can bring your vision to life. Our team is ready to help.
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all group"
                            >
                                Contact Us Today
                                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
