// Configuración de EmailJS - IMPORTANTE: CONFIGURAR ANTES DE USAR

// 1. Crear cuenta en https://www.emailjs.com/
// 2. Ir a "Services" y conectar tu servicio de email (Gmail recomendado)
// 3. Ir a "Email Templates" y crear los siguientes templates:

// TEMPLATE 1: SOLICITUD DE REGISTRO
// Template ID: template_registro
// Subject: 🆕 SOLICITUD DE ACCESO - {{user_nombre}} {{user_apellido}} - AprendeExcel
// Body:
/*
📋 NUEVA SOLICITUD DE ACCESO A APRENDEEXCEL

Un usuario ha solicitado acceso a la plataforma:

📧 Email: {{user_email}}
👤 Nombre: {{user_nombre}} {{user_apellido}}
📱 Teléfono: {{user_telefono}}
🕐 Fecha y hora: {{timestamp}}

🔧 ACCIONES REQUERIDAS:
1. Crear cuenta manualmente en Firebase Auth
2. Contactar al usuario para entregar credenciales
3. Confirmar acceso a la plataforma

---
AprendeExcel - Plataforma de aprendizaje
Contenido desarrollado por TECLAB
*/

// TEMPLATE 2: SOLICITUD DE RECUPERACIÓN
// Template ID: template_recovery
// Subject: 🔑 SOLICITUD DE RECUPERACIÓN - {{user_email}} - AprendeExcel
// Body:
/*
🔐 SOLICITUD DE RECUPERACIÓN DE CONTRASEÑA

Un usuario ha solicitado recuperar su contraseña:

📧 Email: {{user_email}}
 Teléfono: {{user_telefono}}
🕐 Fecha y hora: {{timestamp}}

🔧 ACCIONES REQUERIDAS:
1. Verificar que el usuario existe en Firebase Auth
2. Generar nueva contraseña temporal
3. Contactar al usuario por email o teléfono
4. Proporcionar nueva contraseña de acceso

NOTA: No se envió email automático de Firebase. El administrador debe gestionar la recuperación manualmente.

---
AprendeExcel - Plataforma de aprendizaje
Contenido desarrollado por TECLAB
*/

// 4. Reemplazar estos valores con los reales de tu cuenta:
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_aprendeexcel', // Tu Service ID real
  TEMPLATE_REGISTRO: 'template_registro', // Tu Template ID para registro
  TEMPLATE_RECOVERY: 'template_recovery', // Tu Template ID para recuperación
  PUBLIC_KEY: 'tu_public_key_aqui', // Tu Public Key real
  ADMIN_EMAIL: 'exequielsony@gmail.com' // Email donde llegan las notificaciones
};

// INSTRUCCIONES PARA OBTENER LAS CLAVES:
/*
1. Service ID: 
   - Ve a "Services" en EmailJS
   - Copia el "Service ID" de tu servicio configurado

2. Template IDs:
   - Ve a "Email Templates" 
   - Crea los templates con el contenido de arriba
   - Copia los "Template ID" de cada uno

3. Public Key:
   - Ve a "Account" > "General"
   - Copia tu "Public Key"

4. Reemplaza los valores en emailService.ts con estos valores reales
*/