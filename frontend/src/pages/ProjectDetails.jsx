
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCalendar, HiLocationMarker, HiCheckCircle } from 'react-icons/hi';
import axios from 'axios';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Determine if we are fetching by ID (from database) or finding in static list (legacy)
                // For now, assume backend is primary source if ID looks like a Mongo ID (24 hex chars)
                // Or just try fetching from backend first
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`);
                setProject(res.data);
            } catch (err) {
                console.error("Failed to fetch project from API", err);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-3xl font-bold text-navy-900 mb-4">Project Not Found</h2>
                <Link to="/" className="text-primary-500 hover:text-primary-600 font-medium">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-20"> {/* Add padding for fixed header */}
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-navy-900">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-primary-500 text-white text-sm font-semibold rounded-full uppercase mb-4">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
                        <div className="flex items-center text-gray-300 text-lg">
                            <HiLocationMarker className="mr-2 text-primary-400" />
                            {project.location}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold text-navy-800 mb-6">Project Overview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <h3 className="text-xl font-bold text-navy-800 mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {project.features?.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-lg">
                                        <HiCheckCircle className="text-primary-500 mr-3 text-xl" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 sticky top-32"
                        >
                            <h3 className="text-xl font-bold text-navy-800 mb-6">Project Info</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Client</p>
                                    <p className="font-semibold text-navy-900">Confidential</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Completion Date</p>
                                    <div className="flex items-center font-semibold text-navy-900">
                                        <HiCalendar className="mr-2 text-primary-500" />
                                        {project.completionDate}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Location</p>
                                    <p className="font-semibold text-navy-900">{project.location}</p>
                                </div>
                                <hr className="border-gray-100" />
                                <Link
                                    to="/"
                                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-navy-800 font-semibold py-3 rounded-lg transition-colors duration-300"
                                >
                                    Back to Projects
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
