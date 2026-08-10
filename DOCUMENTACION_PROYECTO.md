# Documentación y Registro de Cambios — web-itcs-v2

Este documento contiene el historial completo de cambios realizados en el proyecto, guías de despliegue en cPanel y la propuesta del Agente de IA.

---

## 1. Modificaciones Realizadas en la Web Frontend

### A. Eliminación de la Foto de Equipo
- **Archivo modificado:** `index.html`
- **Cambio:** Se eliminó la imagen de grupo (`images/team/team-group.jpg`) ubicada en la sección "NUESTRO EQUIPO / Un equipo, muchas especialidades", conservando el texto descriptivo.

### B. Eliminación de la Sección "Hitos"
- **Archivo modificado:** `index.html`
- **Cambio:** Se eliminó por completo la sección HTML de la línea de tiempo histórica ("Hitos / Evolución y alianzas estratégicas").

---

## 2. Desarrollo e Integración de Formularios (PHP + AJAX)

### A. Formulario de Contacto (`contact.html`)
- Utiliza `js/validation-contact.js` para enviar datos vía AJAX a `contact.php`.
- Funciona de forma nativa en servidores con PHP (como cPanel) usando la función `mail()` enviando la consulta a `info@itcs.com.py`.

### B. Formulario de Newsletter (`index.html`)
- **Archivos creados:**
  - `newsletter.php`: Recibe la suscripción mediante `POST` y envía un correo a `info@itcs.com.py` con el asunto *"Nueva suscripción a Newsletter — iTCS S.A."*.
  - `js/validation-newsletter.js`: Valida el email en el cliente y envía los datos mediante AJAX sin recargar la página, mostrando avisos de confirmación.
- **Archivo modificado:** `index.html` (actualización de formulario `#newsletter_form`, inputs y llamada al script JS).

---

## 3. Guía de Despliegue en cPanel y Solución de Problemas

### A. Backup de la Web Anterior (WordPress)
1. En cPanel, se creó la carpeta `/web_antigua` en el directorio raíz (`/home/u6exojb0edk0/web_antigua`).
2. Se trasladaron todos los archivos antiguos de WordPress desde `/public_html` hacia `/web_antigua`.

### B. Despliegue de la Nueva Web
1. Se comprimió la rama `main` en `public_html_new.zip`.
2. Se subió y extrajo el archivo en la carpeta `/public_html` limpia.

### C. Solución al Error 403 (Imágenes / Logos PNG bloqueados)
Si los logos en formato `.png` no cargan en el servidor (Error 403 Forbidden):
1. **Archivo `.htaccess` oculto:** Asegurarse de activar "Mostrar archivos ocultos" en cPanel. Si existe un `.htaccess` residual de WordPress en `public_html` o subcarpetas, renombrarlo a `.htaccess-backup`.
2. **Hotlink Protection:** Ir a la sección "Protección de enlaces directos" (Hotlink Protection) en cPanel y deshabilitarla si está bloqueando las imágenes.

---

## 4. Propuesta: Agente de Inteligencia Artificial para iTCS S.A.

Borrador de propuesta para presentar la solución de un asistente virtual IA:

> **Asunto:** Propuesta de Alcance: Agente de Inteligencia Artificial para Atención al Cliente — iTCS S.A.
> 
> Estimado/a [Nombre del Cliente],
> 
> Es un gusto saludarte. En línea con nuestro objetivo de optimizar la conversión de visitas en tu sitio web, te presento la propuesta de alcance para implementar un **Agente de Inteligencia Artificial** personalizado.
> 
> Este agente funcionará como un asistente virtual interactivo en tu web, diseñado específicamente para **responder de manera inmediata cualquier duda de los usuarios** basándose en la información del sitio y derivar prospectos calificados a tu equipo comercial.
> 
> ### 1. Resolución de Dudas en Tiempo Real (Base de Conocimiento)
> El agente estará entrenado con el 100% de la información de tu sitio web para responder preguntas a los usuarios de manera natural y precisa. Podrá responder a consultas como:
> - **Detalles de Servicios:** Explicar en qué consiste cada solución (Ciberseguridad, Backup, Cloud, Networking, Obras Civiles, etc.) y cómo ayudan a las organizaciones.
> - **Certificaciones y Confianza:** Responder dudas sobre tus certificaciones ISO 9001 e ISO 27001, la trayectoria de más de 20 años de iTCS y el esquema de soporte 24/7.
> - **Partners y Marcas asociadas:** Aclarar con qué tecnologías trabajan (Sophos, Fortinet, Veeam, HPE, Aruba, Microsoft, QNAP, etc.) según lo que el usuario requiera.
> 
> ### 2. Flujo de Atención y Conversación
> El asistente guiará al usuario a través de una experiencia conversacional fluida:
> 1. **Bienvenida:** El agente saluda y ofrece ayuda sobre tus soluciones.
> 2. **Resolución de consultas:** El usuario plantea sus dudas y la IA le responde inmediatamente utilizando el contexto de la web.
> 3. **Calificación:** Si la consulta del usuario demuestra interés en cotizar o contratar un servicio, el agente inicia una calificación amigable en el chat, solicitando los siguientes datos:
>    - Nombre y Apellido.
>    - Empresa.
>    - Correo electrónico y Teléfono.
>    - Servicio o solución de interés.
>    - Detalles del requerimiento.
> 4. **Cierre:** Agradece al usuario y le confirma que un especialista se pondrá en contacto.
> 
> ### 3. Derivación Automática al Equipo Comercial
> Inmediatamente después de que el agente recopile los datos del prospecto (o si la duda del usuario requiere la atención de un humano), el sistema enviará automáticamente un **correo electrónico estructurado** a tu equipo comercial (por ejemplo, a `info@itcs.com.py`) que incluirá:
> - Los datos de contacto capturados.
> - El resumen o transcripción completa de la conversación para que el vendedor conozca el contexto exacto y las dudas previas del cliente antes de contactarlo.
> 
> Quedo a tu entera disposición para revisar los detalles del alcance y definir los siguientes pasos para su desarrollo.
> 
> Atentamente,  
> **[Tu Nombre/Empresa]**

---

## 5. Historial de Commits en Git
- `remove team photo from index.html`
- `remove Hitos section from index.html`
- `implement AJAX-based newsletter subscription form with PHP mailer`
