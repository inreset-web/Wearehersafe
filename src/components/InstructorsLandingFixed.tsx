import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { HeroSection } from "./HeroSection";
import { InstructorBenefitsSection } from "./InstructorBenefitsSection";
import { CheckCircle, Users, Shield, Video, Mail, Star, Heart, Zap, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useRepeatingScrollAnimation, useOnceScrollAnimation } from "./useScrollAnimation";
import { submitFormData, validateFormData, type FormSubmissionData } from "./FormSubmitService";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Imágenes para la sección flotante de profesionales
import instructorImage1 from 'figma:asset/fb69ccca16f59aad54d2be132739e6a3effbc03c.png';
import instructorImage2 from 'figma:asset/107a22cafc98c18568c85e3f46c367cde3663335.png';
import instructorImage3 from 'figma:asset/f7872b80d91050d0913ac327e48be8d0c80b3f80.png';

// Componente de formulario para instructores
function InstructorContactForm() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    especialidad: '',
    email: '',
    telefono: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparar datos para validación y envío
    const submissionData: FormSubmissionData = {
      nombreCompleto: formData.nombreCompleto,
      especialidad: formData.especialidad,
      email: formData.email,
      telefono: formData.telefono
    };
    
    // Validación usando el servicio
    const validationError = validateFormData(submissionData, 'instructors');
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Envío usando el sistema múltiple
      const result = await submitFormData(submissionData, 'instructors');
      
      if (result.success) {
        toast.success(result.message, {
          duration: 6000,
        });
        
        // Limpiar formulario solo si el envío fue exitoso
        setFormData({
          nombreCompleto: '',
          especialidad: '',
          email: '',
          telefono: ''
        });
        
        // Mostrar método usado en consola para debugging
        console.log(`✅ Formulario enviado vía: ${result.method}`);
        
      } else {
        toast.error(result.message);
      }

    } catch (error) {
      console.error('Error en envío de formulario:', error);
      toast.error("Error inesperado al enviar la información. Por favor contacta directamente a colaboraciones.wearehersafe@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: false }}
    >
      {/* Nombre Completo */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: false }}
      >
        <input
          id="nombreCompleto"
          type="text"
          value={formData.nombreCompleto}
          onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
          placeholder="Nombre completo *"
          className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white focus:border-white/50 focus:outline-none h-12 px-0 text-lg text-font transition-all duration-300"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Especialidad */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: false }}
      >
        <input
          id="especialidad"
          type="text"
          value={formData.especialidad}
          onChange={(e) => handleInputChange('especialidad', e.target.value)}
          placeholder="Especialidad profesional *"
          className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white focus:border-white/50 focus:outline-none h-12 px-0 text-lg text-font transition-all duration-300"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Email */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: false }}
      >
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Email profesional *"
          className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white focus:border-white/50 focus:outline-none h-12 px-0 text-lg text-font transition-all duration-300"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Teléfono */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        viewport={{ once: false }}
      >
        <input
          id="telefono"
          type="tel"
          value={formData.telefono}
          onChange={(e) => handleInputChange('telefono', e.target.value)}
          placeholder="Teléfono (opcional)"
          className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white focus:border-white/50 focus:outline-none h-12 px-0 text-lg text-font transition-all duration-300"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Botón de envío */}
      <motion.div 
        className="pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        viewport={{ once: false }}
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-[#0365ff] text-white border-2 border-[#0365ff] hover:bg-white hover:text-[#0365ff] subtitle-font text-lg tracking-wide transition-all duration-300 disabled:opacity-50 shadow-xl rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-center">
            {isSubmitting ? "ENVIANDO..." : "ENVIAR INFORMACIÓN"}
          </span>
        </motion.button>
      </motion.div>

      {/* Texto informativo */}
      <motion.p 
        className="text-center text-sm text-white text-font mt-6 whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        viewport={{ once: false }}
      >
        Al conectarte aceptas recibir información sobre nuestros servicios
      </motion.p>
    </motion.form>
  );
}

