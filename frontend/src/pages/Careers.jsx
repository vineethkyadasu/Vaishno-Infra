import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiUserGroup, HiAcademicCap, HiHeart, HiClock, HiCurrencyDollar, HiMapPin, HiArrowRight } from 'react-icons/hi2';

const Careers = () => {
    const benefits = [
        {
            icon: HiCurrencyDollar,
            title: 'Competitive Salary',
            description: 'Industry-leading compensation packages with performance bonuses'
        },
        {
            icon: HiHeart,
            title: 'Health Benefits',
            description: 'Comprehensive medical, dental, and vision coverage for you and your family'
        },
        {
            icon: HiAcademicCap,
            title: 'Growth Opportunities',
            description: 'Continuous learning programs and career advancement paths'
        },
        {
            icon: HiClock,
            title: 'Work-Life Balance',
            description: 'Flexible schedules and generous paid time off'
        },
        {
            icon: HiUserGroup,
            title: 'Team Culture',
            description: 'Collaborative environment with supportive leadership'
        },
        {
            icon: HiBriefcase,
            title: '401(k) Plan',
            description: 'Retirement savings plan with company matching'
        }
    ];

    const [openPositions, setOpenPositions] = React.useState([]);

    React.useEffect(() => {
        const fetchCareers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                if (!apiUrl) return;

                const response = await fetch(`${apiUrl}/careers`);
                const data = await response.json();

                // Map API data to component structure if needed, or use directly
                // Assuming API returns array of career objects
                setOpenPositions(data);
            } catch (error) {
                console.error('Failed to fetch careers:', error);
            }
        };

        fetchCareers();
    }, []);


    const [selectedJob, setSelectedJob] = React.useState(null);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        resume: null
    });
    const [submitting, setSubmitting] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            data.append('jobTitle', selectedJob.title);
            data.append('jobId', selectedJob.id || '');
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('resume', formData.resume);

            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/applications`, {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                setSuccessMsg('Application submitted successfully!');
                setTimeout(() => {
                    setSelectedJob(null);
                    setSuccessMsg('');
                    setFormData({ name: '', email: '', phone: '', resume: null });
                }, 2000);
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error submitting application.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Application Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
                    >
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <h3 className="text-2xl font-bold text-navy-800 mb-6">
                            Apply for {selectedJob.title}
                        </h3>

                        {successMsg ? (
                            <div className="text-center py-8 text-green-600 font-medium">
                                {successMsg}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF)</label>
                                    <input
                                        type="file"
                                        name="resume"
                                        required
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600'
                                        }`}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="container-custom relative z-10 text-center py-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-6"
                    >
                        Join Our Team
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Build Your <span className="text-gradient">Career</span> With Us
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Join a team of passionate professionals dedicated to building excellence.
                        We offer exciting opportunities for growth and innovation.
                    </motion.p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Why Work With Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2 mb-4">
                            Benefits & Perks
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We believe in taking care of our team. Here&apos;s what you can expect when you join Vaishno Infra.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent rounded-xl flex items-center justify-center mb-4">
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-800 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Opportunities</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2 mb-4">
                            Open Positions
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our current openings and find the perfect role for your skills and aspirations.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-navy-800 group-hover:text-primary-500 transition-colors">
                                            {position.title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">{position.description}</p>
                                        <div className="flex flex-wrap gap-3 mt-3">
                                            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                                <HiBriefcase className="w-4 h-4" />
                                                {position.department}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                                <HiMapPin className="w-4 h-4" />
                                                {position.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm text-primary-500 font-medium">
                                                {position.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => setSelectedJob(position)}
                                            className="inline-flex items-center gap-2 btn-primary"
                                        >
                                            Apply Now
                                            <HiArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Don&apos;t See the Right Fit?
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll keep you in mind for future opportunities.
                        </p>
                        <a
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Contact Us
                            <HiArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );

};

export default Careers;
