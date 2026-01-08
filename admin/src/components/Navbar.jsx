import React, { useState } from 'react';
// FIX: Using * as AdminData to catch all exports from your dummyadmin file
import * as AdminData from "../assets/dummyadmin";
import { GiChefToque } from "react-icons/gi"; 
import { HiMenuAlt3, HiX } from "react-icons/hi"; 
import { NavLink } from "react-router-dom";

const Navbar = () => {
    // FIX: Using square brackets [] for useState
    const [menuOpen, setMenuOpen] = useState(false);

    // Shorten the variable names for easier use in JSX
    const styles = AdminData.styles;
    const navLinks = AdminData.navLinks;

    // Safety check: If styles aren't loaded yet, don't crash the app
    if (!styles) {
        return <div className="p-4 text-white">Loading styles...</div>;
    }

    return (
        <nav className={styles.navWrapper}>
            <div className={styles.navContainer}>
                <div className={styles.logoSection}>
                    <GiChefToque className={styles.logoIcon} />
                    <span className={styles.logoText}>Admin Panel</span>
                </div>

                <button onClick={() => setMenuOpen(!menuOpen)} className={styles.menuButton}>
                    {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                </button>

                <div className={styles.desktopMenu}>
                    {navLinks && navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.href} 
                            className={({ isActive }) => 
                                `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`
                            }
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {menuOpen && (
                <div className={`${styles.mobileMenu} px-4 pb-6`}>
                    {navLinks && navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.href} 
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => 
                                `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive} w-full justify-start`
                            }
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;