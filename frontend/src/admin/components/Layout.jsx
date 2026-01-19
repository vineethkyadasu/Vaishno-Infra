import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { HiChartPie, HiOfficeBuilding, HiBriefcase, HiLogout, HiUserGroup, HiMenu, HiX } from 'react-icons/hi';
import { logout } from '../utils/auth';

const Layout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const navItems = [
        { path: '/admin/dashboard', icon: HiChartPie, label: 'Dashboard' },
        { path: '/admin/projects', icon: HiOfficeBuilding, label: 'Projects' },
        { path: '/admin/careers', icon: HiBriefcase, label: 'Careers' },
        { path: '/admin/applications', icon: HiUserGroup, label: 'Applications' },
    ];

    return (
        <div className="flex h-screen bg-admin-navy-900 text-white font-sans overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-admin-navy-800 border-b border-gray-800 flex items-center justify-between px-4 z-40">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-400 hover:text-white p-2 rounded-lg"
                >
                    {isSidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                </button>
                <span className="text-xl font-bold bg-gradient-to-r from-admin-primary-400 to-admin-primary-600 bg-clip-text text-transparent">
                    Vaishno Admin
                </span>
                <div className="w-8"></div> {/* Spacer for centering */}
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden glass-backdrop"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-admin-navy-800 border-r border-gray-800 flex flex-col transition-transform duration-300 ease-in-out
                    lg:static lg:translate-x-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="p-6 hidden lg:block">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-admin-primary-400 to-admin-primary-600 bg-clip-text text-transparent">
                        Vaishno Admin
                    </h1>
                </div>

                <div className="p-6 lg:hidden mt-12">
                    {/* Mobile sidebar header if needed, currently using global header */}
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-admin-primary-600/10 text-admin-primary-400 font-medium'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                }`
                            }
                        >
                            <item.icon className="text-xl mr-3" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <HiLogout className="text-xl mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-admin-navy-900 p-4 lg:p-8 pt-20 lg:pt-8 w-full">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
