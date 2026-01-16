import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi2';
import {
    FaBuilding,
    FaRoad,
    FaTools,
    FaDraftingCompass,
    FaHardHat,
    FaCity,
    FaCog,
    FaLeaf
} from 'react-icons/fa';
import heroImage from '../assets/images/hero.png';

const Services = () => {
    const services = [
        {
            icon: FaBuilding,
            title: 'General Contracting',
            description: 'Complete construction services from ground-up development to project completion. We manage every aspect of your project with precision and care.',
            features: ['Commercial Buildings', 'Industrial Facilities', 'Institutional Structures', 'Mixed-Use Developments'],
            color: 'from-primary-500 to-accent',
        },
        {
            icon: FaHardHat,
            title: 'Construction Management',
            description: 'Expert oversight and coordination of your construction project. We ensure seamless execution from start to finish.',
            features: ['Project Scheduling', 'Budget Management', 'Subcontractor Coordination', 'Quality Control'],
            color: 'from-navy-600 to-navy-800',
        },
        {
            icon: FaDraftingCompass,
            title: 'Preconstruction Services',
            description: 'Comprehensive planning and preparation before construction begins. We help you make informed decisions early.',
            features: ['Cost Estimating', 'Value Engineering', 'Constructability Reviews', 'Risk Assessment'],
            color: 'from-emerald-500 to-emerald-700',
        },
        {
            icon: FaTools,
            title: 'Design-Build',
            description: 'Integrated design and construction approach for streamlined project delivery and single-point accountability.',
            features: ['Single Point Responsibility', 'Faster Delivery', 'Cost Efficiency', 'Collaborative Approach'],
            color: 'from-violet-500 to-violet-700',
        },
        {
            icon: FaRoad,
            title: 'Renovation & Tenant Improvements',
            description: 'Transform existing spaces with modern upgrades. We breathe new life into structures while minimizing disruption.',
            features: ['Interior Renovation', 'Building Upgrades', 'Tenant Buildouts', 'Adaptive Reuse'],
            color: 'from-amber-500 to-amber-700',
        },
        {
            icon: FaCity,
            title: 'Specialty Construction',
            description: 'Specialized construction solutions for complex facilities requiring unique expertise and certifications.',
            features: ['Healthcare Facilities', 'Data Centers', 'Industrial Plants', 'Laboratory Spaces'],
            color: 'from-cyan-500 to-cyan-700',
        },
        {
            icon: FaCog,
            title: 'MEP Services',
            description: 'Mechanical, Electrical, and Plumbing coordination that ensures your building operates efficiently and safely.',
            features: ['HVAC Systems', 'Electrical Works', 'Plumbing Solutions', 'Fire Safety Systems'],
            color: 'from-rose-500 to-rose-700',
        },
        {
            icon: FaLeaf,
            title: 'Sustainable Building',
            description: 'Green construction practices that minimize environmental impact while maximizing efficiency and long-term value.',
            features: ['LEED Certification', 'Energy Efficiency', 'Sustainable Materials', 'Green Technologies'],
            color: 'from-teal-500 to-teal-700',
        },
    ];

    const process = [
        { step: '01', title: 'Consultation', description: 'We discuss your vision, requirements, and budget to understand your project needs.' },
        { step: '02', title: 'Planning & Design', description: 'Our team creates detailed plans and designs tailored to your specifications.' },
        { step: '03', title: 'Construction', description: 'Expert execution with regular updates and quality checks throughout the process.' },
        { step: '04', title: 'Completion', description: 'Final inspection, handover, and ongoing support for your completed project.' },
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
                    <img src={heroImage} alt="Services" className="w-full h-full object-cover opacity-20" />
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
                            Our Services
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Comprehensive <span className="text-primary-400">Construction Solutions</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            From concept to completion, we offer a full spectrum of construction services
                            designed to meet your unique needs and exceed your expectations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-navy-800 mb-3 group-hover:text-primary-500 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                                    <HiCheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                            How We Work
                        </span>
                        <h2 className="section-title text-navy-800">
                            Our <span className="gradient-text">Process</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {process.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative text-center"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent rounded-2xl flex items-center justify-center relative">
                                    <span className="text-2xl font-bold text-white">{item.step}</span>
                                    {index < process.length - 1 && (
                                        <div className="absolute -right-full top-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent hidden lg:block" />
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-navy-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-navy-800">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                Why Choose Us
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Experience the <span className="text-primary-400">Vaishno Difference</span>
                            </h2>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                With over 15 years of experience and 500+ successful projects, we&apos;ve earned
                                our reputation as a trusted construction partner. Here&apos;s what sets us apart.
                            </p>

                            <div className="space-y-4">
                                {[
                                    'Experienced team of 50+ professionals',
                                    '100% project completion rate',
                                    'Cutting-edge construction technology',
                                    '24/7 project monitoring and support',
                                    'Transparent pricing with no hidden costs',
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <HiCheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0" />
                                        <span className="text-white">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { value: '500+', label: 'Projects Done' },
                                { value: '200+', label: 'Happy Clients' },
                                { value: '15+', label: 'Years Experience' },
                                { value: '25+', label: 'Awards Won' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-primary-400 mb-1">{stat.value}</div>
                                    <div className="text-gray-300 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
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
                            Get a free consultation and quote for your construction project today.
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all group"
                            >
                                Get Free Quote
                                <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Services;
