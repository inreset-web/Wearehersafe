import { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';

interface UseScrollAnimationOptions {
  threshold?: number;
  margin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.15, // Reducido para mejor rendimiento
    margin = "-60px", // Reducido para activar antes
    triggerOnce = false
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Optimización: Detectar dispositivos móviles con protección para Safari
  const isMobile = typeof window !== 'undefined' && 
                   typeof window.innerWidth === 'number' && 
                   window.innerWidth <= 768;
  
  const isInView = useInView(ref, { 
    once: false, 
    margin: isMobile ? "-30px" : margin, // Menos margen en móvil
    amount: isMobile ? 0.1 : threshold  // Threshold más bajo en móvil
  });

  // Control animation state optimizado
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Usar requestAnimationFrame para mejor rendimiento
    const updateAnimation = () => {
      if (isInView) {
        if (!triggerOnce || !hasAnimated) {
          setShouldAnimate(true);
          setHasAnimated(true);
        }
      } else {
        if (!triggerOnce) {
          setShouldAnimate(false);
        }
      }
    };

    if (isMobile) {
      // En móvil, reducir el debounce para responsividad
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(updateAnimation);
      } else {
        // Fallback para Safari muy antiguo
        setTimeout(updateAnimation, 16);
      }
    } else {
      updateAnimation();
    }
  }, [isInView, triggerOnce, hasAnimated, isMobile]);

  return {
    ref,
    isInView,
    shouldAnimate,
    hasAnimated
  };
}

// Hook específico para animaciones que se repiten cada vez
export function useRepeatingScrollAnimation(options: UseScrollAnimationOptions = {}) {
  return useScrollAnimation({ ...options, triggerOnce: false });
}

// Hook para animaciones que solo ocurren una vez (comportamiento actual)
export function useOnceScrollAnimation(options: UseScrollAnimationOptions = {}) {
  return useScrollAnimation({ ...options, triggerOnce: true });
}