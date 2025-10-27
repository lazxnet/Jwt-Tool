# Etapa de construcción
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración personalizada de nginx si es necesaria
# COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos desde la etapa de builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]