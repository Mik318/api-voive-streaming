# Asistente Virtual ORISOD Enzyme® - OpenAI Realtime API

Este proyecto implementa un asistente virtual de atención al cliente con IA para **ORISOD Enzyme®** utilizando la API Realtime de OpenAI. Maneja llamadas telefónicas entrantes a través de Twilio y proporciona una interfaz de chat web para pruebas y demostraciones.

## ✨ Características

- Maneja llamadas entrantes usando servicios de voz de Twilio
- Utiliza modelos GPT de OpenAI para procesamiento de lenguaje natural
- Transcribe el habla del usuario y genera respuestas de IA en tiempo real
- Proporciona una interfaz de chat web para pruebas y demostraciones
- Extrae detalles del cliente de las conversaciones
- Envía información extraída a un webhook para procesamiento adicional
- **Configurado en español** con conocimiento completo sobre ORISOD Enzyme®

## 🧬 Sobre ORISOD Enzyme®

El asistente está entrenado con información completa sobre ORISOD Enzyme®, incluyendo:

- Descripción general del producto
- Tecnología ADS® (Advanced Delivery System)
- Componentes bioactivos (polifenoles del olivo, componentes del romero, metabolitos de fermentación)
- Beneficios principales (antioxidante, antiinflamatorio, neuroprotector, etc.)
- Evidencia clínica de estudios en Japón, Francia y España

## 🛠️ Tecnologías Utilizadas

- Node.js (versión 18 o superior requerida)
- TypeScript
- Fastify (framework web)
- WebSocket (para comunicación en tiempo real)
- API GPT-4 de OpenAI
- Twilio (para servicios de telefonía)
- dotenv (para gestión de variables de entorno)

## ⚙️ Configuración

### Requisitos Previos

**IMPORTANTE**: Este proyecto requiere **Node.js 18 o superior**. Si tienes Node.js 16, necesitas actualizarlo.

#### Actualizar Node.js

**Opción 1: Usando nvm (Recomendado)**
```bash
# Instalar nvm si no lo tienes
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Cerrar y reabrir la terminal, luego:
nvm install 18
nvm use 18
nvm alias default 18

# Verificar la versión
node --version  # Debería mostrar v18.x.x o superior
```

**Opción 2: Descargar desde nodejs.org**
- Visita https://nodejs.org/
- Descarga e instala Node.js 18 LTS o superior

### Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL de tu repositorio]
   cd openai-realtime-api-voice-assistant
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   
   Crea un archivo `.env` en el directorio raíz y agrega lo siguiente:
   ```bash
   OPENAI_API_KEY=tu_clave_api_de_openai
   ```
   
   Reemplaza `tu_clave_api_de_openai` con tu clave API real de OpenAI.

4. Actualiza la URL del webhook:
   
   Localiza la configuración del webhook en tu código y reemplázala con tu propia URL de webhook.

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

## 📞 Uso

### Para llamadas de voz

Una vez que el servidor esté en funcionamiento, manejará las llamadas entrantes de Twilio. El agente de IA interactuará con los llamantes, transcribirá su habla, generará respuestas apropiadas y extraerá información relevante de la conversación.

### Para interfaz de chat

Accede a la interfaz de chat navegando a `http://localhost:[TU_PUERTO]/chat` en tu navegador web.

## 🤖 Personalización del Agente

El agente está configurado en español como "Ana", una experta en nutrición y suplementación. Puedes personalizar el comportamiento del agente editando:

- `src/agent/agent.ts` - Mensajes del sistema, instrucciones y configuración del agente
- `src/agent/tools.ts` - Herramientas disponibles y sus descripciones
- `contexto_orisod.txt` - Información detallada del producto (referencia)

## 🚀 Desarrollo

- Usa `npm run dev` para iniciar el servidor en modo desarrollo con recarga en caliente
- Usa `npm run build` para compilar archivos TypeScript
- Usa `npm run format` para formatear el código usando Prettier

## 📝 Notas

- Este proyecto es una demostración y debe adaptarse para uso en producción
- Implementa manejo de errores apropiado
- Asegura medidas de seguridad adecuadas
- Cumple con las regulaciones relevantes

## 🔧 Solución de Problemas

### Error: `diagnostics.tracingChannel is not a function`

Este error ocurre cuando usas Node.js 16 o inferior. **Solución**: Actualiza a Node.js 18 o superior (ver sección de Requisitos Previos arriba).

### Advertencias de motor no soportado durante `npm install`

Estas advertencias indican que algunos paquetes requieren versiones más recientes de Node.js. Actualiza a Node.js 18 o superior para resolverlas.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia ISC.

## 🌐 Idioma

Este asistente está completamente configurado en **español** y especializado en responder preguntas sobre ORISOD Enzyme®.
