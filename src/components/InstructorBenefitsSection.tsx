import { motion } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRepeatingScrollAnimation } from "./useScrollAnimation";

// Imagen para la sección "Un posicionamiento que te distingue"
import posicionamientoImage from 'figma:asset/c11c67341871176cb3b09993a14a31b9764b93b0.png';
// Imagen para la sección "Acceso directo a tu clienta ideal"
import accesoClientaImage from 'figma:asset/42a1adcdd6d7d737ec128b9e2990395648b4d391.png';
// Imagen para la sección "Soporte completo para que te centres en lo importante"
import soporteCompletoImage from 'figma:asset/5b834873f33e26aa4829fcbd89c78107cc8ce262.png';

export function InstructorBenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { ref: imagesAnimationRef, shouldAnimate: shouldAnimateImages } = useRepeatingScrollAnimation({
    threshold: 0.2,
    margin: "-100px"
  });

  const instructorBenefits = [
    {
      title: "Un posicionamiento que te distingue.",
      description: "En HerSafe entras como profesional pionero en un espacio nuevo. Obtienes visibilidad y autoridad desde el inicio, dentro de una red que valora tu trabajo",
      image: posicionamientoImage
    },
    {
      title: "Acceso directo a tu clienta ideal",
      description: "Conecta con usuarias interesadas en su bienestar, salud y seguridad. Un entorno donde tu trabajo destaca de forma natural y se valora desde el primer momento.",
      image: accesoClientaImage
    },
    {
      title: "Soporte completo para que te centres en lo importante.",
      description: "HerSafe gestiona cobros y devoluciones, garantizando una estructura segura y eficiente que permite a los profesionales enfocarse en su contenido y en su comunidad.",
      image: soporteCompletoImage
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full instructor-benefits-section">
      {/* Fluid Creative Layout - All sections transparent */}
      <div className="space-y-0">
        
        {/* Primer beneficio - Full section transparent - IMAGEN Y TEXTO EN PARALELO */}
        <section
          className="relative w-full py-8 lg:py-12 px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
            
            {/* Título - PRIMERO EN MÓVIL */}
            <div className="w-full lg:hidden text-center px-2">
              <motion.h3 
                className="text-xl sm:text-2xl subtitle-font text-white leading-tight uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                ENCUENTRA USUARIAS LISTAS PARA AVANZAR
              </motion.h3>
            </div>

            {/* Imagen a la izquierda en desktop, segundo en móvil */}
            <div className="w-full lg:flex-1 lg:flex-[1.5] lg:max-w-none relative lg:-ml-8 xl:-ml-12">
              <div className="h-[50vh] lg:h-[88vh] xl:h-[92vh] relative overflow-hidden rounded-xl lg:rounded-none">
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src={instructorBenefits[0].image}
                    alt="Entra y descubre cómo potenciar tu impacto"
                    className="w-full h-full object-cover lg:object-contain object-center lg:object-center"
                  />
                </div>
              </div>
            </div>

            {/* Contenido a la derecha en desktop, tercero y cuarto en móvil */}
            <div className="w-full lg:flex-1 text-center lg:text-left px-2 lg:px-4 flex flex-col justify-center gap-6">
              {/* Título - SOLO EN DESKTOP */}
              <motion.h3 
                className="hidden lg:block text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl subtitle-font text-white leading-tight uppercase"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                ENTRA Y DESCUBRE CÓMO POTENCIAR TU IMPACTO
              </motion.h3>
              
              {/* Descripción */}
              <motion.p 
                className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray-200 text-font leading-relaxed lg:leading-relaxed pt-6 lg:pt-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Entra y descubre cómo potenciar tu impacto
              </motion.p>

              {/* Botón */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
              >
                {/* Versión MÓVIL */}
                <motion.a
                  href="https://calendly.com/colaboraciones-wearehersafe/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block lg:hidden bg-white text-[#0365ff] border-2 border-[#0365ff] subtitle-font text-sm tracking-wide transition-all duration-300 shadow-xl rounded-lg px-8 py-3 text-center leading-snug whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  AGENDAR LLAMADA
                </motion.a>
                
                {/* Versión DESKTOP */}
                <motion.a
                  href="https://calendly.com/colaboraciones-wearehersafe/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:inline-block bg-transparent text-[#0365ff] border-2 border-[#0365ff] subtitle-font text-xl tracking-wide transition-all duration-300 hover:bg-white hover:text-[#0365ff] rounded-lg px-12 py-4 text-center leading-snug whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  AGENDAR LLAMADA
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Segundo beneficio - Full section transparent - INVERTIDO EN DESKTOP */}
        <section
          className="relative w-full py-8 lg:py-12 px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-4 lg:gap-16">
            
            {/* Título - PRIMERO EN MÓVIL */}
            <div className="w-full lg:hidden text-center px-2">
              {/* Línea decorativa azul neón centrada - MÓVIL */}
              <motion.div
                className="h-1.5 w-32 rounded-full mx-auto mb-6"
                style={{
                  background: '#0365ff',
                  boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)',
                  transformOrigin: "center"
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false }}
              />
              
              <motion.h3 
                className="text-xl sm:text-2xl subtitle-font text-white leading-tight uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                {instructorBenefits[1].title}
              </motion.h3>
            </div>

            {/* Imagen - SEGUNDO EN MÓVIL, derecha en desktop */}
            <div className="w-full lg:flex-1 lg:flex-[1.2] lg:max-w-none relative lg:-mr-8 xl:-mr-12">
              <div className="h-[50vh] lg:h-[82vh] xl:h-[87vh] relative overflow-hidden rounded-xl lg:rounded-none">
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src={instructorBenefits[1].image}
                    alt={instructorBenefits[1].title}
                    className="w-full h-full object-contain object-center lg:object-contain lg:object-center"
                  />
                </div>
              </div>
            </div>
            
            {/* Contenido - TERCERO EN MÓVIL, izquierda en desktop */}
            <div className="w-full lg:flex-1 text-center lg:text-right px-2 lg:px-4 flex flex-col justify-center">
              {/* Línea decorativa azul neón - ANTES DEL TÍTULO DESKTOP */}
              <motion.div
                className="hidden lg:block h-1.5 w-40 rounded-full mb-6"
                style={{
                  background: '#0365ff',
                  boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)',
                  transformOrigin: "center",
                  marginLeft: "auto",
                  marginRight: 0
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false }}
              />

              {/* Título - SOLO EN DESKTOP */}
              <motion.h3 
                className="hidden lg:block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl subtitle-font text-white mb-4 lg:mb-6 leading-tight uppercase"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                ACCESO DIRECTO A <br className="hidden lg:block" />TU CLIENTA IDEAL
              </motion.h3>
              
              {/* Descripción */}
              <motion.p 
                className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray-200 text-font leading-relaxed mb-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                {instructorBenefits[1].description}
              </motion.p>

              {/* Línea decorativa - SOLO EN DESKTOP */}
              <motion.div
                className="hidden lg:block h-1.5 w-24 lg:w-32 rounded-full mx-auto lg:ml-auto lg:mr-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 0 6px rgba(255, 255, 255, 0.15)',
                  transformOrigin: "right"
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: false }}
              />
            </div>
          </div>
        </section>

        {/* Sección de Videos - ¿Qué buscamos en nuestros profesionales? */}
        <section className="relative w-full py-8 lg:py-12 px-6 lg:px-8 pb-0 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Línea decorativa azul neón centrada */}
            <motion.div
              className="h-1.5 w-32 lg:w-40 rounded-full mx-auto mb-8 lg:mb-10"
              style={{
                background: '#0365ff',
                boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)',
                transformOrigin: "center"
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              viewport={{ once: false }}
            />

            {/* Título centrado */}
            <motion.h2
              className="subtitle-font text-3xl lg:text-4xl xl:text-5xl text-white text-center mb-8 lg:mb-6 uppercase"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
            >
              ¿Qué buscamos en nuestros profesionales?
            </motion.h2>

            {/* Contenedor de videos */}
            <motion.div
              className="flex flex-col lg:flex-row gap-6 lg:gap-4 mb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              {/* Video 1 */}
              <div className="flex-1 flex flex-col gap-4 lg:gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[50vh] lg:h-screen">
                  <div className="relative w-full h-full bg-black">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      style={{ objectFit: 'cover' }}
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          // Intento silencioso de reproducir
                        });
                      }}
                    >
                      <source src="https://i.imgur.com/xDZzXa0.mp4" type="video/mp4" />
                    </video>
                    {/* Título solapado en móvil y desktop */}
                    <motion.h3
                      className="absolute top-6 left-0 right-0 text-font text-2xl lg:text-2xl xl:text-3xl text-white text-center px-4 whitespace-nowrap"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: false }}
                      style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      Instructores expertos
                    </motion.h3>
                  </div>
                </div>
              </div>

              {/* Video 2 */}
              <div className="flex-1 flex flex-col gap-4 lg:gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[50vh] lg:h-screen">
                  <div className="relative w-full h-full bg-black">
                    <video
                      className="w-full h-full object-cover object-[center_25%]"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          // Intento silencioso de reproducir
                        });
                      }}
                    >
                      <source src="https://i.imgur.com/Z8uzWZi.mp4" type="video/mp4" />
                    </video>
                    {/* Título solapado en móvil y desktop */}
                    <motion.h3
                      className="absolute top-6 left-0 right-0 text-font text-2xl lg:text-2xl xl:text-3xl text-white text-center px-4 whitespace-nowrap"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: false }}
                      style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      Compromiso con el impacto
                    </motion.h3>
                  </div>
                </div>
              </div>

              {/* Video 3 */}
              <div className="flex-1 flex flex-col gap-4 lg:gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[50vh] lg:h-screen">
                  <div className="relative w-full h-full bg-black">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      style={{ objectFit: 'cover' }}
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          // Intento silencioso de reproducir
                        });
                      }}
                    >
                      <source src="https://i.imgur.com/UVmnypZ.mp4" type="video/mp4" />
                    </video>
                    {/* Título solapado en móvil y desktop */}
                    <motion.h3
                      className="absolute top-6 left-0 right-0 text-font text-2xl lg:text-2xl xl:text-3xl text-white text-center px-4 whitespace-nowrap"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: false }}
                      style={{
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      Contenido de calidad
                    </motion.h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Div con efecto glass y texto deslizante - PEGADO COMPLETAMENTE A LOS SUBTÍTULOS */}
        <section className="relative w-full bg-transparent marquee-section" style={{ marginTop: '-1rem' }}>
          <div
            className="overflow-visible py-4 border-y-2 border-white/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(3, 101, 255, 0.25) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              position: 'relative',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              width: '100vw',
              maxWidth: '100vw',
            }}
          >
            <style>{`
              @keyframes marquee-instructors {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              /* Tablet y Desktop: con animación */
              @media (min-width: 640px) {
                .marquee-instructors-content {
                  animation: marquee-instructors 60s linear infinite;
                  will-change: transform;
                  justify-content: flex-start;
                  padding: 0;
                }
                
                .marquee-instructors-content span {
                  font-size: 1.125rem;
                  white-space: nowrap;
                }
              }
              
              @media (min-width: 1024px) {
                .marquee-instructors-content {
                  animation-duration: 25s !important;
                }
                .marquee-instructors-content span {
                  font-size: 1.25rem;
                }
                .marquee-section {
                  margin-top: -3rem !important;
                }
              }
            `}</style>
            
            {/* VERSIÓN MÓVIL - Texto estático centrado con negrita */}
            <div className="sm:hidden flex justify-center items-center px-4">
              <span className="subtitle-font text-white tracking-wider text-center whitespace-nowrap" style={{ fontSize: '0.7rem' }}>
                APORTA TU <strong className="font-bold">CONOCIMIENTO, APOYO AUTÉNTICO Y SEGURIDAD</strong> A NUESTRA COMUNIDAD
              </span>
            </div>
            
            {/* VERSIÓN DESKTOP - Animación marquee con texto original */}
            <div className="hidden sm:flex marquee-instructors-content">
              <span className="subtitle-font text-white tracking-wider pr-8">
                PROFESIONALES QUE APORTAN <strong className="font-bold">CONOCIMIENTO, APOYO AUTÉNTICO Y SEGURIDAD</strong> A NUESTRA COMUNIDAD •
              </span>
              <span className="subtitle-font text-white tracking-wider pr-8">
                PROFESIONALES QUE APORTAN <strong className="font-bold">CONOCIMIENTO, APOYO AUTÉNTICO Y SEGURIDAD</strong> A NUESTRA COMUNIDAD •
              </span>
              <span className="subtitle-font text-white tracking-wider pr-8">
                PROFESIONALES QUE APORTAN <strong className="font-bold">CONOCIMIENTO, APOYO AUTÉNTICO Y SEGURIDAD</strong> A NUESTRA COMUNIDAD •
              </span>
              <span className="subtitle-font text-white tracking-wider pr-8">
                PROFESIONALES QUE APORTAN <strong className="font-bold">CONOCIMIENTO, APOYO AUTÉNTICO Y SEGURIDAD</strong> A NUESTRA COMUNIDAD •
              </span>
            </div>
          </div>
        </section>

        {/* Tercer beneficio - Full section transparent - IMAGEN IZQUIERDA, TEXTO DERECHA */}
        <section
          className="relative w-full py-8 lg:py-12 px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            <div 
              className="flex-1 lg:flex-[1.3] max-w-none relative lg:-ml-8 xl:-ml-12 benefits-image-left-mobile"
              style={{
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'auto'
              }}
            >
              <div className="min-h-[400px] max-h-[60vh] lg:h-[95vh] xl:h-[98vh] relative lg:overflow-hidden rounded-xl lg:rounded-none">
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src={instructorBenefits[2].image}
                    alt={instructorBenefits[2].title}
                    className="w-full h-full object-contain object-center"
                    style={{
                      touchAction: 'pan-y',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left px-4 flex flex-col justify-center">
              {/* Línea decorativa azul neón - ANTES DEL TÍTULO */}
              <motion.div
                className="h-1.5 w-32 lg:w-40 rounded-full mx-auto lg:mx-0 mb-6"
                style={{
                  background: '#0365ff',
                  boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)',
                  transformOrigin: "left"
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                viewport={{ once: false }}
              />

              <motion.h3 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl subtitle-font text-white mb-4 lg:mb-6 leading-tight uppercase"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                {instructorBenefits[2].title}
              </motion.h3>
              
              <motion.p 
                className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray-200 text-font leading-relaxed mb-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                {instructorBenefits[2].description}
              </motion.p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}