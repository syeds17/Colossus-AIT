import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PillNav, { PillNavItem } from './PillNav';

interface NavigationProps {
  onThemeToggle: () => void;
  isDark: boolean;
}

const Navigation = ({ onThemeToggle, isDark }: NavigationProps) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio('/audio/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    }
  };

const navItems: PillNavItem[] = [
  { label: 'Home', href: '/#hero' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Events', href: '/events' },
  { label: 'Updates', href: '/#updates' },
  { label: 'Contact', href: '/#contact' }
];



  return (
    
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center transition-all duration-500 ${
  scrolled ? 'bg-background/80 backdrop-blur-md' : ''
}`}

    
    >
<div className="w-full flex items-center justify-between">
        <motion.a
            href="#hero"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/logos/Colossus_logo_png.png"
              alt="Colossus Logo"
              className="h-8 w-auto object-contain"
            />
          </motion.a>



         {/* Pill Navigation */}
      <PillNav
        logo="/logos/Colossus_logo_png.png"
        logoAlt="Colossus Logo"
        items={navItems}
        activeHref={location.pathname}
        baseColor="transparent"             // keep base fixed
        pillColor="transparent"             // keep pill background fixed
        pillTextColor={isDark ? '#ffffff' : '#000000'}
        hoveredPillTextColor={isDark ? '#ffffff' : '#000000'}
        initialLoadAnimation={false}
      />
 




      {/* Right Controls */}
      <div className="flex items-center gap-6">

        {/* Theme Toggle */}
        <motion.button
          onClick={onThemeToggle}
          className="relative p-2 transition-all duration-300 hover:opacity-60"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="dark"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={18} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="light"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={18} strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
    </motion.nav>
  );
};

export default Navigation;
