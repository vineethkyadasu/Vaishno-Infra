import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import {
    FaBuilding,
    FaRoad,
    FaTools,
    FaDraftingCompass,
    FaHardHat,
    FaCity
} from 'react-icons/fa';

const ServicesSection = () => {
    const services = [
        {
            icon: FaBuilding,
            title: 'General Contracting',
            description: 'Complete construction services from ground-up development to project completion with excellence.',
            color: 'from-primary-500 to-accent',
        },
        {
            icon: FaHardHat,
            title: 'Construction Management',
            description: 'Expert oversight and coordination ensuring projects are delivered on time and within budget.',
            color: 'from-navy-600 to-navy-800',
        },
        {
            icon: FaDraftingCompass,
            title: 'Preconstruction',
            description: 'Comprehensive planning, cost estimating, and value engineering before construction begins.',
            color: 'from-emerald-500 to-emerald-700',
        },
        {
            icon: FaTools,
            title: 'Design-Build',
            description: 'Integrated design and construction approach for streamlined project delivery.',
            color: 'from-violet-500 to-violet-700',
        },
        {
            icon: FaRoad,
            title: 'Renovation & Improvements',
            description: 'Transform existing spaces with modern upgrades and tenant improvements.',
            color: 'from-amber-500 to-amber-700',
        },
        {
            icon: FaCity,
            title: 'Specialty Construction',
            description: 'Specialized construction for healthcare, data centers, industrial, and commercial facilities.',
            color: 'from-cyan-500 to-cyan-700',
        },
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="section-padding bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-500/5 rounded-full blur-3xl" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4">
                        Our Services
                    </span>
                    <h2 className="section-title text-navy-800 mb-6">
                        Complete Construction <br />
                        <span className="gradient-text">Solutions</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        From concept to completion, we offer comprehensive construction services
                        tailored to meet your unique project requirements.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-navy-800 mb-3 group-hover:text-primary-500 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Link */}
                            <Link
                                to="/services"
                                className="inline-flex items-center text-primary-500 font-semibold group/link"
                            >
                                Learn More
                                <HiArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Link to="/services">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-navy"
                        >
                            View All Services
                            <HiArrowRight className="inline-block ml-2" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
