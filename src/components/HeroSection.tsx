import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { useOnceScrollAnimation } from "./useScrollAnimation";
import { usePWAInstall } from "./PWAContext";

interface HeroButton {
  text: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

interface HeroSectionProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  buttons: HeroButton[];
  id?: string;
  videoSrc?: string;
}

export function HeroSection({ title, description, buttons, id = "inicio", videoSrc = "https://i.imgur.com/B1U6VWB.mp4" }: HeroSectionProps) {
  const { ref: animationRef, shouldAnimate } = useOnceScrollAnimation({
    threshold: 0.1,
    margin: "-20px"
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  // Estado para controlar el overlay negro
  const [videoLoaded, setVideoLoaded] = useState(false);
  // Inicializar con el valor correcto desde el principio para evitar parpadeo
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // PWA Install hook
  const { handleUnirmeClick } = usePWAInstall();

  // Detectar si es móvil - SOLUCIÓN DEFINITIVA para responsive
  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);
    
    // Inicializar valor correcto inmediatamente
    const initialCheck = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    initialCheck();
    
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(prev => prev !== mobile ? mobile : prev);
    };
    
    // Usar requestAnimationFrame para asegurar sincronización correcta
    let rafId: number;
    const handleResize = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(checkMobile);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Función para hacer scroll al formulario - Con fallback para Safari
  const handleScrollToForm = () => {
    const formulario = document.getElementById('formulario-hersafe');
    
    if (formulario) {
      try {
        // Intentar método moderno primero
        formulario.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      } catch (e) {
        // Fallback para Safari que no soporta el objeto options
        try {
          formulario.scrollIntoView(true);
        } catch (fallbackError) {
          // Último recurso: scroll manual
          const elementTop = formulario.offsetTop;
          window.scrollTo({
            top: elementTop - (window.innerHeight / 2),
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Fallback: scroll hacia el final de la página
      try {
        window.scrollTo({
          top: document.documentElement.scrollHeight * 0.7,
          behavior: 'smooth'
        });
      } catch (e) {
        // Fallback sin smooth scroll para Safari muy antiguo
        window.scrollTo(0, document.documentElement.scrollHeight * 0.7);
      }
    }
  };

  // Configuración de video optimizada
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configuración básica
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.volume = 0;
    
    // Configurar atributos
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');

    // Función de reproducción ULTRA AGRESIVA - intentar INMEDIATAMENTE y repetidamente
    const playVideo = async () => {
      try {
        video.muted = true;
        video.volume = 0;
        await video.play();
        console.log('Video reproduciendo correctamente');
        setVideoLoaded(true);
      } catch (error) {
        console.log('Error de autoplay, reintentando...', error);
        // Reintentar agresivamente
        setTimeout(() => {
          video.muted = true;
          video.volume = 0;
          video.play().then(() => {
            setVideoLoaded(true);
          }).catch(e => {
            console.log('Reintento fallido, intentando de nuevo:', e);
            // Último intento después de interacción
            setTimeout(() => {
              video.play().catch(() => {});
            }, 500);
          });
        }, 50);
      }
    };

    // Intentar reproducir INMEDIATAMENTE - múltiples veces
    playVideo();
    setTimeout(() => playVideo(), 100);
    setTimeout(() => playVideo(), 300);
    setTimeout(() => playVideo(), 500);

    // Event listeners - intentar en cada evento de carga
    const handleLoadedMetadata = () => {
      playVideo();
    };

    const handleCanPlay = () => {
      playVideo();
    };

    const handleLoadedData = () => {
      playVideo();
    };
    
    const handlePlaying = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('playing', handlePlaying);

    // Forzar load del video
    video.load();

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  return (
    <section 
      id={id} 
      className="hero-section w-full bg-transparent hero-viewport-fit relative overflow-hidden"
      style={{ 
        padding: 0,
        margin: 0,
        minHeight: '100vh',
        height: '100vh',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        position: 'relative'
      }}
      ref={animationRef}
    >
      {/* Video de fondo completo */}
      <motion.div
        className="absolute w-full h-full"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: 0
        }}
        initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
        animate={isMobile ? { opacity: 1 } : (shouldAnimate ? { opacity: 1 } : { opacity: 0 })}
        transition={isMobile ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Overlay negro para evitar parpadeo verde - se oculta cuando el video carga */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            zIndex: videoLoaded ? -1 : 10,
            opacity: videoLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease-out',
            pointerEvents: 'none'
          }}
        />
        
        {/* Overlay transparente PERMANENTE para bloquear toques en el video (Safari iOS) */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            zIndex: 999999,
            pointerEvents: 'auto',
            cursor: 'default',
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'pan-y'
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        />
        
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectPosition: 'center center',
            backgroundColor: '#000000',
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            touchAction: 'none',
            WebkitTouchCallout: 'none',
            WebkitAppearance: 'none',
            appearance: 'none',
            WebkitMediaControls: 'none',
            MozMediaControls: 'none',
            WebkitMediaControlsPanel: 'none',
            WebkitMediaControlsEnclosure: 'none',
            WebkitMediaControlsOverlayEnclosure: 'none',
            WebkitMediaControlsStartPlaybackButton: 'none',
            zIndex: 1,
            imageRendering: 'high-quality',
            filter: 'contrast(1.05) brightness(1.02)'
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          controls={false}
          disablePictureInPicture={true}
          disableRemotePlayback={true}
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          data-setup="{}"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay oscuro para mejorar legibilidad del texto */}
      <div 
        className="absolute inset-0 z-[1] bg-black/30"
        style={{
          backdropFilter: 'brightness(0.85)',
          WebkitBackdropFilter: 'brightness(0.85)'
        }}
      />

      {/* Contenido del Hero - Posicionado abajo con espacio cómodo en móvil */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end lg:justify-center items-center text-center px-4 pb-4 lg:pb-0">
        {/* Contenido posicionado abajo pero no pegado al fondo */}
        <div className="w-full space-y-4 sm:space-y-5 lg:space-y-2 mb-20 sm:mb-24 lg:mb-0 lg:translate-y-[28vh]">
          {/* Título */}
          <motion.h1 
            className="title-font text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-white mb-3 lg:mb-0 uppercase leading-tight drop-shadow-lg" 
            style={{ opacity: isMobile ? 1 : undefined, fontWeight: 700 }}
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : (shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
            transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h1>

          {/* Descripción */}
          <motion.p 
            className="body-font text-sm sm:text-lg md:text-lg lg:text-xl text-white max-w-3xl mx-auto px-4 whitespace-nowrap overflow-x-auto lg:whitespace-normal scrollbar-hide"
            style={{ opacity: isMobile ? 1 : undefined, fontWeight: 400 }}
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : (shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
            transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 lg:pt-4">
            {/* En móvil: invertir orden de botones (último botón primero) */}
            {/* En desktop: orden normal */}
            {(isMobile ? [...buttons].reverse() : buttons).map((button, index) => {
              // Interceptar el onClick para botones "UNIRME" en móvil
              const handleClick = () => {
                if (button.text === "UNIRME") {
                  handleUnirmeClick();
                } else {
                  button.onClick();
                }
              };

              return (
                <motion.button
                  key={index}
                  onClick={handleClick}
                  className="subtitle-font tracking-wider rounded-full shadow-xl text-white border-2 border-white/20 w-full sm:w-auto"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(3, 101, 255, 0.25) 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: 10,
                    position: 'relative',
                    pointerEvents: 'auto',
                    whiteSpace: 'nowrap',
                    padding: '8px 20px',
                    fontSize: '14px',
                    display: 'inline-block',
                    minWidth: '220px',
                    fontWeight: 700
                  }}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={isMobile ? { opacity: 1, y: 0 } : (shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
                  transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.6 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  whileInView={isMobile ? {
                    background: [
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(3, 101, 255, 0.25) 100%)',
                      'linear-gradient(135deg, rgba(3, 101, 255, 0.7) 0%, rgba(3, 101, 255, 0.9) 100%)',
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(3, 101, 255, 0.25) 100%)'
                    ]
                  } : undefined}
                  viewport={isMobile ? { once: true, amount: 0.8 } : undefined}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    background: 'linear-gradient(135deg, rgba(3, 101, 255, 0.7) 0%, rgba(3, 101, 255, 0.9) 100%)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {button.text}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}