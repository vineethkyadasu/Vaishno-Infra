
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiOfficeBuilding, HiBriefcase, HiUsers } from 'react-icons/hi';
import { motion } from 'framer-motion';

import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-admin-navy-800 p-6 rounded-xl border border-gray-700 shadow-lg"
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-400 text-sm mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
                <Icon className={`text-2xl ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
    </motion.div>
);

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired
};

const Dashboard = () => {
    const [stats, setStats] = useState({ projects: 0, careers: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const projects = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
                const careers = await axios.get(`${import.meta.env.VITE_API_URL}/careers`);
                setStats({
                    projects: projects.data.length,
                    careers: careers.data.length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Projects"
                    value={stats.projects}
                    icon={HiOfficeBuilding}
                    color="bg-admin-primary-500"
                />
                <StatCard
                    title="Active Job Openings"
                    value={stats.careers}
                    icon={HiBriefcase}
                    color="bg-green-500"
                />
                <StatCard
                    title="Admin Users"
                    value="1"
                    icon={HiUsers}
                    color="bg-purple-500"
                />
            </div>

            <div className="bg-admin-navy-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <p className="text-gray-400">Welcome to the Vaishno Infra Admin Panel. Use the sidebar to manage projects and careers.</p>
            </div>
        </div>
    );
};

export default Dashboard;
