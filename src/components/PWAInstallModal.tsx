import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Share } from "lucide-react";
import herSafeBlue from "figma:asset/22c729ee4b8ba6a5c1d8769ee53a00771fab679e.png";
import { usePWAInstall } from "./PWAContext";

// Obtener o crear el contenedor modal-root
let modalRoot: HTMLElement | null = null;

function getModalRoot() {
  if (!modalRoot) {
    modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }
  }
  return modalRoot;
}

export function PWAInstallModal() {
  const { showModal, closeModal, goToApp, promptInstall } = usePWAInstall();
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('android');
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Detectar plataforma
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }
  }, []);

  const handleInstallClick = () => {
    if (platform === 'ios') {
      // Mostrar instrucciones para iOS
      setShowInstructions(true);
    } else if (platform === 'android') {
      // Disparar prompt nativo de Android
      promptInstall();
      // Cerrar el modal después de disparar el prompt
      setTimeout(() => {
        closeModal();
      }, 300);
    }
  };

  // Resetear al cerrar
  useEffect(() => {
    if (!showModal) {
      setShowInstructions(false);
    }
  }, [showModal]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (showModal) {
      // Guardar posición actual para restaurar al cerrar
      const savedScrollY = window.scrollY;
      
      // Scroll al top para que el modal sea visible
      // (position:fixed no funciona correctamente en el iframe de Figma)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Bloquear scroll mediante event listeners (no CSS overflow)
      // Pequeño delay para que el smooth scroll termine antes de bloquear
      const timeoutId = setTimeout(() => {
        const preventScroll = (e: Event) => {
          e.preventDefault();
        };
        const preventKeys = (e: KeyboardEvent) => {
          const scrollKeys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'];
          if (scrollKeys.includes(e.code)) {
            e.preventDefault();
          }
        };
        
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventKeys, { passive: false });
        
        // Guardar refs para cleanup
        (window as any).__pwaScrollCleanup = { preventScroll, preventKeys };
      }, 400);
      
      return () => {
        clearTimeout(timeoutId);
        const cleanup = (window as any).__pwaScrollCleanup;
        if (cleanup) {
          window.removeEventListener('wheel', cleanup.preventScroll);
          window.removeEventListener('touchmove', cleanup.preventScroll);
          window.removeEventListener('keydown', cleanup.preventKeys);
          delete (window as any).__pwaScrollCleanup;
        }
        // Restaurar posición de scroll al cerrar
        window.scrollTo(0, savedScrollY);
      };
    }
  }, [showModal]);

  if (!showModal) return null;

  const modalContent = (
    <AnimatePresence>
      {showModal && (
        <div
          style={{
            pointerEvents: 'auto',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999999,
          }}
        >
          {/* Overlay oscuro con backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal centrado con flexbox - sin transform translate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: 'calc(100% - 32px)',
              maxWidth: '420px',
              maxHeight: '90vh',
              maxHeight: '90dvh',
              backgroundColor: '#0365ff',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
              zIndex: 2,
              overflow: 'auto',
              fontFamily: 'inherit',
              margin: '16px',
            }}
          >
            {/* Botón cerrar X */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                color: 'rgba(255, 255, 255, 0.8)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
              aria-label="Cerrar"
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            {!showInstructions ? (
              // Vista inicial
              <div style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
                {/* Logo/Icono HerSafe */}
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                  <div 
                    style={{
                      padding: '16px 24px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(255, 255, 255, 0.25)'
                    }}
                  >
                    <img 
                      src={herSafeBlue} 
                      alt="HerSafe" 
                      style={{ 
                        height: '42px', 
                        width: 'auto',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                </div>

                {/* Título */}
                <h2 
                  style={{ 
                    color: 'white',
                    fontSize: 'clamp(22px, 5.5vw, 26px)',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    lineHeight: '1.2'
                  }}
                >
                  Lleva <span style={{ fontFamily: "'Balhattan', sans-serif" }}>HerSafe</span> contigo
                </h2>

                {/* Descripción */}
                <p 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 'clamp(15px, 4vw, 17px)',
                    marginBottom: '32px',
                    lineHeight: '1.5',
                    fontFamily: "'Darker Grotesque', sans-serif"
                  }}
                >
                  Accede a tu comunidad con un solo toque desde tu pantalla de inicio
                </p>

                {/* Botones */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Botón principal: Añadir a mi móvil */}
                  <button
                    onClick={handleInstallClick}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      backgroundColor: 'white',
                      color: '#0365ff',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: 'clamp(15px, 4vw, 16px)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: '0.5px',
                      transition: 'all 0.2s',
                      textTransform: 'uppercase',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Download size={20} strokeWidth={2.5} />
                    Añadir a mi móvil
                  </button>

                  {/* Botón secundario: Ahora no */}
                  <button
                    onClick={goToApp}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: 'clamp(15px, 4vw, 16px)',
                      cursor: 'pointer',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: '0.5px',
                      transition: 'all 0.2s',
                      textTransform: 'uppercase',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                  >
                    Ahora no
                  </button>
                </div>
              </div>
            ) : (
              // Vista de instrucciones iOS
              <div style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
                {/* Título */}
                <h2 
                  style={{ 
                    color: 'white',
                    fontSize: 'clamp(22px, 5.5vw, 26px)',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700
                  }}
                >
                  Cómo instalar en iPhone
                </h2>

                {/* Instrucciones */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '14px',
                      fontFamily: "'Barlow Condensed', sans-serif"
                    }}>
                      1
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontFamily: "'Darker Grotesque', sans-serif", fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                      <p style={{ margin: 0, lineHeight: '1.5' }}>
                        Toca el botón <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '6px', margin: '0 4px', verticalAlign: 'middle' }}><Share size={14} /></span> en la barra inferior
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '14px',
                      fontFamily: "'Barlow Condensed', sans-serif"
                    }}>
                      2
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontFamily: "'Darker Grotesque', sans-serif", fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                      <p style={{ margin: 0, lineHeight: '1.5' }}>
                        Desplázate y selecciona <strong style={{ color: 'white' }}>"Añadir a la pantalla de inicio"</strong>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '14px',
                      fontFamily: "'Barlow Condensed', sans-serif"
                    }}>
                      3
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontFamily: "'Darker Grotesque', sans-serif", fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                      <p style={{ margin: 0, lineHeight: '1.5' }}>
                        Confirma con <strong style={{ color: 'white' }}>"Añadir"</strong> y ¡listo!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ilustración simple */}
                <div style={{ 
                  marginBottom: '28px', 
                  padding: '24px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '12px', 
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <Share size={28} style={{ color: 'white' }} strokeWidth={2} />
                    <span style={{ color: 'white', fontSize: '20px' }}>→</span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Download size={28} style={{ color: 'white', marginBottom: '4px' }} strokeWidth={2} />
                      <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontFamily: "'Darker Grotesque', sans-serif" }}>
                        Añadir a inicio
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botón entendido */}
                <button
                  onClick={closeModal}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    backgroundColor: 'white',
                    color: '#0365ff',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: 'clamp(15px, 4vw, 16px)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Entendido
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, getModalRoot());
}