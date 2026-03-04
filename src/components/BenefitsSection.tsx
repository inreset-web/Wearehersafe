import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useOnceScrollAnimation, useRepeatingScrollAnimation } from "./useScrollAnimation";
import { toast } from "sonner@2.0.3";
import { submitFormData, validateFormData, type FormSubmissionData } from "./FormSubmitService";
import { usePWAInstall } from "./PWAContext";
// Mockup de plataforma - Todo lo que necesitas
import apoyoTangibleImage from 'figma:asset/bfc83436ca286aac6d76d7b3b858cbfd3279dca6.png';
// Mockup de comunidad - Laptop con mujeres entrenando defensa personal
import comunidadImage from 'figma:asset/a7a53a0d498ade8a19be4b3c6bc06b69fe99c2b9.png';
// Mockup de login móvil - Un entorno creado para que sigas creciendo
import serPioneraImage from 'figma:asset/4554e0c810a4418b076b6f98c5954e33280861d5.png';
import cambioRealImage from 'figma:asset/0d1364f7a65b36e11e885b16131fdaf7dfbbbfac.png';
import exerciseImage from 'figma:asset/8fb0475333c99a9c5a8d6ac48dc3a12d1e99ffef.png';
import artisticImage from 'figma:asset/2509bd1ac7a5c8e1a640bc6c3be5b49151a1a602.png';
// Mockups navideños
import nereaNavidadImage from 'figma:asset/8369be06c061c92c9a7f4eed77c7ac74af900ed9.png';
import registroImage from 'figma:asset/8385718eba83e2d4986012929f36735d87bbd8d9.png';
// Banner navideño desktop
import bannerNavidadDesktop from 'figma:asset/8068e070c312013874e7bef270a11699c88959c2.png';
// Banner "¿Qué puedes hacer en HerSafe?"
import bannerQuePuedesDesktop from 'figma:asset/c91744c9c416596fb2186b6d4442eb625dff3751.png';
import bannerQuePuedesMobile from 'figma:asset/325f37c69df179dd49fea810693548eca7192e41.png';

