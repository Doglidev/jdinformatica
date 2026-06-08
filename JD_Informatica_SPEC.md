# SPEC — Landing Page JD Informática
**Metodología:** SPEC Driven Development  
**Proyecto:** Landing page comercial para JD Informática  
**Fecha:** Junio 2026  
**Dev:** Mateo Dogliani

---

## 1. VISIÓN DEL PRODUCTO

**¿Qué es?**  
Una landing page comercial para JD Informática, empresa de soporte IT en Córdoba Capital, Argentina. Su objetivo es convertir visitas en consultas de potenciales clientes PyME.

**¿Para qué sirve?**  
Reemplazar el link en blanco del WhatsApp. Cuando un prospecto recibe un mensaje de Mateo y googleea "JD Informática Córdoba", encuentra una página que genera confianza y tiene un CTA claro.

**Métrica de éxito:**  
Un visitante debe poder entender qué hace JD Informática, por qué confiar en ellos, y contactarlos — en menos de 30 segundos.

---

## 2. AUDIENCIA OBJETIVO

| Segmento | Problema IT típico |
|---|---|
| Estudios contables | PC lenta, software desactualizado, sin backup |
| Colegios privados | Red inestable, impresoras, soporte docentes |
| Clínicas y centros médicos | Sistemas de turnos caídos, datos sensibles |
| Concesionarias | Red de piso de ventas, equipos de gestión |

**Perfil del decisor:** Dueño o socio principal, 35-60 años, no técnico, busca confianza y respuesta rápida más que precio.

---

## 3. CONCEPTO DE DISEÑO — "Editorial Técnico"

### El problema del diseño genérico de IA
Todas las páginas de IT/SaaS actuales usan:
- Fondo oscuro con gradientes morado/azul
- Texto con `background-clip: text` en degradado
- Cards flotantes con glassmorphism
- Tipografías Inter o Plus Jakarta Sans
- Partículas o blobs animados
- Infinito padding y "whitespace"

**JD Informática tiene que sentirse diferente: local, humana, técnicamente seria.**

### Concepto: "El Técnico de Barrio que Sabe lo que Hace"
Inspiración visual:
- **Señalética industrial argentina** — tipografía bold, contraste alto, funcional
- **Layout editorial de revista técnica** — grillas asimétricas, texto que respira
- **Colores de la identidad JD** — azul oscuro (`#1A2744`) como base, acento en amarillo eléctrico (`#F5C518`) y blanco limpio
- **Sin gradientes de fondo** — fondos sólidos, bordes definidos, sombras reales
- **Tipografía:** `Space Grotesk` para títulos (técnico pero cálido) + `IBM Plex Mono` para datos/números (autenticidad técnica)

### Paleta de colores
```
--color-bg:        #0D1117   /* fondo principal: casi negro */
--color-surface:   #1A2744   /* superficie de cards: azul medianoche */
--color-accent:    #F5C518   /* amarillo eléctrico: acción y datos */
--color-text:      #F0F0F0   /* texto principal: blanco cálido */
--color-muted:     #8A8FA0   /* texto secundario */
--color-border:    #2E3A52   /* bordes sutiles */
--color-success:   #22C55E   /* verde para estados positivos */
```

### Elementos visuales únicos
1. **Números en monospace con acento amarillo** — contadores de clientes, años, tickets resueltos
2. **Tags tipo "chip técnico"** — `[REDES]` `[SOPORTE]` `[BACKUP]` en monospace con borde
3. **Grid asimétrico** — sección hero con 60/40 o 70/30, no centrado
4. **Sin hero animado** — imagen real o ilustración flat de técnico en acción, no stock genérico
5. **Línea de "status"** — barra fija arriba tipo terminal: `● JD Informática · Córdoba Capital · Tiempo de respuesta: < 2hs`

---

## 4. ESTRUCTURA DE LA PÁGINA (Secciones)

