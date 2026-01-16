import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Careers from './pages/Careers';
import Applications from './pages/Applications';

// Components
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import './admin.css'; // Import admin specific styles

const AdminRoutes = () => {
    return (
        <>
            <ToastContainer theme="dark" position="top-right" />
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="careers" element={<Careers />} />
                    <Route path="applications" element={<Applications />} />
                </Route>
            </Routes>
        </>
    );
};

export default AdminRoutes;
