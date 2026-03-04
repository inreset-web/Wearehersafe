import { useState, useEffect } from "react";
import { motion } from "motion/react";
import herSafeBlue from "figma:asset/22c729ee4b8ba6a5c1d8769ee53a00771fab679e.png";
import herSafeOrange from "figma:asset/68293dac6221e4aa70bc4a95f2b7378fe10a16ed.png";

interface HeaderProps {
  currentPage: 'home' | 'instructors';
  setCurrentPage: (page: 'home' | 'instructors') => void;
}

export function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (page: 'home' | 'instructors') => {
    // Scroll inmediato al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Cambiar página (esto activará handlePageChange en App.tsx)
    setCurrentPage(page);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 w-full z-50 h-[40px] lg:h-[60px]"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(3, 101, 255, 0.28) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Contenedor único con todo */}
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 lg:px-6">
        
        {/* Logo HerSafe a la izquierda */}
        <motion.div
          className="flex items-center h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleNavigation('home')}
          >
            {/* Logo azul por defecto */}
            <motion.img
              src={herSafeBlue}
              alt="HerSafe"
              className="h-7 lg:h-12 w-auto header-logo"
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Logo naranja en hover */}
            <motion.img
              src={herSafeOrange}
              alt="HerSafe"
              className="absolute top-0 left-0 h-7 lg:h-12 w-auto header-logo"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Navigation Desktop - a la derecha */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { key: 'home', label: 'INICIO' },
            { key: 'instructors', label: 'PROFESIONALES' }
          ].map((item, index) => {
            const isActive = currentPage === item.key;
            return (
              <motion.button
                key={item.key}
                onClick={() => handleNavigation(item.key as 'home' | 'instructors')}
                className="relative px-4 py-2 subtitle-font tracking-wider text-white"
                style={{
                  fontSize: '17px',
                  background: 'transparent',
                  border: 'none'
                }}
                whileHover={{ 
                  y: -2,
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {item.label}
                {/* Subrayado activo */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                      background: '#0365ff',
                      boxShadow: '0 0 8px rgba(3, 101, 255, 0.8), 0 0 16px rgba(3, 101, 255, 0.4)'
                    }}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Navigation Mobile - a la derecha */}
        <nav className="md:hidden flex items-center gap-4">
          {[
            { key: 'home', label: 'INICIO' },
            { key: 'instructors', label: 'PROFESIONALES' }
          ].map((item, index) => {
            const isActive = currentPage === item.key;
            return (
              <motion.button
                key={item.key}
                onClick={() => handleNavigation(item.key as 'home' | 'instructors')}
                className="relative px-3 py-1 subtitle-font tracking-wider text-white"
                style={{
                  fontSize: '11px',
                  background: 'transparent',
                  border: 'none'
                }}
                whileHover={{ 
                  y: -2,
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {item.label}
                {/* Subrayado activo */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                      background: '#0365ff',
                      boxShadow: '0 0 8px rgba(3, 101, 255, 0.8), 0 0 16px rgba(3, 101, 255, 0.4)'
                    }}
                    layoutId="activeTabMobile"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Glass effect overlay with enhanced texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="h-full w-full opacity-10" 
          style={{
            background: `
              radial-gradient(circle at 30% 50%, rgba(255, 158, 3, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
            `
          }} 
        />
      </motion.div>
    </motion.header>
  );
}