```
┌─────────────────────────────────────────┐
│  STATUSBAR  — línea de estado superior  │
├─────────────────────────────────────────┤
│  NAV       — logo + CTA WhatsApp        │
├─────────────────────────────────────────┤
│  HERO      — propuesta de valor + stats │
├─────────────────────────────────────────┤
│  PROBLEMAS — los dolores del cliente    │
├─────────────────────────────────────────┤
│  SERVICIOS — qué hacemos                │
├─────────────────────────────────────────┤
│  RUBROS    — para quiénes               │
├─────────────────────────────────────────┤
│  PROCESO   — cómo trabajamos            │
├─────────────────────────────────────────┤
│  CONFIANZA — por qué elegirnos          │
├─────────────────────────────────────────┤
│  CONTACTO  — formulario + WhatsApp      │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

### Detalle de cada sección

**STATUSBAR**
```
● JD Informática · Córdoba Capital · Respuesta en menos de 2hs · 0351-XXX-XXXX
```
Barra fija, fondo `--color-accent`, texto oscuro, scroll suave.

**NAV**
Logo JD + links de ancla (Servicios / Rubros / Contacto) + botón "Escribinos por WhatsApp" en amarillo.

**HERO**
- Izquierda (60%): Titular grande en 2 líneas + subtítulo + dos CTAs
- Derecha (40%): Bloque de stats con monospace
  ```
  [08] años de experiencia
  [+150] clientes en Córdoba
  [<2hs] tiempo de respuesta
  [99%] problemas resueltos
  ```
- Titular propuesto: **"Tu departamento IT, sin tener que contratar uno."**
- Subtítulo: *"Soporte, mantenimiento y redes para estudios, colegios y clínicas en Córdoba Capital."*

**PROBLEMAS**
Grid de 3 cards con íconos simples:
- "La PC va lenta justo cuando más la necesitás"
- "Perdiste datos importantes y no tenías backup"
- "La red del trabajo cayó y nadie sabe por qué"

**SERVICIOS**
Lista con tags técnicos:
- `[SOPORTE]` Asistencia remota y presencial
- `[REDES]` Instalación y mantenimiento de red
- `[BACKUP]` Soluciones de respaldo y recuperación
- `[EQUIPOS]` Mantenimiento preventivo y correctivo
- `[SEGURIDAD]` Antivirus, actualizaciones, protección
- `[CÁMARAS]` CCTV e instalación de vigilancia

**RUBROS**
Cards con ícono + nombre del rubro + problema típico resuelto:
- Estudios Contables
- Colegios Privados
- Clínicas y Centros Médicos
- Concesionarias

**PROCESO**
Timeline horizontal de 4 pasos:
1. Contacto → 2. Diagnóstico → 3. Solución → 4. Seguimiento

**CONFIANZA**
- Años en el mercado
- Cobertura geográfica (Córdoba Capital)
- Disponibilidad (L-V + guardias)
- Sin letra chica, sin contratos mínimos

**CONTACTO**
- Formulario simple: Nombre / Empresa / Teléfono / Mensaje
- Botón WhatsApp directo
- Dirección / zona de cobertura

---

## 5. STACK TÉCNICO

```
Framework:   Astro 4 (o Next.js 14 con App Router)
Estilos:     CSS Variables + Tailwind CSS (para utilidades)
Tipografías: Google Fonts — Space Grotesk + IBM Plex Mono
Iconos:      Lucide React o Phosphor Icons
Animaciones: CSS nativas (no GSAP, no Framer Motion — rendimiento)
Formulario:  Formspree o EmailJS (sin backend)
Deploy:      Vercel o Netlify (gratis)
```

**Por qué Astro:**
- Genera HTML estático → velocidad máxima
- Sin JavaScript innecesario en el cliente
- Ideal para landing pages que necesitan buen SEO
- Si en el futuro querés agregar el agente de Claude, Astro soporta islas React

---

## 6. INTEGRACIÓN CLAUDE AGENT (diferenciador clave)

En la sección de Contacto, en lugar de un formulario estático, integrar un **mini-asistente de diagnóstico**:

```
"¿Cuál es tu problema de IT hoy?"
[El usuario describe su problema en texto libre]
→ Claude analiza y responde con:
  - Diagnóstico preliminar
  - Si es urgente o no
  - CTA personalizado ("Te conviene llamar ahora" / "Mandanos un WhatsApp")
