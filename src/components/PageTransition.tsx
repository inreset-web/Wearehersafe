import { motion, AnimatePresence } from "motion/react";
import { ReactNode, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
  className?: string;
}

// Variantes de transiciones optimizadas para rendimiento
const pageVariants = {
  // Transición simple y rápida
  slide3D: {
    initial: {
      x: "100%",
      opacity: 0
    },
    animate: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  },
  
  // Transición con fundido simple
  crossFade: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }
};

export function PageTransition({ 
  children, 
  pageKey, 
  className = "",
  transitionType = "slide3D"
}: PageTransitionProps & { 
  transitionType?: keyof typeof pageVariants;
}) {
  const variants = pageVariants[transitionType];
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`${className}`}
        style={{ 
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Componente optimizado para el overlay de carga - SIN PARPADEOS
export function PageLoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          style={{
            backgroundColor: '#000000',
            backdropFilter: 'none', // Eliminar blur para mejor rendimiento
            WebkitBackdropFilter: 'none'
          }}
        >
          {/* Loader más pequeño y eficiente */}
          <div className="w-6 h-6 border-2 border-[#0365ff] border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook optimizado para gestionar transiciones de página - MÓVIL OPTIMIZADO
export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const transitionTo = (callback: () => void, delay = 50) => {
    // Transición más rápida para móvil
    setIsTransitioning(true);
    
    // Usar requestAnimationFrame para mejor rendimiento
    requestAnimationFrame(() => {
      setTimeout(() => {
        callback();
        // Minimizar tiempo de overlay
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      }, delay);
    });
  };
  
  return { isTransitioning, transitionTo };
}