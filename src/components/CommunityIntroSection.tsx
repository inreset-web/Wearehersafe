import communityImageDesktop from 'figma:asset/d6376474b34a96650d19fbc9a38d74247872f5f2.png';
import communityImageMobile from 'figma:asset/397d4f7c582371795f5c5a3545c952e3f9b6d7c1.png';
import { useState } from 'react';

export function CommunityIntroSection() {
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
        src={communityImageMobile} 
        alt="Navega en la primera red de mujeres" 
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
        src={communityImageDesktop} 
        alt="Navega en la primera red de mujeres" 
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