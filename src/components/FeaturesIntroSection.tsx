import featuresImageDesktop from 'figma:asset/c91744c9c416596fb2186b6d4442eb625dff3751.png';
import featuresImageMobile from 'figma:asset/325f37c69df179dd49fea810693548eca7192e41.png';

export function FeaturesIntroSection() {
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
        src={featuresImageMobile} 
        alt="¿Qué puedes hacer en HerSafe? - Compartir tu historia, conectar con mujeres, sentirte segura" 
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
        src={featuresImageDesktop} 
        alt="¿Qué puedes hacer en HerSafe? - Compartir tu historia, conectar con mujeres, sentirte segura" 
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