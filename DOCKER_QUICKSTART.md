# 🚀 Comandos Rápidos para Docker

## Probar Localmente con Docker

### 1. Construir la imagen

```bash
docker build -t orisod-voice-assistant .
```

### 2. Ejecutar el contenedor

```bash
docker run -d \
  --name orisod-assistant \
  -p 3000:3000 \
  -e OPENAI_API_KEY=tu_clave_aqui \
  -e NODE_ENV=production \
  orisod-voice-assistant
```

### 3. Ver logs

```bash
docker logs -f orisod-assistant
```

### 4. Verificar health check

```bash
curl http://localhost:3000/health
```

### 5. Detener y eliminar

```bash
docker stop orisod-assistant
docker rm orisod-assistant
```

## Usar Docker Compose (Recomendado)

### 1. Configurar variables de entorno

Crea un archivo `.env` en la raíz con:

```bash
OPENAI_API_KEY=tu_clave_aqui
WEBHOOK_URL=https://webhook.site/tu-id
WEBHOOK_TOKEN=tu_token
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
```

### 2. Iniciar con Docker Compose

```bash
docker-compose up -d
```

### 3. Ver logs

```bash
docker-compose logs -f
```

### 4. Detener

```bash
docker-compose down
```

## Verificar que Funciona

1. **Health Check**:

   ```bash
   curl http://localhost:3000/health
   ```

   Respuesta esperada:

   ```json
   {
     "status": "ok",
     "timestamp": "2024-12-09T...",
     "uptime": 123.45
   }
   ```

2. **Página Principal**:

   ```bash
   curl http://localhost:3000/
   ```

   Respuesta esperada:

   ```json
   {
     "message": "Twilio Media Stream Server is running!"
   }
   ```

3. **Chat Web**:
   Abre en tu navegador:
   ```
   http://localhost:3000/chat
   ```

## Desplegar en Dokploy

Ver la guía completa en: [DOKPLOY_DEPLOY.md](./DOKPLOY_DEPLOY.md)

### Resumen rápido:

1. Sube tu código a GitHub
2. En Dokploy, crea una nueva aplicación Docker
3. Conecta tu repositorio
4. Configura las variables de entorno
5. Despliega

## Solución de Problemas

### Error: "Missing OpenAI API key"

```bash
# Verifica que la variable esté configurada
docker exec orisod-assistant env | grep OPENAI_API_KEY
```

### Ver logs en tiempo real

```bash
docker logs -f orisod-assistant
```

### Entrar al contenedor

```bash
docker exec -it orisod-assistant sh
```

### Reconstruir después de cambios

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Optimización de la Imagen

La imagen Docker usa:

- **Multi-stage build** para reducir tamaño
- **Alpine Linux** (imagen base ligera)
- **Usuario no-root** para seguridad
- **dumb-init** para manejo correcto de señales
- **Health checks** para monitoreo

Tamaño aproximado de la imagen: ~200-300 MB

## Variables de Entorno Disponibles

| Variable             | Requerida | Descripción                   |
| -------------------- | --------- | ----------------------------- |
| `OPENAI_API_KEY`     | ✅ Sí     | Clave API de OpenAI           |
| `PORT`               | ❌ No     | Puerto (default: 3000)        |
| `NODE_ENV`           | ❌ No     | Entorno (default: production) |
| `APP_NAME`           | ❌ No     | Nombre de la app              |
| `WEBHOOK_URL`        | ❌ No     | URL del webhook               |
| `WEBHOOK_TOKEN`      | ❌ No     | Token del webhook             |
| `TWILIO_ACCOUNT_SID` | ❌ No     | SID de Twilio                 |
| `TWILIO_AUTH_TOKEN`  | ❌ No     | Token de Twilio               |

---

**¿Listo para desplegar?** Sigue la guía completa en [DOKPLOY_DEPLOY.md](./DOKPLOY_DEPLOY.md)
