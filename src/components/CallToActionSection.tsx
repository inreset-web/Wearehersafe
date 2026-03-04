import ctaImageDesktop from 'figma:asset/af00deac227adc05b1c24aec63f12c6683399773.png';
import ctaImageMobile from 'figma:asset/af07138e22e56eec7e197e4c0243dfc8f962ee09.png';
import { useState } from 'react';

export function CallToActionSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = Math.abs(currentY - startY);
    if (diff > 10) {
      setIsDragging(true);
    }
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    window.open('https://app.wearehersafe.com/auth', '_blank');
  };

  return (
    <section 
      className="w-full bg-black overflow-hidden relative cursor-pointer group"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        margin: 0,
        padding: 0,
        position: 'relative'
      }}
    >
      {/* Overlay clickeable (mitad inferior) */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-transparent z-10 pointer-events-none"
        style={{
          width: '100%',
          height: '50%'
        }}
      />

      {/* Imagen para mobile (oculta en desktop) */}
      <img 
        src={ctaImageMobile} 
        alt="¿Lista para dar el siguiente paso? - Forma parte de la primera red donde mujeres reales se apoyan cada día - Descubre HerSafe" 
        className="w-full lg:hidden"
        style={{
          width: '100%',
          height: 'auto',
          margin: 0,
          padding: 0,
          maxWidth: '100%'
        }}
      />
      
      {/* Imagen para desktop (oculta en mobile) */}
      <img 
        src={ctaImageDesktop} 
        alt="¿Lista para dar el siguiente paso? - Forma parte de la primera red donde mujeres reales se apoyan cada día - Descubre HerSafe" 
        className="w-full hidden lg:block"
        style={{
          width: '100%',
          height: 'auto',
          margin: 0,
          padding: 0,
          maxWidth: '100%'
        }}
      />
    </section>
  );
}