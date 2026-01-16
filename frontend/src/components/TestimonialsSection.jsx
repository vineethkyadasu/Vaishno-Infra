import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi2';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            role: 'CEO, TechVentures',
            content: 'Vaishno Infra exceeded our expectations in every way. Their attention to detail and commitment to quality made our office complex project a tremendous success. Highly recommended!',
            rating: 5,
            avatar: 'RK',
        },
        {
            id: 2,
            name: 'Priya Sharma',
            role: 'Director, UrbanHomes',
            content: 'The team at Vaishno Infra is exceptional. They delivered our residential project on time and within budget. Their innovative approach and professional execution is unmatched.',
            rating: 5,
            avatar: 'PS',
        },
        {
            id: 3,
            name: 'Amit Patel',
            role: 'Manager, CityMall',
            content: 'Working with Vaishno Infra was a pleasure from start to finish. Their expertise in commercial construction and dedication to safety standards is truly impressive.',
            rating: 5,
            avatar: 'AP',
        },
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="section-padding bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-100/50 rounded-full blur-3xl" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wider mb-4">
                        Testimonials
                    </span>
                    <h2 className="section-title text-navy-800 mb-6">
                        What Our <span className="gradient-text">Clients Say</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what our valued clients
                        have to say about their experience working with us.
                    </p>
                </motion.div>

                {/* Testimonial Slider */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-8 right-8 opacity-10">
                                    <FaQuoteLeft className="w-20 h-20 text-primary-500" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <HiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                                        &quot;{testimonials[currentIndex].content}&quot;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {testimonials[currentIndex].avatar}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-navy-800">
                                                {testimonials[currentIndex].name}
                                            </h4>
                                            <p className="text-gray-500">
                                                {testimonials[currentIndex].role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevTestimonial}
                                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy-800 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                            >
                                <HiChevronLeft className="w-6 h-6" />
                            </motion.button>

                            {/* Dots */}
                            <div className="flex items-center gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-primary-500 w-8'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextTestimonial}
                                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy-800 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                            >
                                <HiChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
