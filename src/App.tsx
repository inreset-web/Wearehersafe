import { lazy, Suspense, memo, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { BenefitsSection } from "./components/BenefitsSection";
import {
  PageLoadingOverlay,
  usePageTransition,
} from "./components/PageTransition";
import { Toaster } from "./components/ui/sonner";
import { SEO } from "./components/SEO";
import { MouseSpotlight } from "./components/MouseSpotlight";
import { PWAProvider, usePWAInstall } from "./components/PWAContext";
import { PWAInstallModal } from "./components/PWAInstallModal";

// Optimización móvil: Precargar componentes críticos inmediatamente
const InstructorsLanding = lazy(
  () => import("./components/InstructorsLandingFixed"),
);
const Footer = lazy(() =>
  import("./components/Footer").then((module) => ({
    default: module.Footer,
  })),
);
const PrivacyPage = lazy(() =>
  import("./components/PrivacyPage").then((module) => ({
    default: module.PrivacyPage,
  })),
);
const TermsPage = lazy(() =>
  import("./components/TermsPage").then((module) => ({
    default: module.TermsPage,
  })),
);

// Componente LoadingSpinner optimizado para móvil
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-[200px] bg-black">
    <div className="w-6 h-6 border-2 border-[#0365ff] border-t-transparent rounded-full animate-spin"></div>
  </div>
));

