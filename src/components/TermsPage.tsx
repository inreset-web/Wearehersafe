import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function TermsPage() {
  // Asegurar que la página empiece desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Container principal */}
      <div className="max-w-4xl mx-auto py-8 lg:py-12 px-6 lg:px-8">
        
        {/* Header con logo y título */}
        <motion.div
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <motion.h1 
              className="text-4xl lg:text-5xl balhattan-font text-white mb-4 cursor-pointer"
              whileHover={{ color: "#0365ff" }}
              transition={{ duration: 0.3 }}
            >
              HERSAFE
            </motion.h1>
          </Link>
          <motion.div
            className="w-20 h-1.5 bg-[#0365ff] mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div
            className="w-5 h-0.5 bg-[#ff9e03] mx-auto mt-0.5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </motion.div>

        {/* Contenido del documento */}
        <motion.div
          className="space-y-6 text-white text-font"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Título principal */}
          <div className="text-center mb-8">
            <h1 className="subtitle-font text-white mb-2">Términos y Condiciones de Uso – <span className="balhattan-font">HERSAFE</span></h1>
            <p className="text-gray-400">Última actualización: Octubre 2025</p>
          </div>

          {/* Sección 1 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">1. Titularidad</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe es una aplicación titularidad de IN RESET Universe S.L. (CIF B56674815), con domicilio en Eduardo Boscá 26, 32 – 46023 Valencia (España).
            </p>
          </div>

          {/* Sección 2 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">2. Objeto</h3>
            <p className="text-gray-300 leading-relaxed">
              Estos Términos regulan el acceso, uso y funcionamiento de la app HerSafe, que actúa como plataforma intermediaria entre usuarias y profesionales de seguridad, salud y bienestar de la mujer.
            </p>
          </div>

          {/* Sección 3 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">3. Registro y uso</h3>
            <p className="text-gray-300 leading-relaxed">
              El registro es gratuito e implica la aceptación de estos Términos y de la Política de Privacidad. HerSafe puede suspender o cancelar cuentas que infrinjan las normas.
            </p>
          </div>

          {/* Sección 4 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">4. Tipos de usuario</h3>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li><span className="subtitle-font text-white">Freemium:</span> acceso gratuito a comunidad general y compra de cursos individuales.</li>
              <li><span className="subtitle-font text-white">Premium (18 €/mes):</span> acceso a comunidad premium, contenidos exclusivos y primeros cursos gratuitos.</li>
              <li><span className="subtitle-font text-white">Profesionales:</span> ofrecen cursos y servicios previa validación por HerSafe.</li>
            </ul>
          </div>

          {/* Sección 5 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">5. Aprobación y relación con los profesionales</h3>
            <p className="text-gray-300 leading-relaxed">
              La solicitud de alta será revisada por IN RESET Universe S.L., que podrá aprobar o rechazar la candidatura. La aprobación no genera relación laboral, sino colaboración comercial digital regida por estos Términos. Cada profesional es responsable de sus obligaciones fiscales.
            </p>
          </div>

          {/* Sección 6 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">6. Pagos, devoluciones y retiros</h3>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>La clienta dispone de 3 días para solicitar devolución.</li>
              <li>El profesional recibe el 60 % del beneficio neto 4 días después de la compra.</li>
              <li>HerSafe retiene el 40 % restante en concepto de comisión y gestión.</li>
              <li>Los profesionales pueden retirar ganancias desde 10 €.</li>
              <li>En caso de expulsión, HerSafe liquidará los importes generados hasta la fecha; no procede compensación adicional.</li>
            </ul>
            
            <div className="mt-4 space-y-2">
              <p className="subtitle-font text-white">6.1. Política de precios según tipo de cuenta (Freemium / Premium)</p>
              <ul className="list-disc pl-8 space-y-2 text-gray-300">
                <li>El precio definido por cada Profesional para una formación o curso se considera el precio base de referencia en HerSafe.</li>
                <li>Las Usuarias Premium pueden acceder a ese contenido con condiciones preferentes (por ejemplo, descuentos aplicados a su membresía). El importe final que paga una Usuaria Premium tras dicho descuento equivale al precio base fijado por el Profesional.</li>
                <li>Para las Usuarias Freemium, HerSafe podrá mostrar un precio superior al precio base. Ese incremento refleja las ventajas asociadas a la cuenta Premium y garantiza la rentabilidad del Profesional.</li>
                <li>El Profesional percibe su beneficio económico sobre el precio base fijado por él/ella. Las ventas realizadas a Usuarias Freemium pueden generar un beneficio adicional para el Profesional proporcional al incremento aplicado.</li>
                <li>HerSafe se reserva el derecho de actualizar estas condiciones y comunicar dichas actualizaciones dentro de la propia plataforma.</li>
              </ul>
            </div>
          </div>

          {/* Sección 7 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">7. Creación y fases de cursos</h3>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li><span className="subtitle-font text-white">Fase 1 (Lead Magnet):</span> gratuita para Premium, de pago reducido para Freemium.</li>
              <li><span className="subtitle-font text-white">Fase 2 y 3:</span> cursos de pago con estructura mínima de 7 módulos y 4 vídeos por módulo. HerSafe puede revisar, modificar o rechazar contenidos que no cumplan los estándares.</li>
            </ul>
            
            <div className="mt-4 space-y-2">
              <p className="subtitle-font text-white">7.1. Lead Magnet asociado a cada curso</p>
              <p className="text-gray-300 leading-relaxed">
                Cada curso completo publicado por un Profesional en HerSafe deberá incluir un Lead Magnet asociado. El Lead Magnet es una versión introductoria o contenido base cuyo objetivo es facilitar la adquisición del curso completo por parte de las usuarias.
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-300">
                <li>El Lead Magnet será gratuito para las Usuarias Premium de HerSafe.</li>
                <li>Las Usuarias Freemium podrán adquirir el Lead Magnet a un precio reducido fijado por la/el Profesional dentro de los márgenes establecidos por HerSafe. Los ingresos generados por dicha compra se reparten conforme al modelo económico aplicable (actualmente 60 % Profesional / 40 % HerSafe).</li>
                <li>Las Usuarias Freemium podrán visualizar únicamente una parte inicial del Lead Magnet (por ejemplo, los primeros vídeos) antes de la compra, como material de muestra.</li>
                <li>El Lead Magnet forma parte de la estrategia comercial interna de HerSafe y es condición para la publicación de cursos completos dentro de la plataforma.</li>
              </ul>
            </div>
          </div>

          {/* Sección 8 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">8. Publicación y contenido semanal</h3>
            <p className="text-gray-300 leading-relaxed">
              Cada profesional debe publicar al menos un vídeo orgánico semanal en su perfil. El incumplimiento reiterado podrá implicar advertencia o suspensión.
            </p>
          </div>

          {/* Sección 9 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">9. Valoraciones y reputación</h3>
            <p className="text-gray-300 leading-relaxed">
              Las usuarias pueden valorar cursos (de 1 a 5 estrellas). Profesionales con 2 estrellas o menos durante 6 meses podrán ser dados de baja.
            </p>
          </div>

          {/* Sección 10 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">10. Propiedad intelectual</h3>
            <p className="text-gray-300 leading-relaxed">
              El contenido pertenece al profesional. HerSafe obtiene una licencia mundial, no exclusiva y gratuita para alojar, reproducir y promocionar dicho contenido.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Durante el MVP, no hay exclusividad, pero:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>No podrán vender fuera de HerSafe a nuestras usuarias.</li>
              <li>No podrán ofrecer precios inferiores en otras plataformas.</li>
              <li>HerSafe podrá usar fragmentos, imágenes o descripciones con fines promocionales.</li>
            </ul>
          </div>

          {/* Sección 11 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">11. Colaboración en eventos presenciales</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe podrá invitar a profesionales a participar en eventos presenciales remunerados. Se cubrirán dietas o gastos razonables. No existe relación laboral. HerSafe podrá usar imágenes o grabaciones generadas durante los eventos con fines de promoción, garantizando un uso adecuado de la imagen y del contenido del profesional.
            </p>
          </div>

          {/* Sección 12 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">12. Moderación y sanciones</h3>
            <p className="text-gray-300 leading-relaxed">
              Prohibido el acoso, discriminación o contenido ofensivo. Tres advertencias → suspensión temporal. Faltas graves → expulsión inmediata.
            </p>
          </div>

          {/* Sección 13 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">13. Gestión de pagos y fiscalidad</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe gestiona las ventas, cobros, pagos y fiscalidad. Usa PayPal y Stripe, y podrá añadir otros métodos seguros para usuarias y profesionales, garantizando trazabilidad y seguridad financiera.
            </p>
          </div>

          {/* Sección 14 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">14. Limitación de responsabilidad</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe no garantiza servicio ininterrumpido ni se responsabiliza de daños derivados del uso de la app o de los contenidos de los profesionales.
            </p>
          </div>

          {/* Sección 15 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">15. Edad mínima</h3>
            <p className="text-gray-300 leading-relaxed">
              Uso restringido a mayores de 16 años.
            </p>
          </div>

          {/* Sección 16 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">16. Legislación y jurisdicción</h3>
            <p className="text-gray-300 leading-relaxed">
              Regido por la legislación española. Cualquier disputa se resolverá ante los tribunales de Valencia (España).
            </p>
          </div>

          {/* Sección 17 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">17. Normas de uso de la comunidad y red social interna</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe incluye una red social privada donde las usuarias pueden interactuar, compartir experiencias y acceder a contenidos de valor publicados por los profesionales. Con el fin de mantener un entorno seguro, constructivo y alineado con los valores de la plataforma, se establecen las siguientes normas de uso:
            </p>
            
            <div className="space-y-3 mt-3">
              <div>
                <p className="subtitle-font text-white mb-2">Prohibición de promoción personal o comercial:</p>
                <p className="text-gray-300 leading-relaxed">
                  Las usuarias no podrán promocionar, publicitar ni difundir contenidos con fines comerciales, personales o de autopromoción, incluidos productos, servicios, cursos, empresas, eventos o cualquier otro contenido ajeno a la finalidad de HerSafe.
                </p>
              </div>

              <div>
                <p className="subtitle-font text-white mb-2">Prohibición de captación externa:</p>
                <p className="text-gray-300 leading-relaxed">
                  No está permitido contactar, redirigir o intentar llevar a otras usuarias o profesionales fuera de la plataforma, ya sea mediante enlaces, redes sociales, páginas web, mensajería o cualquier otro medio externo.
                </p>
              </div>

              <div>
                <p className="subtitle-font text-white mb-2">Acceso según tipo de cuenta:</p>
                <ul className="list-disc pl-8 space-y-2 text-gray-300">
                  <li>Las usuarias freemium podrán visualizar únicamente los tres primeros vídeos de cada profesional y sus stories.</li>
                  <li>Las usuarias premium tendrán acceso completo al contenido de los profesionales y a la comunidad privada donde se comparten materiales exclusivos y vídeos de valor.</li>
                </ul>
              </div>

              <div>
                <p className="subtitle-font text-white mb-2">Profesionalización:</p>
                <p className="text-gray-300 leading-relaxed">
                  Las cuentas personales de usuarias no pueden utilizar la red social interna de HerSafe como canal de venta, promoción o captación comercial, ni redirigir a otras usuarias hacia servicios, productos o plataformas externas. Para realizar cualquier actividad con fines comerciales o promocionales dentro de la plataforma será obligatorio disponer de una cuenta Profesional (perfil Business), cuya solicitud deberá ser aprobada por HerSafe y sujeta a los términos específicos de colaboración profesional.
                </p>
              </div>

              <div>
                <p className="subtitle-font text-white mb-2">Moderación:</p>
                <p className="text-gray-300 leading-relaxed">
                  HerSafe podrá revisar, ocultar o eliminar publicaciones que incumplan estas normas o sean contrarias a los valores de la comunidad, pudiendo suspender o eliminar la cuenta de la usuaria en caso de infracción reiterada.
                </p>
              </div>
            </div>
          </div>

          {/* Footer del documento */}
          <div className="text-center mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-2">📩 Contacto: soporte@wearehersafe.com</p>
            <p className="text-gray-500 text-sm">
              © IN RESET UNIVERSE S.L. — Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Documento legal actualizado en octubre 2025.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
