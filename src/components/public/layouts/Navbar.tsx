"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useLangStore } from '@/stores/language';

type NavLink = {
  name: string;
  path: string;
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const { selectedLanguage } = useLangStore();

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Wisata', path: '/wisata' },
    { name: 'Kuliner', path: '/kuliner' },
    { name: 'Tiket Wisata', path: '/tiket' },
    { name: 'Event', path: '/event' },
    { name: 'Influencer', path: '/influencer-hub' },
    { name: 'Komunitas', path: '/komunitas' },
    { name: 'Kamus', path: '/kamus-sunda' },
    { name: 'Berita', path: '/berita' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowNavMenu(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background putih, shadow tipis saat scroll
  const headerVariants = {
    top: { 
      backgroundColor: "rgba(255, 255, 255, 1)", // putih
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 1)", // tetap putih saat scroll
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",   // shadow tipis
    }
  };

  const navMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="sticky top-0 z-50"
      variants={headerVariants}
      animate={isScrolled ? "scrolled" : "top"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-20 transition-all duration-300">
        <div className="flex items-center flex-1 min-w-0">
          <motion.div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Assets/Logo/Logo-2.png"
                alt="Nempo Garut Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </motion.div>

          <div className="flex-1 ml-4 relative min-w-0 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              {showNavMenu ? (
                <motion.nav
                  key="navMenu"
                  className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-2"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={navMenuVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                        pathname === link.path || 
                        (link.path !== '/' && pathname.startsWith(link.path + '/'))
                          ? 'text-gray-900' // link aktif gelap
                          : 'text-gray-700 hover:text-gray-900' // default gelap
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.nav>
              ) : (
                <motion.div
                  key="tagline"
                  className="w-full truncate"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={taglineVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base whitespace-nowrap">
                    {(({
                      EN: "Let's See,",
                      ID: "Mari Kita Lihat,",
                      SU: "Hayu Nempo,"
                    })[selectedLanguage] || "Let's See,")}{' '}
                    <span className="text-gray-900 font-bold">
                      {(({
                        EN: "Let's Love!",
                        ID: "Mari Cintai!",
                        SU: "Hayo Nyaah!!"
                      })[selectedLanguage] || "Let's Love!")}
                    </span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2 pl-4">
          <LanguageSwitcher className="text-gray-900" />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
