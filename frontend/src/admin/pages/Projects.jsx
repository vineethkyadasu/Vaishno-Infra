
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiPlus, HiPencil, HiTrash, HiX, HiUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { authHeader } from '../utils/auth';

const API_URL = `${import.meta.env.VITE_API_URL}/projects`;

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'commercial',
        location: '',
        description: '',
        features: '',
        completionDate: '',
        image: null
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(API_URL);
            setProjects(res.data);
        } catch {
            toast.error('Failed to fetch projects');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const openModal = (project = null) => {
        if (project) {
            setIsEditing(true);
            setCurrentProject(project);
            setFormData({
                title: project.title,
                category: project.category,
                location: project.location,
                description: project.description,
                features: project.features.join(', '),
                completionDate: project.completionDate,
                image: null
            });
        } else {
            setIsEditing(false);
            setCurrentProject(null);
            setFormData({
                title: '',
                category: 'commercial',
                location: '',
                description: '',
                features: '',
                completionDate: '',
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('location', formData.location);
        data.append('description', formData.description);
        data.append('features', JSON.stringify(formData.features.split(',').map(f => f.trim())));
        data.append('completionDate', formData.completionDate);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const config = { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } };
            if (isEditing) {
                await axios.put(`${API_URL}/${currentProject.id}`, data, config);
                toast.success('Project updated successfully');
            } else {
                await axios.post(API_URL, data, config);
                toast.success('Project created successfully');
            }
            setIsModalOpen(false);
            fetchProjects();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
                toast.success('Project deleted');
                fetchProjects();
            } catch {
                toast.error('Failed to delete project');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Projects</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center bg-admin-primary-600 hover:bg-admin-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <HiPlus className="mr-2" /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-admin-navy-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg group">
                        <div className="relative h-48 overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openModal(project)}
                                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500"
                                >
                                    <HiPencil />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500"
                                >
                                    <HiTrash />
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <span className="text-admin-primary-400 text-xs font-bold uppercase tracking-wider">{project.category}</span>
                            <h3 className="text-xl font-bold text-white mt-1 mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-700 pt-3">
                                <span>{project.location}</span>
                                <span>{project.completionDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
                    <div className="bg-admin-navy-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Project' : 'New Project'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <HiX className="text-2xl" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                    >
                                        <option value="commercial">Commercial</option>
                                        <option value="residential">Residential</option>
                                        <option value="infrastructure">Infrastructure</option>
                                    </select>
                                </div>
                            </div>

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
                                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Features (comma separated)</label>
                                <input
                                    type="text"
                                    name="features"
                                    value={formData.features}
                                    onChange={handleInputChange}
                                    className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                    placeholder="Gym, Pool, 24/7 Security"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Completion Date</label>
                                <input
                                    type="text"
                                    name="completionDate"
                                    value={formData.completionDate}
                                    onChange={handleInputChange}
                                    className="w-full bg-admin-navy-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-admin-primary-500 focus:outline-none"
                                    placeholder="Dec 2024"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Project Image</label>
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 bg-admin-navy-900 text-center">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="image-upload"
                                        accept="image/*"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                                        <HiUpload className="text-4xl text-gray-500 mb-2" />
                                        <span className="text-gray-400 text-sm">Click to upload image</span>
                                    </label>
                                    {formData.image && <p className="text-admin-primary-400 text-xs mt-2">{formData.image.name}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-admin-primary-600 text-white rounded-lg hover:bg-admin-primary-500 font-medium transition-colors"
                                >
                                    {isEditing ? 'Update Project' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
