import React, { useState, useEffect } from 'react';
import { HiDownload, HiTrash } from 'react-icons/hi';
import api from '../utils/api'; // Assuming this axios instance exists

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/applications');
            setApplications(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching applications:', error);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/applications/${id}`, { status: newStatus });
            fetchApplications(); // Refresh list
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await api.delete(`/applications/${id}`);
                fetchApplications();
            } catch (error) {
                console.error('Error deleting application:', error);
            }
        }
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'All') return true;
        return app.status === filter;
    });

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading applications...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Job Applications</h1>
                    <p className="text-gray-400 mt-1">Manage and track candidate applications</p>
                </div>

                <div className="flex gap-4">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-admin-navy-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-admin-primary-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                    </select>
                </div>
            </div>

            <div className="bg-admin-navy-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700 bg-admin-navy-900/50">
                                <th className="px-6 py-4 text-gray-400 font-medium">Candidate</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Position</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Contact</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Date</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Resume</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Status</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-admin-navy-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{app.name}</div>
                                            <div className="text-sm text-gray-500">{app.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-admin-primary-500/10 text-admin-primary-400">
                                                {app.jobTitle}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {app.phone}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={app.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-admin-primary-400 hover:text-admin-primary-300 transition-colors"
                                            >
                                                <HiDownload className="mr-1" />
                                                PDF
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                                                className={`text-sm rounded-lg px-3 py-1 border-0 cursor-pointer focus:ring-2 focus:ring-admin-primary-500 ${app.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                                                    app.status === 'Reviewed' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        app.status === 'Interview' ? 'bg-purple-500/20 text-purple-400' :
                                                            app.status === 'Hired' ? 'bg-green-500/20 text-green-400' :
                                                                'bg-red-500/20 text-red-400'
                                                    }`}
                                            >
                                                <option value="Applied">Applied</option>
                                                <option value="Reviewed">Reviewed</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Hired">Hired</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                                                title="Delete Application"
                                            >
                                                <HiTrash className="text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Applications;
