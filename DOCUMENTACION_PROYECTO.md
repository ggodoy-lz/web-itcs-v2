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

### D. Despliegue automatizado desde GitHub (`.cpanel.yml`)

Reemplaza el despliegue manual por ZIP descrito en el punto B.

- **Archivo creado:** `.cpanel.yml` en la raíz del repo.
- **Configuración en cPanel:** Tools → *Git™ Version Control* → *Create*:
  - Clone URL: `https://github.com/ggodoy-lz/web-itcs-v2.git`
  - Repository Path: `/home/u6exojb0edk0/repositories/web-itcs-v2`
  - Si el repo es privado, autenticar con un *Personal Access Token* de GitHub (no la contraseña de la cuenta).
- **Para desplegar:** Manage → *Update from Remote* → *Deploy HEAD Commit*.
- **No es automático:** cPanel no reacciona a los pushes. Cada despliegue requiere entrar y pulsar los dos botones. Para automatizarlo haría falta GitHub Actions (FTP/SSH) o un cron con `git pull`.
- **El rsync no usa `--delete`,** a propósito: `public_html` contiene carpetas ajenas al repo (`dev.itcs.com.py`, `.well-known`) que se borrarían en cada despliegue. Consecuencia: los archivos eliminados del repo sobreviven en el servidor y hay que borrarlos a mano.
- **Exclusiones del despliegue:** `.htaccess` (ver punto 3.C — está vacío intencionalmente y aloja variables de entorno), `env.example`, `node_modules/`, `.git/` y la carpeta de plantilla original.

---

## 4. Seguridad del Formulario de Contacto

### A. Problema detectado
Llegaban correos con **todos los campos en blanco**. Causa: `contact.php` no tenía ninguna validación del lado del servidor. La validación de `js/validation-contact.js` corre únicamente en el navegador, de modo que un bot que hace `POST` directo a `contact.php` la evita por completo. El reCAPTCHA presente en el formulario tampoco frenaba nada porque **nunca se verificaba en el servidor**, y además **el script de Google no estaba cargado**, por lo que el widget ni siquiera se renderizaba.

### B. Correcciones aplicadas
- **Validación server-side** en `contact.php`: rechaza el envío si falta nombre, email, teléfono o mensaje; valida el formato del email con `FILTER_VALIDATE_EMAIL`; exige nombre de 2+ caracteres y mensaje de 10+.
- **Honeypot anti-bot:** campo oculto `website` en el formulario. Los bots lo completan, los humanos no. Si viene con contenido, responde `sent` en silencio sin enviar el correo.
- **Verificación de reCAPTCHA** contra `siteverify` de Google en `contact.php`, y carga del script `recaptcha/api.js` en `contact.html` (faltaba).
- **Validación de cliente reforzada** en `validation-contact.js`: `trim()`, regex real de email, longitudes mínimas y aviso si el captcha no fue completado.
- **Remitente y asunto:** `iTCS` → `ITCS` en `contact.php` y `newsletter.php`.

### C. Pendiente de configuración
La clave secreta de reCAPTCHA **no está en el repo** (es un secreto). El código la lee de la variable de entorno `RECAPTCHA_SECRET`; mientras no exista, la verificación se omite sola y el formulario sigue operativo con honeypot + validación.

Para activarla, añadir al `.htaccess` de `public_html`:

```
SetEnv RECAPTCHA_SECRET "clave_secreta_de_google"
```

La clave se obtiene en [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin), en el sitio cuya *site key* sea `6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6` (la que ya usa el formulario).

---

## 5. Deuda técnica identificada

- **Carpeta `it-services-it-technology-and-it-solutions-templa-2026-03-15-19-45-22-utc`:** son 61 MB de la plantilla original descargada, **sin ninguna referencia** desde el sitio. Puede eliminarse del repo y del servidor. Ya está excluida del despliegue.
- **`api/` y `admin/`:** son funciones serverless escritas para Vercel, y `env.example` apunta a Upstash Redis. En cPanel no se ejecutan igual. Conviene verificar si el admin del blog sigue en uso antes de asumir que funciona.

---

## 6. Propuesta: Agente de Inteligencia Artificial para iTCS S.A.

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

## 7. Historial de Commits en Git
- `remove team photo from index.html`
- `remove Hitos section from index.html`
- `implement AJAX-based newsletter subscription form with PHP mailer`
- `Fix mail del formulario de contacto: remitente y encoding`
- `Fix mail del newsletter: mismos bugs que contacto (remitente y encoding)`
- `fix(contacto): validacion server-side + honeypot anti-bot; remitente ITCS`
- `feat(contacto): verificacion server-side de reCAPTCHA + cargar script del widget`
- `chore: .cpanel.yml para despliegue desde GitHub via cPanel Git Version Control`