// Componente de copo de nieve cayendo
function FallingSnowflake({ delay, duration, left, startY }: { delay: number; duration: number; left: string; startY: number }) {
  return (
    <motion.div
      className="absolute text-white/30 text-xl lg:text-2xl pointer-events-none hidden lg:block"
      style={{
        left,
        top: `${startY}vh`,
      }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
        rotate: [0, 360],
        opacity: [0, 0, 0.3, 0.3, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      ❄
    </motion.div>
  );
}

// Componente Contador Regresivo hasta el 25 de Diciembre
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-12-25T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm border border-[#ff9e03]/30 rounded-lg px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[90px]">
        <div className="text-3xl sm:text-4xl lg:text-5xl subtitle-font text-[#ff9e03] tabular-nums">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-white/80 text-font mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );

  const Separator = () => (
    <motion.div
      className="flex items-center justify-center pb-8"
      animate={{
        opacity: [1, 0.3, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-3xl sm:text-4xl lg:text-5xl subtitle-font text-[#ff9e03]">
        :
      </span>
    </motion.div>
  );

  return (
    <motion.div
      className="flex justify-center gap-3 sm:gap-4 lg:gap-6 my-6 lg:my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <TimeBox value={timeLeft.days} label="Días" />
      <Separator />
      <TimeBox value={timeLeft.hours} label="Horas" />
      <Separator />
      <TimeBox value={timeLeft.minutes} label="Minutos" />
      <Separator />
      <TimeBox value={timeLeft.seconds} label="Segundos" />
    </motion.div>
  );
}

// Componente de formulario inline elegante
function BenefitsNetworkFormInline() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    pais: '',
    email: ''
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
    
    // Preparar datos para envío
    const submissionData: FormSubmissionData = {
      nombreCompleto: formData.nombreCompleto,
      email: formData.email,
      pais: formData.pais
    };

    // Validación usando el sistema centralizado
    const validationError = validateFormData(submissionData, 'inicio');
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Envío usando el sistema múltiple (FormSubmit + EmailOctopus con fallbacks)
      const result = await submitFormData(submissionData, 'inicio');
      
      if (result.success) {
        toast.success(result.message, {
          duration: 5000,
        });
        
        // Limpiar formulario
        setFormData({
          nombreCompleto: '',
          pais: '',
          email: ''
        });
      } else {
        toast.error(result.message);
      }

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      toast.error("Error al conectarte a la red. Por favor intenta de nuevo o contacta a colaboraciones.wearehersafe@gmail.com");
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
          placeholder="Nombre completo"
          className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white focus:border-white/50 focus:outline-none h-12 px-0 text-lg text-font transition-all duration-300"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* País */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: false }}
      >
        <input
          id="pais"
          type="text"
          value={formData.pais}
          onChange={(e) => handleInputChange('pais', e.target.value)}
          placeholder="País"
          className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white focus:border-white/50 focus:outline-none h-12 px-0 text-lg text-font transition-all duration-300"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Email */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: false }}
      >
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Correo electrónico"
          className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white focus:border-white/50 focus:outline-none h-12 px-0 text-lg text-font transition-all duration-300"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Botón de envío */}
      <motion.div 
        className="pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        viewport={{ once: false }}
      >
        <motion.button
          id="unete-a-la-red-button"
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-[#ff9e03] hover:bg-[#0365ff] text-white subtitle-font text-lg tracking-wide transition-all duration-300 disabled:opacity-50 shadow-xl rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-center">
            {isSubmitting ? "ENVIANDO..." : "ASEGURA TU ACCESO"}
          </span>
        </motion.button>
      </motion.div>

      {/* Texto informativo */}
      <motion.p 
        className="text-center text-sm text-white text-font mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: false }}
      >
        Al conectarte aceptas recibir información <span className="whitespace-nowrap">sobre nuestros servicios profesionales</span>
      </motion.p>
    </motion.form>
  );
}

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: headerAnimationRef, shouldAnimate: shouldAnimateHeader } = useOnceScrollAnimation({
    threshold: 0.2,
    margin: "-100px"
  });

  // Hook separado para las imágenes que se repiten siempre
  const { ref: imagesAnimationRef, shouldAnimate: shouldAnimateImages } = useRepeatingScrollAnimation({
    threshold: 0.2,
    margin: "-100px"
  });

  // Hook PWA para manejar clicks en botones de acceso
  const { handleUnirmeClick } = usePWAInstall();

  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const benefits = [
    {
      title: "Comunidad real que te acompaña",
      description: "En HerSafe podrás compartir tu historia, conectar con mujeres y sentirte segura en cada etapa. Una red donde aprender, apoyarte en otras mujeres y construir juntas un lugar seguro.",
      image: comunidadImage
    },
    {
      title: "Un entorno creado para que sigas creciendo",
      description: "Próximamente tendrás acceso a contenido y recursos pensados para fortalecer tu seguridad, salud y bienestar. Un espacio práctico y cercano donde encontrarás apoyo real cada día, junto a profesionales cualificados.",
      image: serPioneraImage
    },
    {
      title: "Todo lo que necesitas, en una sola plataforma.",
      description: "HerSafe nace para que puedas cuidarte con contenido que te impulsa, centrado en tu seguridad, salud y bienesta",
      image: apoyoTangibleImage
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full benefits-section">
      
      {/* Sección azul con imágenes flotantes y texto central */}
      <section ref={imagesAnimationRef} className="relative w-full bg-transparent py-20 lg:py-32 overflow-hidden">
        
        {/* LAYOUT MÓVIL - Título, Imágenes, Descripción */}
        <div className="lg:hidden px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Título - PRIMERO EN MÓVIL */}
            <motion.h2 
              className="text-2xl sm:text-3xl subtitle-font text-white leading-tight tracking-tight uppercase text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: false }}
            >
              TODO LO QUE NECESITAS EN UNA MISMA PLATAFORMA
            </motion.h2>

            {/* Tres imágenes - SEGUNDO EN MÓVIL - Composición compacta superpuesta */}
            <div className="relative h-[280px] w-full">
              {/* Imagen 1 - Izquierda superior */}
              <motion.div
                className="absolute top-0 left-4 w-40 h-40 overflow-hidden z-10"
                initial={{ opacity: 0, x: -20, rotate: -8 }}
                whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: false }}
              >
                <ImageWithFallback
                  src={cambioRealImage}
                  alt="Mujer deportista enfocada en su bienestar"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Imagen 2 - Derecha centro */}
              <motion.div
                className="absolute top-8 right-4 w-36 h-48 overflow-hidden z-20"
                initial={{ opacity: 0, x: 20, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 8 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: false }}
              >
                <ImageWithFallback
                  src={artisticImage}
                  alt="Mujeres conectadas y felices"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Imagen 3 - Izquierda inferior */}
              <motion.div
                className="absolute bottom-0 left-12 w-40 h-36 overflow-hidden z-15"
                initial={{ opacity: 0, x: -20, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: false }}
              >
                <ImageWithFallback
                  src={exerciseImage}
                  alt="Mujer usando la plataforma HerSafe"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Descripción - TERCERO EN MÓVIL */}
            <motion.p 
              className="text-base sm:text-lg text-white text-font leading-relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: false }}
            >
              Hersafe nace para que cada mujer tenga un espacio seguro 
              donde cuidarse física, mental y emocionalmente. 
              Encontrarás apoyo real, recursos útiles y una comunidad 
              que te ayuda a vivir con más fuerza y autonomía.
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

        {/* LAYOUT DESKTOP - Imágenes flotantes con texto central superpuesto */}
        <div className="hidden lg:block">
          {/* Imágenes flotantes posicionadas aleatoriamente */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Imagen izquierda - arriba - Mujer deportista de espaldas */}
            <motion.div
              className="absolute top-8 left-8 w-44 h-44 overflow-hidden rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -50, rotate: -12 }}
              animate={shouldAnimateImages ? { opacity: 1, x: 0, rotate: -8 } : { opacity: 0, x: -50, rotate: -12 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
              }}
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              <ImageWithFallback
                src={cambioRealImage}
                alt="Mujer deportista enfocada en su bienestar"
                className="w-full h-full object-cover rounded-xl filter brightness-110 contrast-110"
              />
            </motion.div>

            {/* Imagen derecha - centro - Dos mujeres abrazándose */}
            <motion.div
              className="absolute top-1/2 right-8 w-36 h-48 overflow-hidden transform -translate-y-1/2 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 50, rotate: 15 }}
              animate={shouldAnimateImages ? { opacity: 1, x: 0, rotate: 12 } : { opacity: 0, x: 50, rotate: 15 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.15, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
              }}
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              <ImageWithFallback
                src={artisticImage}
                alt="Mujeres conectadas y felices"
                className="w-full h-full object-cover rounded-xl filter brightness-110 contrast-110"
              />
            </motion.div>

            {/* Imagen izquierda - abajo - Mujer con móvil en sofá */}
            <motion.div
              className="absolute bottom-8 left-32 w-40 h-32 overflow-hidden rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -40, rotate: 8 }}
              animate={shouldAnimateImages ? { opacity: 1, x: 0, rotate: 5 } : { opacity: 0, x: -40, rotate: 8 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
              }}
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              <ImageWithFallback
                src={exerciseImage}
                alt="Mujer usando la plataforma HerSafe"
                className="w-full h-full object-cover rounded-xl filter brightness-110 contrast-110"
              />
            </motion.div>
          </div>

          <motion.div
            ref={headerAnimationRef}
            className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8"
            initial={{ opacity: 0, y: 40 }}
            animate={shouldAnimateHeader ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              {/* Título principal */}
              <motion.h2 
                className="text-4xl lg:text-5xl xl:text-6xl subtitle-font text-white leading-tight tracking-tight uppercase"
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimateHeader ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                TODO LO QUE NECESITAS <br className="hidden lg:block" />EN UNA MISMA PLATAFORMA
              </motion.h2>

              {/* Descripción */}
              <motion.p 
                className="text-lg lg:text-lg xl:text-xl text-white text-font leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimateHeader ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hersafe nace para que cada mujer tenga un espacio seguro <br className="hidden lg:block" />
                donde cuidarse física, mental y emocionalmente. <br />
                Encontrarás apoyo real, recursos útiles y una comunidad <br className="hidden lg:block" />
                que te ayuda a vivir con más fuerza y autonomía.
              </motion.p>

              {/* Línea decorativa azul neón centrada */}
              <motion.div
                className="h-1.5 w-32 lg:w-40 rounded-full mx-auto"
                style={{
                  background: '#0365ff',
                  boxShadow: '0 0 12px rgba(3, 101, 255, 0.8), 0 0 24px rgba(3, 101, 255, 0.4)',
                  transformOrigin: "center"
                }}
                initial={{ scaleX: 0 }}
                animate={shouldAnimateHeader ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Espacio adicional entre sección azul y beneficios */}

      {/* Fluid Creative Layout - Full Section Colored Backgrounds */}
      <div className="space-y-0">
        
        {/* Tercer beneficio - MOVIDO AQUÍ - Full section transparent - MOVIMIENTO IZQUIERDA EN MÓVIL */}
        <section
          className="relative w-full py-2 lg:py-12 px-6 lg:px-8 bg-transparent"
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
                NAVEGA EN LA PRIMERA RED DE MUJERES
              </motion.h3>
            </div>

            {/* Imagen a la izquierda en desktop, segundo en móvil */}
            <div className="w-full lg:flex-1 lg:flex-[1.5] lg:max-w-none relative lg:-ml-8 xl:-ml-12">
              <div className="h-[50vh] lg:h-[88vh] xl:h-[92vh] relative overflow-hidden rounded-xl lg:rounded-none">
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src={apoyoTangibleImage}
                    alt="Entra ya y descubre tu comunidad"
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
                NAVEGA EN LA PRIMERA <br className="hidden lg:block" />RED DE MUJERES
              </motion.h3>
              
              {/* Descripción */}
              <motion.p 
                className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray-200 text-font leading-relaxed lg:leading-relaxed mt-6 lg:mt-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Entra ya y descubre tu comunidad
              </motion.p>

              {/* Botón */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
              >
                {/* Versión MÓVIL */}
                <motion.button
                  onClick={handleUnirmeClick}
                  className="inline-block lg:hidden bg-white text-[#0365ff] border-2 border-[#0365ff] subtitle-font text-sm tracking-wide transition-all duration-300 shadow-xl rounded-lg px-8 py-3 text-center leading-snug whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DESCUBRE HERSAFE
                </motion.button>
                
                {/* Versión DESKTOP */}
                <motion.button
                  onClick={handleUnirmeClick}
                  className="hidden lg:inline-block bg-transparent text-[#0365ff] border-2 border-[#0365ff] subtitle-font text-xl tracking-wide transition-all duration-300 hover:bg-white hover:text-[#0365ff] rounded-lg px-12 py-4 text-center leading-snug whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DESCUBRE HERSAFE
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Banner "¿Qué puedes hacer en HerSafe?" */}
        <section className="relative w-full py-8 lg:py-12 px-6 lg:px-8 pb-0 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Línea decorativa azul neón centrada - ANTES DEL TÍTULO */}
            <motion.div
              className="h-1.5 w-32 lg:w-40 rounded-full mx-auto mb-8 lg:mb-10"
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

            {/* Título centrado */}
            <motion.h2
              className="subtitle-font text-3xl lg:text-4xl xl:text-5xl text-white text-center mb-8 lg:mb-6 uppercase"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
            >
              ¿Qué puedes hacer en HerSafe?
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
                      className="w-full h-full"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          // Intento silencioso de reproducir
                        });
                      }}
                    >
                      <source src="https://i.imgur.com/0cDjmZo.mp4" type="video/mp4" />
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
                      Compartir tu historia
                    </motion.h3>
                  </div>
                </div>
              </div>

              {/* Video 2 */}
              <div className="flex-1 flex flex-col gap-4 lg:gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[50vh] lg:h-screen">
                  <div className="relative w-full h-full bg-black">
                    <video
                      className="w-full h-full"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      style={{ 
                        objectFit: 'cover', 
                        objectPosition: 'center 25%',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          // Intento silencioso de reproducir
                        });
                      }}
                    >
                      <source src="https://i.imgur.com/nwwagCP.mp4" type="video/mp4" />
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
                      Conectar con mujeres 
                    </motion.h3>
                  </div>
                </div>
              </div>

              {/* Video 3 */}
              <div className="flex-1 flex flex-col gap-4 lg:gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[50vh] lg:h-screen">
                  <div className="relative w-full h-full bg-black">
                    <video
                      className="w-full h-full"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          // Intento silencioso de reproducir
                        });
                      }}
                    >
                      <source src="https://i.imgur.com/lB6yWe8.mp4" type="video/mp4" />
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
                      Sentirte segura
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
              @keyframes marquee {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              /* Tablet y Desktop: con animación */
              @media (min-width: 640px) {
                .marquee-content {
                  animation: marquee 60s linear infinite;
                  will-change: transform;
                  justify-content: flex-start;
                  padding: 0;
                }
                
                .marquee-content span {
                  font-size: 1.125rem;
                  white-space: nowrap;
                }
              }
              
              @media (min-width: 1024px) {
                .marquee-content {
                  animation-duration: 25s !important;
                }
                .marquee-content span {
                  font-size: 1.25rem;
                }
                .marquee-section {
                  margin-top: -3rem !important;
                }
              }
            `}</style>
            
            {/* VERSIÓN MÓVIL - Texto estático centrado con negrita */}
            <div className="sm:hidden flex justify-center items-center px-4">
              <span className="subtitle-font text-white tracking-wider text-center" style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.85rem)', lineHeight: '1.3' }}>
                UNA RED DONDE <strong className="font-bold">APRENDER, APOYARTE Y CONSTRUIR</strong> JUNTAS UN LUGAR SEGURO
              </span>
            </div>
            
            {/* VERSIÓN DESKTOP - Animación marquee con texto original */}
            <div className="hidden sm:flex marquee-content">
              <span className="subtitle-font text-white tracking-wider pr-8">
                UNA RED DONDE <strong className="font-bold">APRENDER</strong>, <strong className="font-bold">APOYARTE</strong> EN OTRAS MUJERES Y <strong className="font-bold">CONSTRUIR</strong> JUNTAS UN LUGAR SEGURO •
              </span>
              <span className="subtitle-font text-white tracking-wider pr-8">
                UNA RED DONDE <strong className="font-bold">APRENDER</strong>, <strong className="font-bold">APOYARTE</strong> EN OTRAS MUJERES Y <strong className="font-bold">CONSTRUIR</strong> JUNTAS UN LUGAR SEGURO •
              </span>
              <span className="subtitle-font text-white tracking-wider pr-8">
                UNA RED DONDE <strong className="font-bold">APRENDER</strong>, <strong className="font-bold">APOYARTE</strong> EN OTRAS MUJERES Y <strong className="font-bold">CONSTRUIR</strong> JUNTAS UN LUGAR SEGURO •
              </span>
              <span className="subtitle-font text-white tracking-wider pr-8">
                UNA RED DONDE <strong className="font-bold">APRENDER</strong>, <strong className="font-bold">APOYARTE</strong> EN OTRAS MUJERES Y <strong className="font-bold">CONSTRUIR</strong> JUNTAS UN LUGAR SEGURO •
              </span>
            </div>
          </div>
        </section>

        {/* Segundo beneficio - COMUNIDAD REAL QUE TE ACOMPAÑA - TEXTO ARRIBA, IMAGEN ABAJO */}
        <section
          className="relative w-full py-8 lg:py-12 px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Texto a la derecha en desktop (pegado a la imagen) */}
            <div className="flex-1 text-center lg:text-right px-4 order-1 lg:order-1 flex flex-col justify-center">
              {/* Línea decorativa azul neón centrada en móvil, a la derecha en desktop - ANTES DEL TÍTULO */}
              <motion.div
                className="h-1.5 w-32 lg:w-40 rounded-full mx-auto lg:ml-auto lg:mr-0 mb-6 lg:mb-10"
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
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl subtitle-font text-white mb-4 lg:mb-6 leading-tight uppercase"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                FORMACIÓN DE CALIDAD PARA GANAR SEGURIDAD
              </motion.h3>
              
              <motion.p 
                className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray-200 text-font leading-relaxed mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Contenido práctico para tu seguridad, salud y bienestar. Disfruta de dos formaciones de defensa personal femenina para recuperar confianza y poner lmites desde el primer paso.
              </motion.p>
            </div>

            {/* Imagen a la derecha en desktop */}
            <div className="flex-1 lg:flex-[1.3] max-w-none relative order-2 lg:order-2">
              <div className="h-[60vh] lg:h-[88vh] xl:h-[92vh] relative overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={comunidadImage}
                  alt="Formación de calidad que te impulsa"
                  className="w-full h-full object-contain object-center lg:object-contain lg:object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tercer beneficio - ¿LISTA PARA DAR EL SIGUIENTE PASO? - Full section transparent - IMAGEN Y TEXTO EN PARALELO EN MÓVIL */}
        <section
          className="relative w-full pt-0 lg:pt-4 pb-4 lg:pb-12 px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-7xl mx-auto flex flex-row lg:flex-row items-start lg:items-center gap-6 lg:gap-16">
            {/* Imagen a la izquierda - MUCHO MÁS GRANDE en móvil */}
            <div className="flex-1 lg:flex-[1.5] max-w-none relative -ml-6 lg:-ml-8 xl:-ml-12 benefits-image-left-mobile">
              <div className="h-[60vh] lg:h-[88vh] xl:h-[92vh] relative overflow-visible lg:overflow-hidden flex items-start lg:items-center">
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src={serPioneraImage}
                    alt="¿Lista para dar el siguiente paso?"
                    className="w-full h-full object-contain object-[center_top] lg:object-contain lg:object-center"
                  />
                </div>
              </div>
            </div>

            {/* Texto a la derecha */}
            <div className="flex-1 lg:flex-1 text-left px-4 lg:px-4 flex flex-col justify-start lg:justify-center gap-6 pt-0 lg:pt-0">
              {/* Línea decorativa azul neón centrada - ANTES DEL TÍTULO */}
              <motion.div
                className="h-1.5 w-32 lg:w-40 rounded-full mb-6 self-center"
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
                className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl subtitle-font text-white leading-tight uppercase"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false }}
              >
                ¿LISTA PARA DAR EL SIGUIENTE PASO?
              </motion.h3>
              
              <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-200 text-font leading-relaxed"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Forma parte de la primera red donde mujeres reales se apoyan cada día
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
              >
                {/* Versión MÓVIL */}
                <motion.button
                  onClick={handleUnirmeClick}
                  className="inline-block lg:hidden bg-white text-[#0365ff] border-2 border-[#0365ff] subtitle-font text-sm tracking-wide transition-all duration-300 shadow-xl rounded-lg px-8 py-3 text-center leading-snug whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DESCUBRE HERSAFE
                </motion.button>
                
                {/* Versión DESKTOP */}
                <motion.button
                  onClick={handleUnirmeClick}
                  className="hidden lg:inline-block bg-transparent text-[#0365ff] border-2 border-[#0365ff] subtitle-font text-xl tracking-wide transition-all duration-300 hover:bg-white hover:text-[#0365ff] rounded-lg px-12 py-4 text-center leading-snug whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DESCUBRE HERSAFE
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}