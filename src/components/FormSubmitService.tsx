/**
 * HerSafe - Sistema de Envío de Formularios Múltiple
 * Envío dual: Email directo + EmailOctopus con múltiples fallbacks
 */

export interface FormSubmissionData {
  nombreCompleto: string;
  email: string;
  especialidad?: string;
  telefono?: string;
  pais?: string;
  // Campos adicionales que se puedan necesitar
  [key: string]: string | undefined;
}

export interface FormSubmissionConfig {
  type: 'instructors' | 'inicio';
  emailOctopusListId: string;
  emailOctopusSubmitUrl: string;
  emailOctopusScriptUrl: string;
}

// Configuraciones para cada tipo de formulario
export const FORM_CONFIGS: Record<string, FormSubmissionConfig> = {
  instructors: {
    type: 'instructors',
    emailOctopusListId: '6c1a800a-82b1-11f0-a2d0-cb822fef4ab4',
    emailOctopusSubmitUrl: 'https://eocampaign1.com/submit/6c1a800a-82b1-11f0-a2d0-cb822fef4ab4',
    emailOctopusScriptUrl: 'https://eocampaign1.com/form/6c1a800a-82b1-11f0-a2d0-cb822fef4ab4.js'
  },
  inicio: {
    type: 'inicio',
    emailOctopusListId: 'cb4a7ce4-84c1-11f0-b60b-89adf7c83df4',
    emailOctopusSubmitUrl: 'https://eocampaign1.com/submit/cb4a7ce4-84c1-11f0-b60b-89adf7c83df4',
    emailOctopusScriptUrl: 'https://eocampaign1.com/form/cb4a7ce4-84c1-11f0-b60b-89adf7c83df4.js'
  }
};

// Email principal de contacto
const MAIN_EMAIL = 'colaboraciones.wearehersafe@gmail.com';

/**
 * Método Principal - FormSubmit
 */
