import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    HiPhone,
    HiEnvelope,
    HiMapPin,
    HiClock,
    HiPaperAirplane
} from 'react-icons/hi2';
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp
} from 'react-icons/fa';
import heroImage from '../assets/images/hero.png';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        setTimeout(() => setSubmitStatus(null), 5000);
    };

    const contactInfo = [
        {
            icon: HiPhone,
            title: 'Phone',
            details: ['+1 (713) 555-0123', '+1 (713) 555-0124'],
            action: 'tel:+17135550123',
            color: 'from-primary-500 to-accent'
        },
        {
            icon: HiEnvelope,
            title: 'Email',
            details: ['info@vaishnoinfra.com', 'projects@vaishnoinfra.com'],
            action: 'mailto:info@vaishnoinfra.com',
            color: 'from-navy-600 to-navy-800'
        },
        {
            icon: HiMapPin,
            title: 'Address',
            details: ['1200 Main Street, Suite 500', 'Houston, TX 77002'],
            action: '#',
            color: 'from-emerald-500 to-emerald-700'
        },
        {
            icon: HiClock,
            title: 'Working Hours',
            details: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Saturday - Sunday: Closed'],
            action: '#',
            color: 'from-violet-500 to-violet-700'
        },
    ];

    const socialLinks = [
        { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
        { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
        { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
        { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
        { icon: FaWhatsapp, href: 'https://wa.me/17135550123', label: 'WhatsApp', color: 'hover:bg-green-500' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-transition"
        >
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-navy-800 overflow-hidden">
                <div className="absolute inset-0">
                    <img src={heroImage} alt="Contact" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/90" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-6">
                            Contact Us
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Let&apos;s <span className="text-primary-400">Connect</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Have a project in mind? We&apos;d love to hear from you. Reach out to us
                            and let&apos;s start building something amazing together.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={index}
                                href={info.action}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <info.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-navy-800 mb-2">{info.title}</h3>
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-gray-600 text-sm">{detail}</p>
                                ))}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                                Get In Touch
                            </span>
                            <h2 className="section-title text-navy-800 mb-6">
                                Send Us a <span className="gradient-text">Message</span>
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="input-premium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="input-premium"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input-premium"
                                            placeholder="+1 (713) 555-0123"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="input-premium"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="residential">Residential Project</option>
                                            <option value="commercial">Commercial Project</option>
                                            <option value="infrastructure">Infrastructure</option>
                                            <option value="renovation">Renovation</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="input-premium resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="loader w-5 h-5 border-2" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <HiPaperAirplane className="w-5 h-5" />
                                            Send Message
                                        </span>
                                    )}
                                </motion.button>

                                {submitStatus === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-600 font-medium flex items-center gap-2"
                                    >
                                        ✓ Thank you! Your message has been sent successfully.
                                    </motion.p>
                                )}
                            </form>
                        </motion.div>

                        {/* Map & Social */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Map Placeholder */}
                            <div className="rounded-2xl overflow-hidden shadow-xl h-80 bg-gray-200 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443088.84123976464!2d-95.68142015625!3d29.817178899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1704198000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            {/* Social Links */}
                            <div className="bg-gray-50 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-navy-800 mb-4">Follow Us</h3>
                                <p className="text-gray-600 mb-6">
                                    Stay connected with us on social media for updates and inspiration.
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white transition-colors duration-300 ${social.color}`}
                                            aria-label={social.label}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Contact */}
                            <div className="bg-gradient-to-br from-primary-500 to-accent p-8 rounded-2xl text-white">
                                <h3 className="text-xl font-bold mb-4">Need Urgent Help?</h3>
                                <p className="text-white/90 mb-6">
                                    Our team is available to handle your queries during business hours.
                                </p>
                                <a
                                    href="tel:+17135550123"
                                    className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    <HiPhone className="w-5 h-5" />
                                    Call Now: +1 (713) 555-0123
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Contact;
