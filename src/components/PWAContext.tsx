import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAContextType {
  promptInstall: () => Promise<{ outcome: 'accepted' | 'dismissed' }>;
  canInstall: boolean;
  isInstalled: boolean;
  isMobile: boolean;
  platform: 'ios' | 'android' | 'desktop';
  showModal: boolean;
  handleUnirmeClick: () => void;
  closeModal: () => void;
  goToApp: () => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export function PWAProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('android');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Detectar si ya está instalado
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isNavigatorStandalone = (window.navigator as any).standalone === true;
      return isStandalone || isNavigatorStandalone;
    };

    setIsInstalled(checkIfInstalled());

    // Detectar plataforma
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobileDevice = isIOS || isAndroid || window.innerWidth <= 768;

    setIsMobile(isMobileDevice);

    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Capturar el evento beforeinstallprompt (solo en Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('📱 PWA: beforeinstallprompt event captured');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detectar cuando la app se instala
    const handleAppInstalled = () => {
      console.log('✅ PWA: App installed');
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
      
      // Redirigir automáticamente a la app después de instalar
      setTimeout(() => {
        window.location.href = 'https://app.wearehersafe.com/auth';
      }, 1000);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      console.log('⚠️ PWA: No deferred prompt available');
      return { outcome: 'dismissed' as const };
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log(`📱 PWA: User choice - ${choiceResult.outcome}`);
      
      setDeferredPrompt(null);
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setShowModal(false);
      }
      
      return choiceResult;
    } catch (error) {
      console.error('❌ PWA: Error prompting install:', error);
      return { outcome: 'dismissed' as const };
    }
  };

  const handleUnirmeClick = () => {
    console.log('🔍 PWA: handleUnirmeClick called', { isMobile, isInstalled, platform });
    
    // Si está instalado o es desktop, ir directamente a la app
    if (isInstalled || !isMobile) {
      window.open('https://app.wearehersafe.com/auth', '_blank');
      return;
    }
    
    // En iOS y Android móviles, mostrar el modal
    if (platform === 'ios' || platform === 'android') {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToApp = () => {
    setShowModal(false);
    window.open('https://app.wearehersafe.com/auth', '_blank');
  };

  return (
    <PWAContext.Provider
      value={{
        promptInstall,
        canInstall: !isInstalled && (platform === 'android' ? !!deferredPrompt : platform === 'ios'),
        isInstalled,
        isMobile,
        platform,
        showModal,
        handleUnirmeClick,
        closeModal,
        goToApp
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWAInstall() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWAInstall must be used within PWAProvider');
  }
  return context;
}