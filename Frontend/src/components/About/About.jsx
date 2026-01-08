import React, { useState } from "react";
import { motion } from 'framer-motion';
import { features, stats, teamMembers } from "../../assets/dummydata";
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

const About = () => {
    const [hoveredStat, setHoverStat] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#1a120b] text-amber-50 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 mix-blend-soft-light " />

            {/* HERO SECTION */}
            <motion.section 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }}
                className='py-16 px-4 text-center relative'
            >
                <div className="max-w-4xl mx-auto">
                    <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-600">
                        Culinary Express
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        Crafting unforgettable dining experience delivered to your doorstep.
                    </motion.p>
                </div>
            </motion.section>

            {/* FEATURES SECTION (The 3 Photos) */}
            <section className="py-12 px-4 md:px-8 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((f, i) => (
                        <motion.div 
                            key={f.id || i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{ delay: i * 0.2 }} 
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-br from-amber-600/30 to-amber-500/30 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="relative bg-[#3c2a21]/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-amber-600/30 hover:border-amber-500 transition-all duration-300 h-full ">
                                <div className="relative h-64 overflow-hidden">
                                    <motion.img 
                                        src={f.img} 
                                        alt={f.title} 
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }} 
                                        transition={{ duration: 0.4 }} 
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-amber-400">{f.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* STATS SECTION (10M+, 24x7, etc.) */}
            <section className="py-12 px-4 md:px-8 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div 
                                key={i}
                                onMouseEnter={() => setHoverStat(i)}
                                onMouseLeave={() => setHoverStat(null)}
                                className="relative h-48 bg-[#3c2a21]/40 backdrop-blur-lg rounded-xl border-2 border-amber-600/30 p-6 overflow-hidden transition-all duration-300"
                            >
                                <motion.div className="absolute inset-0 rounded-xl"
                                    animate={{
                                        background:[
                                            'linear-gradient(45deg,#3c2a21 0%, #1a120b 50%,  #3c2a21  100%)',
                                            'linear-gradient(45deg,#3c2a21 0%, #1a120b 80%,  #3c2a21  100%)',
                                            'linear-gradient(45deg,#3c2a21 0%, #1a120b 50%,  #3c2a21  100%)'
                                        ]
                                    }} transition={{duration:6, repeat:Infinity}}/>
                                
                                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                                    <motion.div className="mb-2 p-2 rounded-full bg-amber-900/30 border border-amber-700/30"
                                        whileHover={{scale:1.1, rotate:10}}>
                                        {Icon && <Icon className="w-6 h-6 text-amber-500/90" />}
                                    </motion.div>
                                    <div className="text-3xl font-bold mb-1 bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 text-transparent">
                                        {s.number}
                                    </div>
                                    <motion.div 
                                        className="text-xs uppercase tracking-widest font-medium text-amber-100/80"
                                        animate={{
                                            letterSpacing: hoveredStat === i ? '0.15em' : '0.1em',
                                        }}
                                    >
                                        {s.label}
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="py-16 px-4 md:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.h2 initial={{opacity:0, y:20}}
                        whileInView={{opacity:1, y:0}}
                        className="text-4xl font-serif sm:text-5xl md:text-6xl font-bold text-center mb-12 text-amber-100">
                        Meet Our <span className="text-amber-500">Culinary Artists</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                        {teamMembers.map((m, i) => (
                            <motion.div key={i} initial={{opacity:0, y:50}}
                                whileInView={{opacity:1, y:0}} 
                                viewport={{once:true, margin: "0px 0px -100px 0px"}} 
                                transition={{delay: i * 0.1}} className="relative group" >
                                <div className="relative h-full bg-[#3c2a21]/90 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-amber-600/30 hover:border-amber-500 transition-all duration-500 shadow hover:shadow-2xl">
                                    <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden">
                                        <motion.img src={m.img} alt={m.name} className="w-full h-full object-cover"
                                            whileHover={{scale:1.1}} transition={{duration:0.5}}/>
                                    </div>
                                    <div className="p-8 text-center flex flex-col h-full">
                                        <div className="mb-4">
                                            <h3 className="text-3xl font-bold mb-2 text-amber-100">{m.name}</h3>
                                            <p className="text-amber-500 text-lg font-medium">{m.role}</p>
                                        </div>
                                        <p className="text-amber-100/80 text-lg flex-grow">{m.bio}</p>
                                        <div className="flex justify-center gap-4 pt-6 text-amber-500">
                                            <FaXTwitter className="hover:text-amber-200 transition-colors cursor-pointer" />
                                            <FaInstagram className="hover:text-amber-200 transition-colors cursor-pointer" />
                                            <FaFacebookF className="hover:text-amber-200 transition-colors cursor-pointer" />
                                            <FaLinkedinIn className="hover:text-amber-200 transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;