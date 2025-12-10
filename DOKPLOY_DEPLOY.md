# Guía de Despliegue en Dokploy - ORISOD Voice Assistant

## 📋 Requisitos Previos

1. Tener una cuenta en Dokploy
2. Tener un repositorio Git con el código (GitHub, GitLab, etc.)
3. Tener las credenciales de OpenAI listas

## 🚀 Pasos para Desplegar en Dokploy

### 1. Crear Nueva Aplicación en Dokploy

1. Inicia sesión en tu panel de Dokploy
2. Haz clic en **"New Application"** o **"Nueva Aplicación"**
3. Selecciona **"Docker"** como tipo de aplicación

### 2. Configurar el Repositorio

1. **Source Type**: Selecciona "Git Repository"
2. **Repository URL**: Pega la URL de tu repositorio
   ```
   https://github.com/TU_USUARIO/openai-realtime-api-voice-assistant
   ```
3. **Branch**: `main` (o la rama que uses)
4. **Build Context**: `/` (raíz del proyecto)
5. **Dockerfile Path**: `./Dockerfile`

### 3. Configurar Variables de Entorno

En la sección de **Environment Variables**, agrega las siguientes variables:

#### Variables Requeridas:

```bash
# OpenAI API Key (REQUERIDO)
OPENAI_API_KEY=sk-proj-tu_clave_api_aqui

# Puerto (Dokploy lo detecta automáticamente)
PORT=3000

# Entorno de producción
NODE_ENV=production
```

#### Variables Opcionales:

```bash
# Nombre de la aplicación
APP_NAME=ORISOD-Voice-Assistant

# Webhook para datos extraídos
WEBHOOK_URL=https://tu-webhook.com/endpoint

# Token de seguridad del webhook
WEBHOOK_TOKEN=tu_token_secreto

# Credenciales de Twilio (solo si usarás llamadas telefónicas)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token_aqui

# Indicar que está en producción
REPLIT_DEPLOYMENT=true
```

### 4. Configurar el Puerto

- **Port**: `3000`
- Dokploy detectará automáticamente el puerto expuesto en el Dockerfile

### 5. Configurar Health Check (Opcional pero Recomendado)

- **Health Check Path**: `/health`
- **Health Check Interval**: `30s`
- **Health Check Timeout**: `10s`
- **Health Check Retries**: `3`

### 6. Recursos del Contenedor (Opcional)

Configuración recomendada:

- **CPU**: 0.5 - 1 CPU
- **Memory**: 512MB - 1GB RAM
- **Storage**: 1GB

### 7. Desplegar

1. Revisa toda la configuración
2. Haz clic en **"Deploy"** o **"Desplegar"**
3. Espera a que el build y deployment terminen (puede tomar 2-5 minutos)

## 🔍 Verificar el Despliegue

### 1. Revisar Logs

En Dokploy, ve a la sección de **Logs** para ver:

```
[Server] Server is listening on http://[::]:3000
```

### 2. Probar el Health Check

Accede a:

```
https://tu-app.dokploy.com/health
```

Deberías ver:

```json
{
  "status": "ok",
  "timestamp": "2024-12-09T...",
  "uptime": 123.45
}
```

### 3. Probar la Aplicación

Accede a:

```
https://tu-app.dokploy.com/
```

Deberías ver:

```json
{
  "message": "Twilio Media Stream Server is running!"
}
```

### 4. Probar el Chat

Accede a:

```
https://tu-app.dokploy.com/chat
```

## 🔧 Solución de Problemas

### Error: "Missing OpenAI API key"

- Verifica que `OPENAI_API_KEY` esté configurada correctamente en las variables de entorno
- Asegúrate de que no haya espacios extra en la clave

### Error: "Container keeps restarting"

- Revisa los logs en Dokploy
- Verifica que todas las variables de entorno requeridas estén configuradas
- Asegúrate de que el health check esté pasando

### Error: "Build failed"

- Verifica que el Dockerfile esté en la raíz del repositorio
- Asegúrate de que el `package.json` tenga el script `build` configurado
- Revisa los logs de build para errores específicos

## 📝 Notas Importantes

1. **Seguridad**: Nunca subas el archivo `.env` al repositorio. Usa las variables de entorno de Dokploy.

2. **Costos**: Asegúrate de tener créditos en tu cuenta de OpenAI, ya que cada llamada/chat consume tokens.

3. **Escalabilidad**: Si esperas mucho tráfico, considera aumentar los recursos del contenedor.

4. **Dominio Personalizado**: En Dokploy puedes configurar un dominio personalizado para tu aplicación.

5. **SSL/HTTPS**: Dokploy proporciona SSL automáticamente para tus aplicaciones.

## 🔄 Actualizar la Aplicación

Para actualizar tu aplicación después de hacer cambios:

1. Haz push de tus cambios al repositorio Git
2. En Dokploy, ve a tu aplicación
3. Haz clic en **"Redeploy"** o **"Rebuild"**
4. Dokploy automáticamente descargará los cambios y reconstruirá la imagen

## 📞 Configurar Twilio (Opcional)

Si quieres usar llamadas telefónicas:

1. Crea una cuenta en Twilio
2. Obtén un número de teléfono
3. Configura el webhook de voz para apuntar a:
   ```
   https://tu-app.dokploy.com/incoming-call
   ```
4. Agrega las credenciales de Twilio a las variables de entorno en Dokploy

## ✅ Checklist de Despliegue

- [ ] Repositorio Git configurado
- [ ] Dockerfile en la raíz del proyecto
- [ ] Variables de entorno configuradas en Dokploy
- [ ] `OPENAI_API_KEY` configurada
- [ ] Puerto 3000 expuesto
- [ ] Health check configurado en `/health`
- [ ] Aplicación desplegada exitosamente
- [ ] Health check pasando
- [ ] Chat funcionando en `/chat`
- [ ] (Opcional) Twilio configurado

## 🎯 Próximos Pasos

Una vez desplegado:

1. Prueba el chat en `/chat`
2. Configura un dominio personalizado (opcional)
3. Configura Twilio para llamadas telefónicas (opcional)
4. Monitorea los logs y el uso de recursos
5. Configura alertas en Dokploy (opcional)

---

¿Necesitas ayuda con algún paso específico del despliegue?
