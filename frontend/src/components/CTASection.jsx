import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiPhone } from 'react-icons/hi2';

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-gray-50">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Floating Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"
            />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 bg-primary-500/10 rounded-full text-primary-600 text-sm font-medium mb-6"
                        >
                            Ready to Build?
                        </motion.span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Let&apos;s Build Something
                            <br />
                            <span className="text-primary-600">Extraordinary Together</span>
                        </h2>

                        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                            Whether you&apos;re planning a residential project or a commercial development,
                            our team is ready to bring your vision to life with expertise and dedication.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl hover:bg-primary-700 transition-all duration-300 group"
                                >
                                    Get Free Consultation
                                    <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>

                            <a href="tel:+17135550123">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary-600 text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all duration-300 group"
                                >
                                    <HiPhone className="mr-2" />
                                    Call Us Now
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
