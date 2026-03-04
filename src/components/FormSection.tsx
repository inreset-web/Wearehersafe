import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { submitFormData, validateFormData, type FormSubmissionData } from "./FormSubmitService";

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
        opacity: [1, 0.3, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-2xl sm:text-3xl lg:text-4xl text-[#ff9e03]">:</span>
    </motion.div>
  );

  return (
    <motion.div
      className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-8"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
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
function FormInline() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    const submissionData: FormSubmissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      source: 'Formulario Principal HerSafe'
    };

    const validation = validateFormData(submissionData);
    if (!validation.isValid) {
      toast.error(validation.errors.join(', '), {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    setIsSubmitting(true);

    const result = await submitFormData(submissionData);

    if (result.success) {
      setShowSuccessMessage(true);
      setFormData({ name: '', email: '', phone: '' });
      
      toast.success('¡Bienvenida a HerSafe! 🎉', {
        description: 'Te hemos enviado un email de confirmación.',
        duration: 5000,
        position: 'top-center',
      });

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 8000);
    } else {
      toast.error('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.', {
        duration: 4000,
        position: 'top-center',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto lg:mx-0 space-y-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {showSuccessMessage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0365ff]/10 border border-[#0365ff]/30 rounded-xl p-6 text-center"
        >
          <div className="text-4xl mb-3">🎉</div>
          <h4 className="subtitle-font text-white text-xl mb-2">¡Bienvenida a HerSafe!</h4>
          <p className="text-font text-white/80 text-sm">
            Te hemos enviado un email de confirmación. Revisa tu bandeja de entrada.
          </p>
        </motion.div>
      ) : (
        <>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0365ff] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-font"
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0365ff] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-font"
            />
          </div>
          
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono (opcional)"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0365ff] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-font"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0365ff] hover:bg-[#0252cc] text-white py-3 px-6 rounded-lg subtitle-font text-lg tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'ENVIANDO...' : 'UNIRME A LA LISTA'}
          </motion.button>

          <motion.p
            className="text-xs text-white/60 text-center text-font leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Al unirte, aceptas recibir comunicaciones de HerSafe. Puedes darte de baja en cualquier momento.
          </motion.p>
        </>
      )}
    </motion.form>
  );
}

export function FormSection() {
  return (
    <section
      id="formulario-hersafe"
      data-scroll-target="formulario"
      className="formulario-hersafe-section relative w-full bg-black py-8 lg:py-12 px-6 lg:px-8 pb-20 lg:pb-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texto principal - Lado izquierdo - CENTRADO */}
          <div className="text-center">
            <motion.h3 
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl subtitle-font text-white mb-4 lg:mb-6 leading-tight uppercase"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              No te pierdas el lanzamiento
            </motion.h3>
            
            {/* Contador regresivo */}
            <CountdownTimer />
            
            <motion.p 
              className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl text-white text-font leading-relaxed max-w-lg mb-6 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Únete a la lista de espera y serás la primera en poder descargar la aplicación y entrar desde la web.
            </motion.p>
            
            {/* Línea decorativa - CENTRADA - ENTRE LAS DOS FRASES */}
            <motion.div
              className="w-20 h-1 mb-6 mx-auto rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.15)'
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              viewport={{ once: true }}
            />

            <motion.p 
              className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl text-white text-font leading-relaxed max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="balhattan-font text-[#ff9e03] tracking-wider">HerSafe</span> empieza aquí.
            </motion.p>
          </div>

          {/* Formulario - Lado derecho */}
          <div className="lg:pl-8">
            <FormInline />
          </div>
        </div>
      </div>
    </section>
  );
}