// Componente interno para manejar rutas con transiciones
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNavigating, navigateWithTransition } = usePageTransition();
  const { showModal, closeModal, handleInstall } = usePWAInstall();

  // 🚀 REDIRECCIÓN AUTOMÁTICA: Si la PWA fue abierta desde el home screen → ir a la app
  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true; // iOS

    if (isStandalone) {
      console.log(
        "📱 PWA detectada en modo standalone → Redirigiendo a app...",
      );
      window.location.href = "https://app.wearehersafe.com/auth";
    }
  }, []);

  // Optimización móvil: Precargar componentes en background
  useEffect(() => {
    // Precargar InstructorsLanding después de que se monte el componente
    const timer = setTimeout(() => {
      import("./components/InstructorsLandingFixed");
      import("./components/Footer");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Determinar la página actual basada en la ubicación
  const isLegalPage = location.pathname.startsWith("/legal/");
  const currentPage =
    location.pathname === "/instructores"
      ? "instructors"
      : "home";

  // Optimización móvil: Transición más rápida y suave con scroll al top
  const handlePageChange = (
    newPage: "home" | "instructors",
  ) => {
    const targetPath =
      newPage === "home" ? "/" : "/instructores";
    const currentPath = location.pathname;

    if (targetPath !== currentPath) {
      // Hacer scroll al top inmediatamente al cambiar de página
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reducir tiempo de transición para móvil
      navigateWithTransition(() => {
        navigate(targetPath);
        // Asegurar que después de la transición también esté en el top
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
        }, 100);
      }, 50);
    } else {
      // Si es la misma página, solo hacer scroll al hero
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Scroll al top cuando cambia la ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className="flex flex-col mobile-optimized mobile-app-container"
      style={{
        backgroundColor: "transparent",
        margin: 0,
        padding: 0,
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        // Optimizaciones de rendimiento móvil
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        // Optimización para Safari iOS
        WebkitOverflowScrolling: "touch",
        // No interferir con navbar fijo
        position: "relative",
        zIndex: 10,
      }}
    >
      {!isLegalPage && (
        <Header
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      )}

      {/* Overlay de transición más sutil */}
      <PageLoadingOverlay isLoading={isNavigating} />

      <main className="relative flex-1 mobile-main">
        <Routes>
          <Route
            path="/"
            element={
              <div className="page-content">
                <SEO
                  title="HerSafe - Seguridad, salud y bienestar, unidos por primera vez"
                  description="La primera plataforma digital dirigida a mujeres que combina seguridad, salud y bienestar. Accede a contenido exclusivo, clases con profesionales expertos y únete a nuestra comunidad."
                  canonical="https://wearehersafe.com/"
                />
                <HeroSection
                  title="LA PRIMERA RED DE MUJERES"
                  description={
                    <>
                      Un espacio seguro para compartir, conectar
                      y crecer juntas
                      <br />
                      Contenido y Formación de calidad en Seguridad, Salud y Bienestar
                    </>
                  }
                  buttons={[
                    {
                      text: "UNIRME",
                      onClick: () => {
                        window.open(
                          "https://app.wearehersafe.com/auth",
                          "_blank",
                        );
                      },
                      variant: "primary",
                    },
                  ]}
                  id="inicio"
                />
                <BenefitsSection />
                <div className="pb-4 lg:pb-24" />
              </div>
            }
          />
          <Route
            path="/instructores"
            element={
              <div className="page-content">
                <SEO
                  title="Únete como Instructora - HerSafe"
                  description="Forma parte de HerSafe como instructora. Comparte tu conocimiento en bienestar, salud y seguridad con una comunidad de mujeres. Aplica ahora y comienza a impactar vidas."
                  canonical="https://wearehersafe.com/instructores"
                />
                <Suspense fallback={<LoadingSpinner />}>
                  <InstructorsLanding />
                </Suspense>
                <div className="pb-4 lg:pb-24" />
              </div>
            }
          />
          <Route
            path="/legal/privacidad"
            element={
              <div className="page-content">
                <SEO
                  title="Política de Privacidad - HerSafe"
                  description="Conoce cómo HerSafe protege tu información personal y tus datos. Lee nuestra política de privacidad completa."
                  canonical="https://wearehersafe.com/legal/privacidad"
                />
                <Suspense fallback={<LoadingSpinner />}>
                  <PrivacyPage />
                </Suspense>
              </div>
            }
          />
          <Route
            path="/legal/terminos"
            element={
              <div className="page-content">
                <SEO
                  title="Términos y Condiciones - HerSafe"
                  description="Lee los términos y condiciones de uso de la plataforma HerSafe. Conoce tus derechos y responsabilidades."
                  canonical="https://wearehersafe.com/legal/terminos"
                />
                <Suspense fallback={<LoadingSpinner />}>
                  <TermsPage />
                </Suspense>
              </div>
            }
          />
          {/* Ruta catch-all para manejar preview_page.html y cualquier otra ruta no encontrada */}
          <Route
            path="*"
            element={
              <div className="page-content">
                <HeroSection
                  title="LA PRIMERA RED DE MUJERES"
                  description={
                    <>
                      Un espacio seguro para compartir, conectar
                      y crecer juntas
                      <br />
                      Contenido y Formación de calidad en Seguridad, Salud y Bienestar
                    </>
                  }
                  buttons={[
                    {
                      text: "UNIRME",
                      onClick: () => {
                        window.open(
                          "https://app.wearehersafe.com/auth",
                          "_blank",
                        );
                      },
                      variant: "primary",
                    },
                  ]}
                  id="inicio"
                />
                <BenefitsSection />
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer con carga diferida */}
      <Suspense
        fallback={
          <div
            style={{
              height: "1px",
              backgroundColor: "#000000",
            }}
          />
        }
      >
        <Footer />
      </Suspense>

      {/* Toaster optimizado para móvil */}
      <Toaster
        position="top-center"
        expand={false}
        richColors={false}
        closeButton={true}
        theme="dark"
        visibleToasts={1}
        toastOptions={{
          style: {
            background: "rgba(17, 24, 39, 0.95)",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "16px",
            color: "#f9fafb",
            maxWidth: "90vw",
          },
          className: "toaster-mobile-optimized",
          duration: 4000, // Duración fija para mejor UX móvil
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <PWAProvider>
      <PWAInstallModal />
      <BrowserRouter>
        {/* Efecto de spotlight que sigue el mouse */}
        <MouseSpotlight />
        <AppContent />
      </BrowserRouter>
    </PWAProvider>
  );
}