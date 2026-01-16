import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HiPhone,
    HiEnvelope,
    HiMapPin
} from 'react-icons/hi2';
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram
} from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' },
    ];

    const services = [
        { name: 'Construction', path: '/services' },
        { name: 'Infrastructure', path: '/services' },
        { name: 'Renovation', path: '/services' },
        { name: 'Architecture', path: '/services' },
    ];

    const contactInfo = [
        { icon: HiPhone, text: '+1 (713) 555-0123', href: 'tel:+17135550123' },
        { icon: HiEnvelope, text: 'info@vaishnoinfra.com', href: 'mailto:info@vaishnoinfra.com' },
        { icon: HiMapPin, text: 'Houston, TX', href: '#' },
    ];

    const socialLinks = [
        { icon: FaFacebookF, href: '#', label: 'Facebook' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
        { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
        { icon: FaInstagram, href: '#', label: 'Instagram' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <footer className="bg-navy-800 text-white">
            {/* Main Footer */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container-custom py-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Company Info */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <Link to="/">
                            <img src={logo} alt="Vaishno Infra" className="h-14 w-auto" />
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Building excellence with integrity. We deliver innovative construction solutions
                            that transform visions into reality with precision and quality.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary-500" />
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-6 relative inline-block">
                            Our Services
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary-500" />
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to={service.path}
                                        className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary-500" />
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <li key={index}>
                                    <a
                                        href={info.href}
                                        className="flex items-start gap-3 text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                                    >
                                        <info.icon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                                        {info.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Vaishno Infra. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Designed and Developed by{' '}
                            <a
                                href="https://www.vikrin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                Vikrin2.0
                            </a>
                        </p>
                        <div className="flex gap-6">
                            <Link to="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