export default function InstructorsLanding() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const instructorsVideoRef = useRef<HTMLVideoElement>(null);
  // Estado para controlar el overlay negro
  const [instructorsVideoLoaded, setInstructorsVideoLoaded] = useState(false);
  // Inicializar con el valor correcto desde el principio para evitar parpadeo
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Detectar si es móvil - SOLUCIN DEFINITIVA para responsive
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

  const { ref: heroAnimationRef, shouldAnimate: shouldAnimateHero } = useRepeatingScrollAnimation({
    threshold: 0.2,
    margin: "-50px"
  });

  const { ref: whyAnimationRef, shouldAnimate: shouldAnimateWhy } = useRepeatingScrollAnimation({
    threshold: 0.2,
    margin: "-100px"
  });

  const { ref: benefitsAnimationRef, shouldAnimate: shouldAnimateBenefits } = useRepeatingScrollAnimation({
    threshold: 0.2,
    margin: "-100px"
  });

  const { ref: ctaAnimationRef, shouldAnimate: shouldAnimateCta } = useRepeatingScrollAnimation({
    threshold: 0.2,
    margin: "-100px"
  });

  // Simple state-based parallax effects
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Horizontal scroll logic
  useEffect(() => {
    const horizontalSection = document.getElementById('instructors-hersafe-scroll');
    const track = horizontalSection?.querySelector('.hs-track') as HTMLElement;
    
    if (!horizontalSection || !track) return;

    const handleHorizontalScroll = () => {
      const rect = horizontalSection.getBoundingClientRect();
      const sectionHeight = horizontalSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
      
      // Calculate horizontal translation
      const trackWidth = track.scrollWidth;
      const viewportWidth = track.parentElement?.offsetWidth || 0;
      const maxTranslateX = -(trackWidth - viewportWidth);
      const translateX = scrollProgress * maxTranslateX;
      
      // Apply translation with GPU acceleration
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    };

    // Add scroll listener
    window.addEventListener('scroll', handleHorizontalScroll);
    
    // Initial call
    handleHorizontalScroll();
    
    return () => {
      window.removeEventListener('scroll', handleHorizontalScroll);
    };
  }, []);

  // Auto-reproducir video de instructores SIN CONTROLES - Completamente automático
  useEffect(() => {
    if (!instructorsVideoRef.current) return;
    
    const video = instructorsVideoRef.current;
    
    // Verificar que tenemos acceso básico al elemento video
    if (!video || typeof video.setAttribute !== 'function') {
      console.error('Instructors video element not properly initialized');
      return;
    }
    
    // FORZAR ELIMINACIÓN DE CONTROLES INMEDIATAMENTE
    video.removeAttribute('controls');
    video.setAttribute('controls', 'false');
    video.setAttribute('data-no-controls', 'true');
    
    // Configuración básica para autoplay inmediato
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.volume = 0;
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('preload', 'auto');
      
    // BLOQUEAR TODAS LAS INTERACCIONES DEL USUARIO CON EL VIDEO
    const preventInteraction = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    // Eventos a bloquear completamente
    const blockedEvents = [
      'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove',
      'touchstart', 'touchend', 'touchmove', 'touchcancel',
      'contextmenu', 'selectstart', 'dragstart', 'drag', 'dragend',
      'keydown', 'keyup', 'keypress', 'focus', 'blur'
    ];

    // Bloquear todas las interacciones en el video
    blockedEvents.forEach(eventType => {
      video.addEventListener(eventType, preventInteraction, { passive: false, capture: true });
    });

    // Función de reproducción agresiva - intentar inmediatamente
    const playVideo = async () => {
      try {
        video.muted = true;
        video.volume = 0;
        await video.play();
        console.log('Instructors video reproduciendo correctamente');
        setInstructorsVideoLoaded(true);
      } catch (error) {
        console.log('Error de autoplay instructors, reintentando...', error);
        // Reintentar agresivamente
        setTimeout(() => {
          video.muted = true;
          video.volume = 0;
          video.play().then(() => {
            setInstructorsVideoLoaded(true);
          }).catch(e => {
            console.log('Reintento fallido instructors, intentando de nuevo:', e);
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
    
    const handleVideoEnd = () => {
      if (video.ended) {
        video.currentTime = 0;
        playVideo();
      }
    };
    
    const handlePlaying = () => {
      setInstructorsVideoLoaded(true); // Cuando realmente empiece a reproducir, quitar overlay
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('playing', handlePlaying);

    // Forzar load del video
    video.load();
    
    // Intentar reproducir después de un muy breve delay inicial
    setTimeout(() => playVideo(), 50);
      
    // Forzar propiedades no interactivas
    video.setAttribute('tabindex', '-1');
    video.setAttribute('aria-hidden', 'true');
      
    // Cleanup optimizado
    return () => {
      // Remover listeners automáticos
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('playing', handlePlaying);
      
      // Remover listeners de bloqueo de interacciones
      blockedEvents.forEach(eventType => {
        video.removeEventListener(eventType, preventInteraction, { capture: true } as any);
      });
    };
  }, []);

  // Formulario modal funcional con estado
  const InstructorApplicationForm = () => {
    const [modalFormData, setModalFormData] = useState({
      nombreCompleto: '',
      email: '',
      especialidad: '',
      experiencia: ''
    });
    const [isModalSubmitting, setIsModalSubmitting] = useState(false);
    
    const handleModalInputChange = (field: string, value: string) => {
      setModalFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };
    
    const handleModalSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const submissionData: FormSubmissionData = {
        nombreCompleto: modalFormData.nombreCompleto,
        especialidad: modalFormData.especialidad,
        email: modalFormData.email,
        telefono: modalFormData.experiencia // Usamos experiencia como información adicional
      };
      
      const validationError = validateFormData(submissionData, 'instructors');
      if (validationError) {
        toast.error(validationError);
        return;
      }
      
      setIsModalSubmitting(true);
      
      try {
        const result = await submitFormData(submissionData, 'instructors');
        
        if (result.success) {
          toast.success(result.message, {
            duration: 6000,
          });
          
          // Limpiar formulario modal
          setModalFormData({
            nombreCompleto: '',
            email: '',
            especialidad: '',
            experiencia: ''
          });
          
          // Cerrar toast después de éxito
          setTimeout(() => {
            toast.dismiss();
          }, 1500);
          
        } else {
          toast.error(result.message);
        }
        
      } catch (error) {
        console.error('Error en envío de formulario modal:', error);
        toast.error("Error inesperado. Por favor contacta directamente a colaboraciones.wearehersafe@gmail.com");
      } finally {
        setIsModalSubmitting(false);
      }
    };
    
    return (
      <div className="p-8 bg-[#0365ff] rounded-2xl border-2 border-white/20 max-w-lg mx-auto" data-modal="true">
        <h3 className="text-2xl subtitle-font text-white mb-6 text-center">Solicitud de Instructora</h3>
        <form onSubmit={handleModalSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Nombre completo *"
            value={modalFormData.nombreCompleto}
            onChange={(e) => handleModalInputChange('nombreCompleto', e.target.value)}
            className="w-full p-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white/60 focus:outline-none transition-all"
            disabled={isModalSubmitting}
          />
          <input
            type="email"
            placeholder="Email profesional *"
            value={modalFormData.email}
            onChange={(e) => handleModalInputChange('email', e.target.value)}
            className="w-full p-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white/60 focus:outline-none transition-all"
            disabled={isModalSubmitting}
          />
          <input
            type="text"
            placeholder="Especialidad profesional *"
            value={modalFormData.especialidad}
            onChange={(e) => handleModalInputChange('especialidad', e.target.value)}
            className="w-full p-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white/60 focus:outline-none transition-all"
            disabled={isModalSubmitting}
          />
          <textarea
            placeholder="Cuéntanos sobre tu experiencia y enfoque profesional"
            rows={4}
            value={modalFormData.experiencia}
            onChange={(e) => handleModalInputChange('experiencia', e.target.value)}
            className="w-full p-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/70 focus:border-white/60 focus:outline-none transition-all resize-none"
            disabled={isModalSubmitting}
          />
          <button 
            type="submit"
            disabled={isModalSubmitting}
            className="w-full p-4 bg-white text-[#0365ff] subtitle-font text-lg rounded-lg hover:bg-white/90 transition-all duration-300 border-2 border-transparent hover:border-[#ff9e03] disabled:opacity-50"
          >
            {isModalSubmitting ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'}
          </button>
        </form>
      </div>
    );
  };

  const showApplicationForm = () => {
    toast(<InstructorApplicationForm />, {
      duration: Infinity,
      closeButton: false,
      style: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
      }
    });
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="instructors-landing min-h-screen bg-transparent"
      style={{ 
        paddingTop: 0, 
        marginTop: 0,
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        position: 'relative'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section - USANDO COMPONENTE COMPARTIDO */}
      <HeroSection 
        title={
          <>
            TU EXPERIENCIA CON <br className="sm:hidden" />IMPACTO REAL
          </>
        }
        description={
          <>
            Forma parte de la primera red de mujeres y posiciona tu experiencia donde se valora
          </>
        }
        buttons={[
          {
            text: "DOSSIER INFORMATIVO",
            onClick: () => window.open('https://hersafe-doc.netlify.app/hersafe%20-%20profesionales%20(1).pdf', '_blank'),
            variant: 'secondary'
          },
          {
            text: "AGENDAR LLAMADA",
            onClick: () => window.open('https://calendly.com/colaboraciones-wearehersafe/15min', '_blank'),
            variant: 'primary'
          }
        ]}
        id="instructores"
        videoSrc="https://i.imgur.com/QHufZ1u.mp4"
      />

      {/* Sección con imágenes flotantes - Profesionales */}
      <section className="relative w-full bg-transparent py-20 lg:py-32 overflow-hidden">
        {/* LAYOUT MÓVIL - Título, Imágenes superpuestas, Descripción */}
        <div className="lg:hidden px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Título - PRIMERO EN MÓVIL */}
            <motion.h2 
              className="text-2xl sm:text-3xl subtitle-font text-white leading-tight tracking-tight uppercase text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: false }}
            >
              POSICIONAMIENTO ÚNICO
            </motion.h2>

            {/* Tres imágenes - SEGUNDO EN MÓVIL - Composición compacta superpuesta */}
            <div className="relative h-[280px] w-full mb-4">
              {/* Imagen 3 - Izquierda superior - MÁS PEQUEÑA Y DETRÁS (la vertical larga con 4 personas) */}
              <motion.div
                className="absolute top-0 left-4 w-28 h-36 overflow-hidden rounded-xl shadow-lg z-5"
                initial={{ opacity: 0, x: -20, rotate: -8 }}
                whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: false }}
              >
                <ImageWithFallback
                  src={instructorImage3}
                  alt="Equipo de profesionales diversos"
                  className="w-full h-full object-cover filter brightness-110 contrast-110"
                />
              </motion.div>

              {/* Imagen 1 - Derecha superior - AHORA MÁS PROMINENTE (mujeres entrenando) */}
              <motion.div
                className="absolute top-8 right-4 w-40 h-40 overflow-hidden rounded-xl shadow-lg z-20"
                initial={{ opacity: 0, x: 20, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 8 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: false }}
              >
                <ImageWithFallback
                  src={instructorImage1}
                  alt="Mujeres entrenando en gimnasio"
                  className="w-full h-full object-cover filter brightness-110 contrast-110"
                />
              </motion.div>

              {/* Imagen 2 - Izquierda inferior (profesional en videollamada) */}
              <motion.div
                className="absolute bottom-0 left-12 w-40 h-36 overflow-hidden rounded-xl shadow-lg z-15"
                initial={{ opacity: 0, x: -20, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: false }}
              >
                <ImageWithFallback
                  src={instructorImage2}
                  alt="Profesional en videollamada con clientas"
                  className="w-full h-full object-cover filter brightness-110 contrast-110"
                />
              </motion.div>
            </div>

            {/* Descripción - TERCERO EN MÓVIL - Con margen superior adicional */}
            <motion.p 
              className="text-base sm:text-lg text-white text-font leading-relaxed text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: false }}
            >
              En HerSafe formarás parte del grupo de profesionales pioneros 
              que están construyendo un nuevo punto de referencia 
              en el bienestar femenino. 
              Obtén visibilidad, credibilidad y reconocimiento dentro de 
              una comunidad que valora tu experiencia.
            </motion.p>

            {/* Línea decorativa azul neón centrada - MÓVIL */}
            <motion.div
              className="h-1.5 w-32 rounded-full mx-auto"
              style={{
                background: '#0365ff',
                boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)',
                transformOrigin: "center"
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: false }}
            />
          </div>
        </div>

        {/* LAYOUT DESKTOP - Imágenes flotantes con título y texto centrado */}
        <div className="hidden lg:block">
          {/* Imágenes flotantes posicionadas aleatoriamente */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Imagen izquierda - arriba */}
            <motion.div
              className="absolute top-8 left-8 w-44 h-44 overflow-hidden cambio-real-mobile-images rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -50, rotate: -12 }}
              whileInView={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
              }}
              viewport={{ once: false }}
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              <ImageWithFallback
                src={instructorImage1}
                alt="Mujeres entrenando en gimnasio"
                className="w-full h-full object-cover rounded-xl filter brightness-110 contrast-110"
              />
            </motion.div>

            {/* Imagen derecha - centro */}
            <motion.div
              className="absolute top-1/2 right-8 w-36 h-48 overflow-hidden transform -translate-y-1/2 cambio-real-mobile-images rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 50, rotate: 15 }}
              whileInView={{ opacity: 1, x: 0, rotate: 12 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.15, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
              }}
              viewport={{ once: false }}
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              <ImageWithFallback
                src={instructorImage2}
                alt="Profesional en videollamada con clientas"
                className="w-full h-full object-cover rounded-xl filter brightness-110 contrast-110"
              />
            </motion.div>

            {/* Imagen izquierda - abajo */}
            <motion.div
              className="absolute bottom-8 left-32 w-40 h-32 overflow-hidden cambio-real-mobile-images rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -40, rotate: 8 }}
              whileInView={{ opacity: 1, x: 0, rotate: 5 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
              }}
              viewport={{ once: false }}
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              <ImageWithFallback
                src={instructorImage3}
                alt="Equipo de profesionales diversos"
                className="w-full h-full object-cover rounded-xl filter brightness-110 contrast-110"
              />
            </motion.div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              {/* Título principal */}
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl subtitle-font text-white leading-tight tracking-tight uppercase"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: false }}
              >
                POSICIONAMIENTO ÚNICO
              </motion.h2>

              {/* Descripción */}
              <motion.p 
                className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-white text-font leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: false }}
              >
                En HerSafe formarás parte del grupo de profesionales pioneros <br className="hidden lg:block" />
                que están construyendo un nuevo punto de referencia <br className="hidden lg:block" />
                en el bienestar femenino. <br />
                Obtén visibilidad, credibilidad y reconocimiento dentro de <br className="hidden lg:block" />
                una comunidad que valora tu experiencia.
              </motion.p>

              {/* Línea decorativa azul neón centrada - DESKTOP */}
              <motion.div
                className="h-1.5 w-32 lg:w-40 rounded-full mx-auto"
                style={{
                  background: '#0365ff',
                  boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)',
                  transformOrigin: "center"
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: false }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios para Instructores */}
      <InstructorBenefitsSection />

      {/* Sección de formulario de contacto - Fondo negro */}
      <section
        id="instructor-form-section"
        className="relative w-full bg-transparent py-8 lg:py-12 px-6 lg:px-8 pb-20 lg:pb-32"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Texto principal - Lado izquierdo */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-6 lg:pt-8">
              <motion.h3 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white mb-6 lg:mb-8 leading-tight subtitle-font text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Tu clienta ideal <br />
                <span className="subtitle-font font-bold text-[#024bb5] tracking-wider">TE ESPERA</span>
              </motion.h3>
              
              <motion.p 
                className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl text-white text-font leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
              >
                Agenda una videollamada de 15 minutos y descubre cómo HerSafe puede potenciar tu trayectoria, amplificar tu mensaje y ayudarte a llegar a mujeres que valoran tu conocimiento.
              </motion.p>
              
              {/* CTA - Botón de acción */}
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* CTA Principal */}
                <button
                  onClick={() => window.open('https://calendly.com/colaboraciones-wearehersafe/15min', '_blank')}
                  className="inline-flex items-center gap-2 lg:gap-3 px-4 lg:px-8 py-3 lg:py-4 bg-[#0365ff] text-white border-2 border-[#0365ff] subtitle-font text-sm lg:text-lg tracking-wide transition-all duration-300 hover:bg-white hover:text-[#0365ff] shadow-lg rounded-lg cursor-pointer whitespace-nowrap"
                  style={{ 
                    zIndex: 10,
                    position: 'relative',
                    pointerEvents: 'auto'
                  }}
                >
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">AGENDA TU VIDEOLLAMADA DE 15 MIN</span>
                </button>
              </motion.div>
            </div>

            {/* Formulario - Lado derecho */}
            <div className="lg:pl-8 lg:pt-12">
              <InstructorContactForm />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}