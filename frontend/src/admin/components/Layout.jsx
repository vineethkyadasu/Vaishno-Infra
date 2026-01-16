
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { HiChartPie, HiOfficeBuilding, HiBriefcase, HiLogout, HiUserGroup } from 'react-icons/hi';
import { logout } from '../utils/auth';

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: HiChartPie, label: 'Dashboard' },
        { path: '/admin/projects', icon: HiOfficeBuilding, label: 'Projects' },
        { path: '/admin/careers', icon: HiBriefcase, label: 'Careers' },
        { path: '/admin/applications', icon: HiUserGroup, label: 'Applications' },
    ];

    return (
        <div className="flex h-screen bg-admin-navy-900 text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-admin-navy-800 border-r border-gray-800 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-admin-primary-400 to-admin-primary-600 bg-clip-text text-transparent">
                        Vaishno Admin
                    </h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
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
            <main className="flex-1 overflow-auto bg-admin-navy-900 p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
