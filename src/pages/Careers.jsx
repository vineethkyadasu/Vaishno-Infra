import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiUserGroup, HiAcademicCap, HiHeart, HiClock, HiCurrencyDollar, HiMapPin, HiArrowRight } from 'react-icons/hi2';

const Careers = () => {
    const benefits = [
        {
            icon: HiCurrencyDollar,
            title: 'Competitive Salary',
            description: 'Industry-leading compensation packages with performance bonuses'
        },
        {
            icon: HiHeart,
            title: 'Health Benefits',
            description: 'Comprehensive medical, dental, and vision coverage for you and your family'
        },
        {
            icon: HiAcademicCap,
            title: 'Growth Opportunities',
            description: 'Continuous learning programs and career advancement paths'
        },
        {
            icon: HiClock,
            title: 'Work-Life Balance',
            description: 'Flexible schedules and generous paid time off'
        },
        {
            icon: HiUserGroup,
            title: 'Team Culture',
            description: 'Collaborative environment with supportive leadership'
        },
        {
            icon: HiBriefcase,
            title: '401(k) Plan',
            description: 'Retirement savings plan with company matching'
        }
    ];

    const openPositions = [
        {
            title: 'Project Manager',
            department: 'Operations',
            location: 'Houston, TX',
            type: 'Full-time',
            description: 'Lead and manage construction projects from inception to completion.'
        },
        {
            title: 'Civil Engineer',
            department: 'Engineering',
            location: 'Houston, TX',
            type: 'Full-time',
            description: 'Design and oversee construction of infrastructure projects.'
        },
        {
            title: 'Site Supervisor',
            department: 'Field Operations',
            location: 'Houston, TX',
            type: 'Full-time',
            description: 'Supervise daily construction activities and ensure safety compliance.'
        },
        {
            title: 'Estimator',
            department: 'Pre-Construction',
            location: 'Houston, TX',
            type: 'Full-time',
            description: 'Prepare accurate cost estimates for construction projects.'
        },
        {
            title: 'Safety Officer',
            department: 'Health & Safety',
            location: 'Houston, TX',
            type: 'Full-time',
            description: 'Implement and monitor safety protocols across all job sites.'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="container-custom relative z-10 text-center py-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-6"
                    >
                        Join Our Team
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Build Your <span className="text-gradient">Career</span> With Us
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Join a team of passionate professionals dedicated to building excellence.
                        We offer exciting opportunities for growth and innovation.
                    </motion.p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Why Work With Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2 mb-4">
                            Benefits & Perks
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We believe in taking care of our team. Here's what you can expect when you join Vaishno Infra.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent rounded-xl flex items-center justify-center mb-4">
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-800 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Opportunities</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2 mb-4">
                            Open Positions
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our current openings and find the perfect role for your skills and aspirations.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-navy-800 group-hover:text-primary-500 transition-colors">
                                            {position.title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">{position.description}</p>
                                        <div className="flex flex-wrap gap-3 mt-3">
                                            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                                <HiBriefcase className="w-4 h-4" />
                                                {position.department}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                                <HiMapPin className="w-4 h-4" />
                                                {position.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm text-primary-500 font-medium">
                                                {position.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center gap-2 btn-primary"
                                        >
                                            Apply Now
                                            <HiArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Don't See the Right Fit?
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
                        </p>
                        <a
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Contact Us
                            <HiArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Careers;
