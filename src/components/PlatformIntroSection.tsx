import platformImageDesktop from 'figma:asset/846e2a0b98c5f9339d89bf238a102613392dc55a.png';
import platformImageMobile from 'figma:asset/db60f5f6aeab2d90439831a42af0b02a88dab68c.png';

export function PlatformIntroSection() {
  return (
    <section 
      className="w-full bg-black overflow-hidden"
      style={{
        margin: 0,
        padding: 0,
        position: 'relative'
      }}
    >
      {/* Imagen para mobile (oculta en desktop) */}
      <img 
        src={platformImageMobile} 
        alt="Todo lo que necesitas en una misma plataforma" 
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
        src={platformImageDesktop} 
        alt="Todo lo que necesitas en una misma plataforma" 
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