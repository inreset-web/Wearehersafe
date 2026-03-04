import trainingImageDesktop from 'figma:asset/dd83b9145706e495c1e7158c1ea17f6c6745129a.png';
import trainingImageMobile from 'figma:asset/59e46bc466fd59daa3f475285f4411b8941253a5.png';

export function TrainingIntroSection() {
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
        src={trainingImageMobile} 
        alt="Formación de calidad que te impulsa - Acceso a formaciones gratuitas de defensa personal" 
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
        src={trainingImageDesktop} 
        alt="Formación de calidad que te impulsa - Acceso a formaciones gratuitas de defensa personal" 
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