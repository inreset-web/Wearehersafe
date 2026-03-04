import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function PrivacyPage() {
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
            <h1 className="subtitle-font text-white mb-2">Política de Privacidad – <span className="balhattan-font">HERSAFE</span></h1>
            <p className="text-gray-400">Última actualización: Octubre 2025</p>
          </div>

          {/* Sección 1 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">1. Responsable del tratamiento</h3>
            <p className="text-gray-300 leading-relaxed">
              De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa que la entidad responsable del tratamiento de los datos personales es:
            </p>
            <div className="pl-4 space-y-1 text-gray-300">
              <p>IN RESET UNIVERSE S.L.</p>
              <p>CIF: B56674815</p>
              <p>Domicilio: Eduardo Boscá 26, 32 – 46023 Valencia (España)</p>
              <p>Correo electrónico: soporte@wearehersafe.com</p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              HerSafe es una aplicación y producto digital titularidad de IN RESET UNIVERSE S.L., que permite a las mujeres acceder a contenidos de seguridad, salud y bienestar, así como conectar con profesionales y otras usuarias en un entorno seguro.
            </p>
          </div>

          {/* Sección 2 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">2. Datos personales que se recogen</h3>
            <p className="text-gray-300 leading-relaxed">HerSafe recopila y trata los siguientes datos personales:</p>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Datos de identificación: nombre, apellidos, correo electrónico.</li>
              <li>Datos de acceso: contraseña o credenciales de inicio de sesión.</li>
              <li>Datos de perfil: foto, biografía, intereses y preferencias.</li>
              <li>Geolocalización (si el usuario lo autoriza).</li>
              <li>Datos de pago y facturación (procesados mediante PayPal o Stripe).</li>
              <li>Mensajes, publicaciones o comentarios dentro de la comunidad.</li>
              <li>Datos técnicos del dispositivo (IP, cookies, analítica, fallos).</li>
            </ul>
          </div>

          {/* Sección 3 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">3. Finalidades del tratamiento</h3>
            <p className="text-gray-300 leading-relaxed">Los datos personales se utilizan para:</p>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Gestionar el registro, acceso y uso de la app.</li>
              <li>Permitir la compra y gestión de cursos, membresías y servicios.</li>
              <li>Gestionar pagos, devoluciones y beneficios a profesionales.</li>
              <li>Mantener la seguridad y moderación de la comunidad.</li>
            </ul>
            <div className="mt-3 space-y-2">
              <p className="text-gray-300 subtitle-font">Control y moderación de la comunidad:</p>
              <p className="text-gray-300 leading-relaxed">
                HerSafe podrá aplicar sistemas de moderación, tanto automáticos como manuales, en su red social interna con el fin de mantener un entorno seguro, respetuoso y libre de autopromoción o contenidos comerciales no autorizados.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Los mensajes o publicaciones que vulneren las normas de uso o intenten redirigir a usuarias fuera de la plataforma podrán ser revisados y eliminados por el equipo de HerSafe, garantizando el cumplimiento de las políticas de la comunidad.
              </p>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Mejorar la experiencia del usuario y funcionamiento técnico (interés legítimo).</li>
              <li>Enviar comunicaciones informativas o promocionales (previo consentimiento).</li>
            </ul>
          </div>

          {/* Sección 4 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">4. Base jurídica del tratamiento</h3>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Ejecución de un contrato (uso de la app y compra de servicios).</li>
              <li>Cumplimiento de obligaciones legales (fiscales y de facturación).</li>
              <li>Interés legítimo (seguridad, mejora y soporte técnico).</li>
              <li>Consentimiento expreso (en comunicaciones comerciales o geolocalización).</li>
            </ul>
          </div>

          {/* Sección 5 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">5. Gestión de pagos y fiscalidad</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe actúa como intermediaria en la gestión económica de las operaciones entre usuarias y profesionales. IN RESET Universe S.L. procesa los pagos, devoluciones y liquidaciones correspondientes, incluyendo el IVA conforme a la legislación española.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Los pagos se realizan mediante PayPal y Stripe, que cumplen con los estándares internacionales de seguridad (PCI DSS). HerSafe podrá incorporar progresivamente otros métodos de pago seguros para facilitar las transacciones de usuarias y profesionales, garantizando la trazabilidad, transparencia y protección de los datos financieros.
            </p>
          </div>

          {/* Sección 6 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">6. Comunicación y cesión de datos</h3>
            <p className="text-gray-300 leading-relaxed">Los datos podrán comunicarse a:</p>
            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Entidades financieras (PayPal, Stripe) para procesar pagos.</li>
              <li>Profesionales cuando la usuaria contrate sus cursos o servicios.</li>
              <li>Proveedores tecnológicos (hosting, analítica, mensajería).</li>
              <li>Autoridades públicas, cuando lo exija la ley.</li>
            </ul>
          </div>

          {/* Sección 7 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">7. Conservación de datos</h3>
            <p className="text-gray-300 leading-relaxed">
              Los datos se conservarán mientras la cuenta esté activa o durante un máximo de 24 meses tras la baja, para cumplir obligaciones legales o de seguridad.
            </p>
          </div>

          {/* Sección 8 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">8. Derechos del usuario</h3>
            <p className="text-gray-300 leading-relaxed">
              Las usuarias pueden ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando solicitud a:
            </p>
            <p className="text-gray-300 pl-4">📩 soporte@wearehersafe.com</p>
            <p className="text-gray-300 leading-relaxed">
              También pueden reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).
            </p>
          </div>

          {/* Sección 9 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">9. Seguridad</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe aplica medidas técnicas y organizativas para proteger los datos personales frente a pérdida, acceso no autorizado o alteración. La app se desarrolla bajo los principios de privacidad por diseño y por defecto.
            </p>
          </div>

          {/* Sección 10 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">10. Cookies y analítica</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe utiliza cookies y herramientas de analítica (Google Analytics, Firebase) para mejorar la experiencia. El usuario puede configurar o rechazar las cookies desde su dispositivo.
            </p>
          </div>

          {/* Sección 11 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">11. Publicidad</h3>
            <p className="text-gray-300 leading-relaxed">
              Actualmente HerSafe no muestra anuncios de terceros. En el futuro podrá incluir espacios publicitarios de profesionales, empresas o patrocinadores, respetando siempre la privacidad y el consentimiento del usuario.
            </p>
          </div>

          {/* Sección 12 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">12. Edad mínima</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe está dirigida a mujeres mayores de 16 años, por incluir comunidad e interacción entre usuarias. El registro de menores de 16 años está prohibido.
            </p>
          </div>

          {/* Sección 13 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">13. Modificaciones</h3>
            <p className="text-gray-300 leading-relaxed">
              HerSafe podrá actualizar esta Política de Privacidad para adaptarla a cambios legales o técnicos. La versión vigente estará siempre disponible en la web y la app.
            </p>
          </div>

          {/* Sección 14 */}
          <div className="space-y-3">
            <h3 className="subtitle-font text-white">14. Contacto</h3>
            <p className="text-gray-300 leading-relaxed">
              Para dudas sobre privacidad o protección de datos:
            </p>
            <p className="text-gray-300 pl-4">📩 Contacto: soporte@wearehersafe.com</p>
          </div>

          {/* Footer del documento */}
          <div className="text-center mt-12 pt-8 border-t border-gray-800">
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