```

**Stack para esto:**
- Anthropic SDK (`@anthropic-ai/sdk`)
- API Route en Astro/Next.js que llama a Claude
- Modelo recomendado: `claude-haiku-4-5` (rápido y económico para este uso)
- System prompt cargado desde archivo `system-prompt.md`

Esto es 100% único — ninguna empresa de soporte IT local tiene esto.

---

## 7. PROMPTS PARA CLAUDE CODE EN VS CODE

Usá estos prompts en orden. Cada uno es un paso del desarrollo.

---

### PROMPT 0 — Inicialización del proyecto
```
Inicializá un proyecto Astro 4 con TypeScript. 
Instalá las dependencias: @astrojs/tailwind, tailwindcss, @astrojs/react, react, react-dom, lucide-react.
Configurá tailwind.config.mjs con las siguientes CSS variables como colores personalizados:
- bg: #0D1117
- surface: #1A2744
- accent: #F5C518
- text: #F0F0F0
- muted: #8A8FA0
- border: #2E3A52
Configurá las fuentes Space Grotesk e IBM Plex Mono via Google Fonts en el Layout base.
Creá la estructura de carpetas: src/components/, src/sections/, src/layouts/, src/styles/.
```

---

### PROMPT 1 — Layout base y variables globales
```
Creá el archivo src/layouts/Layout.astro con:
- Meta tags SEO: title, description, og:image, canonical para JD Informática Córdoba
- Import de Google Fonts: Space Grotesk (400, 600, 700) y IBM Plex Mono (400, 500)
- CSS global en src/styles/global.css con todas las variables de color y tipografía
- Reset CSS moderno (box-sizing, margin 0, etc)
- font-family: 'Space Grotesk' para body, 'IBM Plex Mono' para code y clases .mono
- El layout debe aceptar un slot para el contenido de cada página
```

---

### PROMPT 2 — StatusBar y Nav
```
Creá el componente src/components/StatusBar.astro:
- Barra fija en la parte superior, z-index alto
- Fondo color accent (#F5C518), texto oscuro (#0D1117)
- Contenido: "● JD Informática · Córdoba Capital · Respuesta < 2hs · (0351) XXX-XXXX"
- Texto en IBM Plex Mono, tamaño pequeño
- Debe desplazarse horizontalmente en mobile como ticker si el texto no entra

Creá el componente src/components/Nav.astro:
- Logo "JD" en tipografía bold con un punto amarillo decorativo
- Links de ancla: Servicios, Rubros, Contacto
- Botón CTA: "Escribinos por WhatsApp" → fondo accent, texto oscuro
- Sticky al hacer scroll (position: sticky, top: altura del StatusBar)
- En mobile: hamburger menu con toggle CSS puro (sin JS)
```

---

### PROMPT 3 — Sección Hero
```
Creá src/sections/Hero.astro con un layout de 2 columnas (60/40):

Columna izquierda:
- Badge superior en monospace: [SOPORTE IT · CÓRDOBA]
- H1 en 2 líneas: "Tu departamento IT," / "sin tener que contratar uno."
  - Tamaño: clamp(2.5rem, 5vw, 4.5rem)
  - Font: Space Grotesk 700
  - La palabra "IT" con color accent
- Párrafo subtítulo: "Soporte, mantenimiento y redes para estudios contables, colegios y clínicas en Córdoba Capital."
- 2 CTAs en fila: botón primario "Consultanos gratis" (WhatsApp link) + botón secundario "Ver servicios" (ancla)

Columna derecha:
- Card con fondo surface y borde border, padding generoso
- 4 stats en IBM Plex Mono:
  [08] años en el mercado
  [+150] clientes activos  
  [<2hs] tiempo de respuesta
  [100%] cobertura Córdoba Capital
- Número en accent grande, texto descriptivo en muted

En mobile: columna única, stats debajo del copy.
```

---

### PROMPT 4 — Sección Problemas
```
Creá src/sections/Problemas.astro:
- Título de sección: "¿Te suena familiar?" en Space Grotesk 600
- Grid de 3 cards (1 col mobile, 3 col desktop)
- Cada card tiene:
  - Ícono de Lucide React (usa: AlertTriangle, HardDrive, Wifi)
  - Título del problema en bold
  - Descripción corta en muted
  - Borde izquierdo de 3px en color accent al hacer hover
  - Transición suave: transform translateY(-4px) en hover
- Contenido:
  Card 1: "La PC va lenta" — "Justo cuando más la necesitás, todo colapsa y perdés tiempo."
  Card 2: "Sin backup real" — "Perdiste un archivo importante y no había copia guardada."
  Card 3: "La red cayó" — "Internet, impresoras o el servidor del estudio dejaron de funcionar."
```

---

### PROMPT 5 — Sección Servicios
```
Creá src/sections/Servicios.astro:
- Título: "Lo que hacemos" 
- Subtítulo en muted: "Servicio integral para que vos te enfoques en tu negocio."
- Lista de 6 servicios en grid 2 columnas (1 en mobile):
  Cada item tiene:
  - Tag técnico en IBM Plex Mono con borde: [SOPORTE] [REDES] [BACKUP] [EQUIPOS] [SEGURIDAD] [CÁMARAS]
  - Nombre del servicio en bold
  - Descripción de una línea en muted
- Contenido:
  [SOPORTE] — Asistencia remota y presencial — "Resolvemos problemas el mismo día, remoto o en tu local."
  [REDES] — Instalación y mantenimiento — "WiFi, servidores, switches y cableado estructurado."
  [BACKUP] — Respaldo y recuperación — "Tu información segura, con copias automáticas y probadas."
  [EQUIPOS] — Mantenimiento preventivo — "Limpieza, actualización y diagnóstico de hardware."
  [SEGURIDAD] — Protección digital — "Antivirus, actualizaciones y políticas de acceso."
  [CÁMARAS] — CCTV y vigilancia — "Instalación y configuración de sistemas de cámaras IP."
```

---

### PROMPT 6 — Sección Rubros
```
Creá src/sections/Rubros.astro:
- Título: "Trabajamos con"
- Grid de 4 cards (2x2 en tablet, 4 en desktop):
  Cada card tiene:
  - Número de orden en IBM Plex Mono color accent: 01, 02, 03, 04
  - Nombre del rubro en H3
  - Problema típico resuelto en text muted
  - Fondo surface, hover con border accent
- Contenido:
  01 — Estudios Contables — "Software contable lento, red caída en cierre de mes."
  02 — Colegios Privados — "WiFi para aulas, soporte a docentes y sistema de gestión."
  03 — Clínicas y Centros Médicos — "Sistemas de turnos, equipos de diagnóstico conectados."
  04 — Concesionarias — "Red de piso de ventas, equipos de gestión y cámaras."
```

---

### PROMPT 7 — Sección Proceso
```
Creá src/sections/Proceso.astro:
- Título: "Cómo trabajamos"
- Timeline horizontal en desktop, vertical en mobile
- 4 pasos conectados con línea punteada en color border:
  Paso 01: [CONTACTO] — "Nos escribís o llamás. Sin formularios complicados."
  Paso 02: [DIAGNÓSTICO] — "Evaluamos el problema, remoto o presencial."
  Paso 03: [SOLUCIÓN] — "Lo resolvemos. Si necesitamos piezas, te avisamos antes."
  Paso 04: [SEGUIMIENTO] — "Chequeamos que todo funcione. No desaparecemos."
- Número de paso en IBM Plex Mono accent grande
- Nombre del paso en tag monospace
- Descripción en muted
```

---

### PROMPT 8 — Sección Contacto con Claude Agent
```
Creá src/sections/Contacto.astro y src/pages/api/diagnostico.ts:

SECCIÓN VISUAL (Contacto.astro):
- Título: "Contanos tu problema"
- Layout 2 columnas:
  Izquierda: Formulario clásico (Nombre, Empresa, Teléfono, Mensaje) + botón enviar
  Derecha: 
    - Botón grande de WhatsApp con número real
    - Horario de atención
    - Zona de cobertura: Córdoba Capital y Gran Córdoba

ASISTENTE DE DIAGNÓSTICO (componente React):
- Input de texto: "Describí tu problema de IT..."
- Botón "Obtener diagnóstico rápido"
- Respuesta de Claude aparece debajo con animación de typing
- Al final de la respuesta, siempre un CTA: "¿Querés que te llamemos?"

API ROUTE (api/diagnostico.ts):
import Anthropic from '@anthropic-ai/sdk';
- Recibe { problema: string } en el body
- Llama a claude-haiku-4-5 con system prompt:
  "Sos el asistente técnico de JD Informática, empresa de soporte IT en Córdoba, Argentina. 
   Cuando el usuario describe un problema, respondé en 3-4 oraciones:
   1. Diagnosticá brevemente qué puede estar pasando
   2. Si es urgente o puede esperar
   3. Recomendá contactar a JD Informática para resolverlo
   Usá lenguaje simple y directo. No uses tecnicismos innecesarios."
- Devuelve la respuesta como stream
- Manejo de errores con mensaje fallback
```

---

### PROMPT 9 — Footer y detalles finales
```
Creá src/components/Footer.astro:
- Logo JD + tagline: "Soporte IT para PyMEs en Córdoba"
- Links rápidos: Servicios, Rubros, Contacto
- Datos de contacto: teléfono, WhatsApp, email
- Frase en IBM Plex Mono al pie: "// JD Informática © 2026 · Córdoba, Argentina"

Revisá y asegurate de:
- Smooth scroll en todos los links de ancla
- Meta description con palabras clave: "soporte IT Córdoba, mantenimiento equipos, redes WiFi estudios contables"
- Favicon: genera uno simple con las letras "JD" en canvas
- Optimización: todas las imágenes con loading="lazy", alt texts descriptivos
- responsive breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
```

---

### PROMPT 10 — Variables de entorno y Deploy
```
Creá el archivo .env.local con:
ANTHROPIC_API_KEY=tu_api_key_aqui
PUBLIC_WHATSAPP_NUMBER=5493XXXXXXXXX
PUBLIC_PHONE_NUMBER=0351XXXXXXX

Actualizá el componente de WhatsApp para leer PUBLIC_WHATSAPP_NUMBER.

Creá vercel.json para el deploy:
{
  "buildCommand": "astro build",
  "outputDirectory": "dist",
  "framework": "astro"
}

Instrucciones para deploy:
1. Subir repo a GitHub
2. Conectar en vercel.com
3. Agregar ANTHROPIC_API_KEY en Environment Variables de Vercel
4. Deploy automático en cada push a main
```

---

## 8. ORDEN DE EJECUCIÓN RECOMENDADO

```
Semana 1:
  Día 1 → Prompt 0 + 1 (setup + layout)
  Día 2 → Prompt 2 + 3 (nav + hero)
  Día 3 → Prompt 4 + 5 (problemas + servicios)

Semana 2:
  Día 1 → Prompt 6 + 7 (rubros + proceso)
  Día 2 → Prompt 8 (contacto + Claude Agent) ← lo más importante
  Día 3 → Prompt 9 + 10 (footer + deploy)
```

---

## 9. CHECKLIST DE LANZAMIENTO

- [ ] Dominio comprado (ej: jdinformatica.com.ar)
- [ ] API Key de Anthropic cargada en Vercel
- [ ] Número de WhatsApp real en el código
- [ ] Formulario conectado a email real
- [ ] Google Business actualizado con link a la landing
- [ ] Prueba en mobile y desktop
- [ ] Velocidad > 90 en Lighthouse

---

*Documento generado con SPEC Driven Development · JD Informática · 2026*
