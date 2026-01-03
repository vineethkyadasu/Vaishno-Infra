import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import skylineTower from '../assets/images/skyline_tower.png';
import greenValleyResidences from '../assets/images/green_valley_residences.png';
import metroExpressLine from '../assets/images/metro_express_line.png';
import techParkComplex from '../assets/images/tech_park_complex.png';
import luxuryVillas from '../assets/images/luxury_villas.png';
import highwayBridge from '../assets/images/highway_bridge.png';

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'commercial', label: 'Commercial' },
        { id: 'residential', label: 'Residential' },
        { id: 'infrastructure', label: 'Infrastructure' },
    ];

    const projects = [
        {
            id: 1,
            title: 'Skyline Tower',
            category: 'commercial',
            location: 'Hyderabad',
            image: skylineTower,
        },
        {
            id: 2,
            title: 'Green Valley Residences',
            category: 'residential',
            location: 'Bangalore',
            image: greenValleyResidences,
        },
        {
            id: 3,
            title: 'Metro Express Line',
            category: 'infrastructure',
            location: 'Chennai',
            image: metroExpressLine,
        },
        {
            id: 4,
            title: 'Tech Park Complex',
            category: 'commercial',
            location: 'Hyderabad',
            image: techParkComplex,
        },
        {
            id: 5,
            title: 'Luxury Villas',
            category: 'residential',
            location: 'Mumbai',
            image: luxuryVillas,
        },
        {
            id: 6,
            title: 'Highway Bridge',
            category: 'infrastructure',
            location: 'Delhi',
            image: highwayBridge,
        },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4">
                        Our Portfolio
                    </span>
                    <h2 className="section-title text-navy-800 mb-6">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Explore our diverse portfolio of successful projects that showcase
                        our commitment to excellence and innovation.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {filters.map((filter) => (
                        <motion.button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.id
                                ? 'bg-primary-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {filter.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -10 }}
                                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full uppercase">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm mb-4">
                                            {project.location}
                                        </p>
                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            className="inline-flex items-center text-primary-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            View Details
                                            <HiArrowRight className="ml-2" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
