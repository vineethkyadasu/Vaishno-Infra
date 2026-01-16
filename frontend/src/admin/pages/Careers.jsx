
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { authHeader } from '../utils/auth';

const API_URL = `${import.meta.env.VITE_API_URL}/careers`;

const Careers = () => {
    const [careers, setCareers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCareer, setCurrentCareer] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: '',
    });

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const res = await axios.get(API_URL);
            setCareers(res.data);
        } catch {
            toast.error('Failed to fetch careers');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openModal = (career = null) => {
        if (career) {
            setIsEditing(true);
            setCurrentCareer(career);
            setFormData({
                title: career.title,
                location: career.location,
                type: career.type,
                description: career.description,
                requirements: career.requirements.join('\n'),
            });
        } else {
            setIsEditing(false);
            setCurrentCareer(null);
            setFormData({
                title: '',
                location: '',
                type: 'Full-time',
                description: '',
                requirements: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            requirements: formData.requirements.split('\n').filter(r => r.trim() !== '')
        };

        try {
            const config = { headers: authHeader() };
            if (isEditing) {
                await axios.put(`${API_URL}/${currentCareer._id}`, data, config);
                toast.success('Position updated');
            } else {
                await axios.post(API_URL, data, config);
                toast.success('Position added');
            }
            setIsModalOpen(false);
            fetchCareers();
        } catch {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this position?')) {
            try {
                await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
                toast.success('Position deleted');
                fetchCareers();
            } catch {
                toast.error('Failed to delete');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Career Opportunities</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center bg-admin-primary-600 hover:bg-admin-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <HiPlus className="mr-2" /> Add Position
                </button>
            </div>

            <div className="bg-admin-navy-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-admin-navy-900 text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4 font-semibold">Job Title</th>
                            <th className="p-4 font-semibold">Location</th>
                            <th className="p-4 font-semibold">Type</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {careers.map((career) => (
                            <tr key={career._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="p-4 font-medium text-white">{career.title}</td>
                                <td className="p-4">{career.location}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                        {career.type}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button onClick={() => openModal(career)} className="text-admin-primary-400 hover:text-white mr-3">
                                        <HiPencil className="text-xl" />
                                    </button>
                                    <button onClick={() => handleDelete(career._id)} className="text-red-400 hover:text-white">
                                        <HiTrash className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
                    <div className="bg-admin-navy-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Position' : 'New Position'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <HiX className="text-2xl" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Requirements (one per line)</label>
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-300 hover:text-white">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-admin-primary-600 text-white rounded-lg hover:bg-admin-primary-500 font-medium">{isEditing ? 'Save Changes' : 'Post Job'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
