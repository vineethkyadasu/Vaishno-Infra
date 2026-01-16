import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaProjectDiagram, FaUsers, FaAward, FaHardHat } from 'react-icons/fa';

const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        {
            icon: FaProjectDiagram,
            end: 500,
            suffix: '+',
            label: 'Projects Completed',
            description: 'Successfully delivered projects'
        },
        {
            icon: FaUsers,
            end: 200,
            suffix: '+',
            label: 'Happy Clients',
            description: 'Satisfied customers'
        },
        {
            icon: FaAward,
            end: 25,
            suffix: '+',
            label: 'Awards Won',
            description: 'Industry recognitions'
        },
        {
            icon: FaHardHat,
            end: 50,
            suffix: '+',
            label: 'Expert Team',
            description: 'Skilled professionals'
        },
    ];

    return (
        <section ref={ref} className="py-20 bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10"
                            >
                                <stat.icon className="w-8 h-8 text-primary-400" />
                            </motion.div>

                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                <CountUp
                                    end={stat.end}
                                    suffix={stat.suffix}
                                    isInView={isInView}
                                    delay={index * 100}
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-1">
                                {stat.label}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import PropTypes from 'prop-types';

// Animated Counter Component
const CountUp = ({ end, suffix = '', isInView, delay = 0 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const timeout = setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const increment = end / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, end, delay]);

    return (
        <span>
            {count}{suffix}
        </span>
    );
};

CountUp.propTypes = {
    end: PropTypes.number.isRequired,
    suffix: PropTypes.string,
    isInView: PropTypes.bool.isRequired,
    delay: PropTypes.number
};

export default StatsSection;
