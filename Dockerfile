# Dockerfile para ORISOD Voice Assistant - Optimizado para Dokploy

# Etapa 1: Build
FROM node:22-alpine AS builder

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache python3 make g++

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo dev) para el build
RUN npm ci && \
    npm cache clean --force

# Copiar el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Limpiar node_modules y reinstalar solo dependencias de producción
RUN rm -rf node_modules && \
    npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force

# Etapa 2: Production
FROM node:22-alpine

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar dependencias de producción desde builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copiar archivos compilados y necesarios
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --chown=nodejs:nodejs public ./public

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto (Dokploy lo detectará automáticamente)
EXPOSE 3000

# Variables de entorno por defecto (se sobrescriben con las de Dokploy)
ENV NODE_ENV=production \
    PORT=3000

# Healthcheck para Dokploy
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar la aplicación
CMD ["node", "dist/server.js"]
