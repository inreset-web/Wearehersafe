// Banner navideño desktop
import bannerNavidadDesktop from 'figma:asset/8068e070c312013874e7bef270a11699c88959c2.png';
// Banner navideño móvil
import bannerNavidadMovil from 'figma:asset/1a7565b94d0130d123f50d06712af64488ca8dcb.png';

export function BannerNavidad() {
  const handleScrollToForm = () => {
    const formulario = document.getElementById('formulario-hersafe');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      {/* Banner móvil - Solo se muestra en móvil */}
      <section 
        className="relative w-full overflow-hidden block md:hidden"
        style={{ 
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          lineHeight: 0
        }}
      >
        <img
          src={bannerNavidadMovil}
          alt="Banner navideño HerSafe - Lanzamiento 25 de Diciembre"
          className="w-full h-auto block"
          style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block',
            maxWidth: '100%',
            verticalAlign: 'top',
            margin: 0,
            padding: 0
          }}
          loading="eager"
        />
        {/* Botón transparente sobre toda la imagen - Móvil */}
        <button
          onClick={handleScrollToForm}
          className="absolute cursor-pointer hover:opacity-95 transition-opacity"
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            padding: 0,
            zIndex: 10
          }}
          aria-label="Únete a la lista de espera"
        />
      </section>

      {/* Banner desktop/tablet - Solo se muestra en tablet y desktop */}
      <section 
        className="relative w-full overflow-hidden hidden md:block"
        style={{ 
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          lineHeight: 0
        }}
      >
        <img
          src={bannerNavidadDesktop}
          alt="Banner navideño HerSafe - Lanzamiento 25 de Diciembre"
          className="w-full h-auto block"
          style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block',
            maxWidth: '100%',
            verticalAlign: 'top',
            margin: 0,
            padding: 0
          }}
          loading="eager"
        />
        {/* Botón transparente sobre toda la imagen - Desktop */}
        <button
          onClick={handleScrollToForm}
          className="absolute cursor-pointer hover:opacity-95 transition-opacity"
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            padding: 0,
            zIndex: 10
          }}
          aria-label="Únete a la lista de espera"
        />
      </section>
    </>
  );
}