async function submitViaFormSubmit(data: FormSubmissionData, config: FormSubmissionConfig): Promise<boolean> {
  try {
    console.log('📤 FormSubmit: Preparando datos...');
    const formData = new FormData();
    
    // Campos básicos
    formData.append('name', data.nombreCompleto);
    formData.append('email', data.email);
    
    // Campos específicos por tipo
    if (config.type === 'instructors') {
      formData.append('especialidad', data.especialidad || '');
      formData.append('telefono', data.telefono || '');
      formData.append('_subject', `Nueva Instructora Interesada - ${data.nombreCompleto}`);
      formData.append('message', `Nombre: ${data.nombreCompleto}\nEspecialidad: ${data.especialidad}\nEmail: ${data.email}\nTeléfono: ${data.telefono || 'No proporcionado'}\n\nTipo: Solicitud de Instructora`);
    } else {
      formData.append('pais', data.pais || '');
      formData.append('_subject', `Nueva Usuaria Lista de Espera - ${data.nombreCompleto}`);
      formData.append('message', `Nombre: ${data.nombreCompleto}\nPaís: ${data.pais}\nEmail: ${data.email}\n\nTipo: Lista de Espera HerSafe`);
    }
    
    // Configuración FormSubmit
    formData.append('_replyto', data.email);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    
    console.log('📤 FormSubmit: Enviando a', `https://formsubmit.co/${MAIN_EMAIL}`);
    const response = await fetch(`https://formsubmit.co/${MAIN_EMAIL}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('📤 FormSubmit: Response status:', response.status, 'OK:', response.ok);
    
    if (response.ok) {
      console.log('✅ FormSubmit: ¡Éxito!');
    } else {
      const text = await response.text();
      console.log('❌ FormSubmit: Error -', text);
    }
    
    return response.ok;
  } catch (error) {
    console.error('❌ FormSubmit Error:', error);
    return false;
  }
}

/**
 * Integración con EmailOctopus
 */
async function submitToEmailOctopus(data: FormSubmissionData, config: FormSubmissionConfig): Promise<boolean> {
  try {
    console.log('📧 EmailOctopus: Preparando datos...');
    // EmailOctopus requiere FormData con campos específicos
    const formData = new FormData();
    formData.append('email_address', data.email);
    formData.append('field_0', data.nombreCompleto); // FirstName/FullName
    
    // Campo honeypot requerido (debe estar vacío para validar)
    formData.append('hp', '');
    
    if (config.type === 'instructors') {
      if (data.especialidad) formData.append('field_1', data.especialidad); // Especialidad
      if (data.telefono) formData.append('field_2', data.telefono); // Telefono
    } else {
      // inicio
      if (data.pais) formData.append('field_1', data.pais); // Pais
    }
    
    console.log('📧 EmailOctopus: Enviando a', config.emailOctopusSubmitUrl);
    const response = await fetch(config.emailOctopusSubmitUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // EmailOctopus no permite CORS, pero el formulario se envía
    });
    
    console.log('✅ EmailOctopus: Enviado (no-cors mode, asumimos éxito)');
    // Con mode: 'no-cors', response.ok siempre será false, pero el envío funciona
    // Consideramos éxito si no hubo error en el fetch
    return true;
  } catch (error) {
    console.error('❌ EmailOctopus Error:', error);
    return false;
  }
}

/**
 * Fallback 1 - FormSubmit Alternativo
 */
async function submitViaFormSubmitFallback(data: FormSubmissionData, config: FormSubmissionConfig): Promise<boolean> {
  try {
    const payload = {
      name: data.nombreCompleto,
      email: data.email,
      message: config.type === 'instructors' 
        ? `Instructora: ${data.nombreCompleto}, Especialidad: ${data.especialidad}, Email: ${data.email}, Tel: ${data.telefono || 'N/A'}`
        : `Usuario: ${data.nombreCompleto}, País: ${data.pais}, Email: ${data.email}`,
      _subject: config.type === 'instructors' ? 'Nueva Instructora' : 'Nueva Usuario Lista Espera',
      _replyto: data.email,
      _captcha: false
    };
    
    const response = await fetch(`https://formsubmit.co/${MAIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    return response.ok;
  } catch (error) {
    console.error('FormSubmit Fallback Error:', error);
    return false;
  }
}

/**
 * Fallback 2 - Mailto
 */
function submitViaMailto(data: FormSubmissionData, config: FormSubmissionConfig): boolean {
  try {
    const subject = config.type === 'instructors' 
      ? `Nueva Instructora Interesada - ${data.nombreCompleto}`
      : `Nueva Usuario Lista de Espera - ${data.nombreCompleto}`;
    
    const body = config.type === 'instructors'
      ? `Hola,\n\nNueva instructora interesada:\n\nNombre: ${data.nombreCompleto}\nEspecialidad: ${data.especialidad}\nEmail: ${data.email}\nTeléfono: ${data.telefono || 'No proporcionado'}\n\nSaludos,\nFormulario HerSafe`
      : `Hola,\n\nNueva usuaria para lista de espera:\n\nNombre: ${data.nombreCompleto}\nPaís: ${data.pais}\nEmail: ${data.email}\n\nSaludos,\nFormulario HerSafe`;
    
    const mailtoUrl = `mailto:${MAIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoUrl, '_blank');
    return true;
  } catch (error) {
    console.error('Mailto Error:', error);
    return false;
  }
}

/**
 * Fallback 3 - Clipboard
 */
async function submitViaClipboard(data: FormSubmissionData, config: FormSubmissionConfig): Promise<boolean> {
  try {
    const clipboardText = config.type === 'instructors'
      ? `--- DATOS INSTRUCTORA ---\nNombre: ${data.nombreCompleto}\nEspecialidad: ${data.especialidad}\nEmail: ${data.email}\nTeléfono: ${data.telefono || 'No proporcionado'}\nEnviar a: ${MAIN_EMAIL}`
      : `--- DATOS USUARIO ---\nNombre: ${data.nombreCompleto}\nPaís: ${data.pais}\nEmail: ${data.email}\nEnviar a: ${MAIN_EMAIL}`;
    
    await navigator.clipboard.writeText(clipboardText);
    return true;
  } catch (error) {
    console.error('Clipboard Error:', error);
    return false;
  }
}

/**
 * Función Principal de Envío con Múltiples Fallbacks
 */
export async function submitFormData(
  data: FormSubmissionData, 
  formType: 'instructors' | 'inicio'
): Promise<{ success: boolean; method: string; message: string }> {
  
  const config = FORM_CONFIGS[formType];
  
  if (!config) {
    return {
      success: false,
      method: 'none',
      message: 'Configuración de formulario no encontrada'
    };
  }
  
  // 1. Método Principal - FormSubmit
  console.log('🚀 Intentando método principal: FormSubmit...');
  const formSubmitSuccess = await submitViaFormSubmit(data, config);
  
  if (formSubmitSuccess) {
    // También intentar EmailOctopus en paralelo
    submitToEmailOctopus(data, config).catch(console.error);
    
    return {
      success: true,
      method: 'FormSubmit + EmailOctopus',
      message: config.type === 'instructors' 
        ? `¡Gracias ${data.nombreCompleto}! Hemos recibido tu información. Te contactaremos pronto para agendar tu videollamada de 15 minutos.`
        : `¡Bienvenida ${data.nombreCompleto}! Has sido agregada exitosamente a la lista de espera de HerSafe. Te contactaremos pronto con más información.`
    };
  }
  
  // 2. Intentar solo EmailOctopus
  console.log('📧 Intentando EmailOctopus...');
  const emailOctopusSuccess = await submitToEmailOctopus(data, config);
  
  if (emailOctopusSuccess) {
    return {
      success: true,
      method: 'EmailOctopus',
      message: config.type === 'instructors' 
        ? `¡Gracias ${data.nombreCompleto}! Te hemos agregado a nuestra lista de instructores. Te contactaremos pronto.`
        : `¡Bienvenida ${data.nombreCompleto}! Has sido agregada a la lista de espera de HerSafe.`
    };
  }
  
  // 3. Fallback 1 - FormSubmit Alternativo
  console.log('🔄 Intentando FormSubmit alternativo...');
  const fallbackSuccess = await submitViaFormSubmitFallback(data, config);
  
  if (fallbackSuccess) {
    return {
      success: true,
      method: 'FormSubmit Fallback',
      message: config.type === 'instructors' 
        ? `¡Gracias ${data.nombreCompleto}! Tu información ha sido enviada. Te contactaremos pronto.`
        : `¡Bienvenida ${data.nombreCompleto}! Tu información ha sido procesada exitosamente.`
    };
  }
  
  // 4. Fallback 2 - Mailto
  console.log('📮 Intentando Mailto...');
  const mailtoSuccess = submitViaMailto(data, config);
  
  if (mailtoSuccess) {
    return {
      success: true,
      method: 'Mailto',
      message: 'Se ha abierto tu cliente de email. Por favor envía el mensaje para completar tu registro.'
    };
  }
  
  // 5. Fallback 3 - Clipboard
  console.log('📋 Intentando Clipboard...');
  const clipboardSuccess = await submitViaClipboard(data, config);
  
  if (clipboardSuccess) {
    return {
      success: true,
      method: 'Clipboard',
      message: 'Datos copiados al portapapeles. Por favor envía esta información por email a colaboraciones.wearehersafe@gmail.com'
    };
  }
  
  // Todos los métodos fallaron
  return {
    success: false,
    method: 'none',
    message: 'No se pudo enviar la información. Por favor contacta directamente a colaboraciones.wearehersafe@gmail.com o intenta más tarde.'
  };
}

/**
 * Validación de datos del formulario
 */
export function validateFormData(data: FormSubmissionData, formType: 'instructors' | 'inicio'): string | null {
  if (!data.nombreCompleto?.trim()) {
    return 'Por favor ingresa tu nombre completo';
  }
  
  if (!data.email?.trim()) {
    return 'Por favor ingresa tu email';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return 'Por favor ingresa un email válido';
  }
  
  if (formType === 'instructors') {
    if (!data.especialidad?.trim()) {
      return 'Por favor ingresa tu especialidad profesional';
    }
  }
  
  if (formType === 'inicio') {
    if (!data.pais?.trim()) {
      return 'Por favor ingresa tu país';
    }
  }
  
  return null; // No hay errores
}