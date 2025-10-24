import emailjs from '@emailjs/browser';

// Configuración de EmailJS - REEMPLAZAR CON TUS CLAVES REALES DE EMAILJS
const EMAILJS_SERVICE_ID = 'service_aprendeexcel'; // Reemplazar con tu Service ID real
const EMAILJS_TEMPLATE_ID_REGISTRO = 'template_registro'; // Reemplazar con tu Template ID real
const EMAILJS_TEMPLATE_ID_RECOVERY = 'template_recovery'; // Reemplazar con tu Template ID real
const EMAILJS_PUBLIC_KEY = 'bViiaak_SePmwMa8D'; // Reemplazar con tu Public Key real
const ADMIN_EMAIL = 'exequielsony@gmail.com';

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

interface UserRegistrationData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

interface PasswordRecoveryData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export const emailService = {
  // Enviar notificación de nuevo registro
  sendRegistrationNotification: async (userData: UserRegistrationData) => {
    try {
      const templateParams = {
        to_email: ADMIN_EMAIL,
        from_name: 'Sistema AprendeExcel',
        user_nombre: userData.nombre,
        user_apellido: userData.apellido,
        user_email: userData.email,
        user_telefono: userData.telefono,
        message_type: 'Nuevo Registro',
        timestamp: new Date().toLocaleString('es-ES', {
          timeZone: 'America/Argentina/Buenos_Aires'
        })
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_REGISTRO,
        templateParams
      );

      console.log('Email de registro enviado exitosamente:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error enviando email de registro:', error);
      return { success: false, error };
    }
  },

  // Enviar notificación de recuperación de contraseña
  sendPasswordRecoveryNotification: async (userData: PasswordRecoveryData) => {
    try {
      const templateParams = {
        to_email: ADMIN_EMAIL,
        from_name: 'Sistema AprendeExcel',
        user_nombre: userData.nombre,
        user_apellido: userData.apellido,
        user_email: userData.email,
        user_telefono: userData.telefono,
        message_type: 'Recuperación de Contraseña',
        timestamp: new Date().toLocaleString('es-ES', {
          timeZone: 'America/Argentina/Buenos_Aires'
        })
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_RECOVERY,
        templateParams
      );

      console.log('Email de recuperación enviado exitosamente:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error enviando email de recuperación:', error);
      return { success: false, error };
    }
  },

  // Función de prueba para verificar configuración
  testEmailService: async () => {
    const testData = {
      nombre: 'Usuario',
      apellido: 'Prueba',
      email: 'test@example.com',
      telefono: '+54 9 11 1234-5678'
    };

    console.log('Probando servicio de email...');
    const result = await emailService.sendRegistrationNotification(testData);
    
    if (result.success) {
      console.log('✅ Servicio de email funcionando correctamente');
    } else {
      console.log('❌ Error en servicio de email:', result.error);
    }
    
    return result;
  }
};

// Instrucciones para configurar EmailJS:
/*
PASOS PARA CONFIGURAR EMAILJS:

1. Ir a https://www.emailjs.com/ y crear una cuenta
2. Crear un nuevo servicio de email (Gmail, Outlook, etc.)
3. Crear templates de email con estos nombres:
   - template_registro: Para notificaciones de registro
   - template_recovery: Para notificaciones de recuperación

4. Template para REGISTRO (template_registro):
   Subject: 🆕 Nuevo registro en AprendeExcel - {{user_nombre}} {{user_apellido}}
   
   Body:
   Se ha registrado un nuevo usuario en AprendeExcel:
   
   📧 Email: {{user_email}}
   👤 Nombre: {{user_nombre}} {{user_apellido}}
   📱 Teléfono: {{user_telefono}}
   🕐 Fecha: {{timestamp}}
   
   Este email fue enviado automáticamente desde el sistema AprendeExcel.

5. Template para RECUPERACIÓN (template_recovery):
   Subject: 🔑 Solicitud de recuperación - {{user_nombre}} {{user_apellido}}
   
   Body:
   Un usuario ha solicitado recuperar su contraseña:
   
   📧 Email: {{user_email}}
   👤 Nombre: {{user_nombre}} {{user_apellido}}
   📱 Teléfono: {{user_telefono}}
   🕐 Fecha: {{timestamp}}
   
   Este email fue enviado automáticamente desde el sistema AprendeExcel.

6. Obtener las claves y reemplazar en este archivo:
   - SERVICE_ID
   - TEMPLATE_IDs
   - PUBLIC_KEY
*/