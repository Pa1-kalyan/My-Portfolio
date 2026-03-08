"use client"

import { motion } from "framer-motion"

const skills = [
    { name: 'Java', icon: '☕', bg: 'bg-red-500/10', color: 'text-red-400' },
    { name: 'Spring Boot', icon: '🌱', bg: 'bg-green-500/10', color: 'text-green-400' },
    { name: 'Microservices', icon: '🔗', bg: 'bg-blue-400/10', color: 'text-blue-300' },
    { name: 'AWS', icon: '☁️', bg: 'bg-yellow-500/10', color: 'text-yellow-400' },
    { name: 'Apache Kafka', icon: '📨', bg: 'bg-gray-500/10', color: 'text-gray-300' },
    { name: 'Redis', icon: '🔴', bg: 'bg-red-600/10', color: 'text-red-500' },
    { name: 'Hibernate', icon: '🐻', bg: 'bg-amber-600/10', color: 'text-amber-500' },
    { name: 'MySQL', icon: '🐬', bg: 'bg-blue-500/10', color: 'text-blue-400' },
    { name: 'Maven', icon: 'V', bg: 'bg-orange-500/10', color: 'text-orange-400' },
    { name: 'Git', icon: '🔀', bg: 'bg-orange-600/10', color: 'text-orange-500' },
    { name: 'Jenkins', icon: '🔧', bg: 'bg-red-400/10', color: 'text-red-300' },
    { name: 'Postman', icon: '📮', bg: 'bg-orange-500/10', color: 'text-orange-400' },
    { name: 'JUnit5', icon: '✅', bg: 'bg-green-500/10', color: 'text-green-400' },
    { name: 'Mockito', icon: '🎭', bg: 'bg-teal-500/10', color: 'text-teal-400' },
    { name: 'Log4j', icon: '📝', bg: 'bg-purple-500/10', color: 'text-purple-400' },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 15,
        },
    },
}

export function SkillsGrid() {
    return (
        <div className="h-full flex flex-col">
            <motion.h3
                className="text-xl font-bold mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Technical Skills
            </motion.h3>
            <motion.div
                className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 flex-grow content-start"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{
                            y: -5,
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 400, damping: 10 },
                        }}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg ${skill.bg} border border-zinc-700/50 hover:border-blue-500/50 transition-colors duration-300 cursor-default`}
                    >
                        <span className={`text-2xl ${skill.color}`}>{skill.icon}</span>
                        <span className={`text-xs font-medium text-center ${skill.color}`}>{skill.name}</span>
                    </motion.div>
                ))}
                <motion.div
                    className="col-span-full flex items-center justify-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-700/30"
                    variants={itemVariants}
                >
                    <p className="text-sm text-zinc-500 text-center italic">
                        Looking for another skill? If a skill helps me grow, it earns a place here.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}
