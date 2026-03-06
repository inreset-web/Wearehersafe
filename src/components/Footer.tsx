import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <motion.footer 
      className="footer-section relative overflow-hidden w-full mt-0 lg:mt-24"
      style={{ 
        backgroundColor: 'transparent',
        minHeight: 'auto',
        marginBottom: '0',
        paddingBottom: '0',
        paddingTop: '0'
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Dynamic background - Removido para mantener fondo completamente negro */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-6 lg:pt-8 pb-4 lg:pb-6">
        
        {/* Main footer content */}
        <motion.div
          className="text-center space-y-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <motion.h1 
                className="text-2xl lg:text-3xl text-white text-center mb-2" 
                style={{ 
                  fontFamily: 'Balhattan, sans-serif', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  fontWeight: 700 
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false }}
                whileHover={{ color: "#024bb5" }}
              >
                HERSAFE
              </motion.h1>
              <motion.div
                className="w-20 h-1.5 mx-auto rounded-full"
                style={{
                  background: '#0365ff',
                  boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)'
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              />
              <motion.p
                className="text-sm lg:text-base text-gray-400 mt-4 max-w-4xl mx-auto whitespace-nowrap"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 400 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                Comunidad, formación y tecnología al servicio del bienestar femenino
              </motion.p>
            </motion.div>
          </Link>



          {/* Navigation links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 lg:gap-8 pt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { name: 'Términos', href: '/legal/terminos' },
              { name: 'Privacidad', href: '/legal/privacidad' }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link to={item.href}>
                  <motion.div
                    className="relative text-base text-gray-400 hover:text-white transition-colors duration-300 group"
                    style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name}
                    
                    {/* Hover effect */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ backgroundColor: '#024bb5' }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="pt-4 pb-0 border-t border-gray-800/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm mb-0" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 }}>
              &copy; 2025 <span className="text-gray-500">HerSafe</span>
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* Floating elements - Glass effect, más sutiles y delicadas */}
      <motion.div
        className="hidden lg:block absolute top-1/4 left-8 w-3 h-0.5 rounded-full"
        style={{ 
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          boxShadow: '0 0 4px rgba(255, 255, 255, 0.1)'
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="hidden lg:block absolute top-3/4 left-1/4 w-4 h-0.5 rounded-full"
        style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          boxShadow: '0 0 4px rgba(255, 255, 255, 0.1)'
        }}
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

    </motion.footer>
  );
}