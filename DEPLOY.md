# 🚀 Guía de Despliegue - Hangman Game

Esta guía te ayudará a desplegar el juego del Ahorcado en diferentes plataformas.

## 📋 Preparación

Antes de desplegar, asegúrate de que el proyecto funcione correctamente en local:

```bash
# Instalar dependencias
npm install

# Probar en desarrollo
npm run dev

# Construir para producción
npm run build

# Probar construcción
npm run preview
```

## 🌐 Netlify (Recomendado)

### Método 1: Deploy desde Git

1. **Conecta tu repositorio** a Netlify
2. **Configuración automática** (usando `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### Método 2: Deploy manual

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Construir el proyecto
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### ✅ Características en Netlify

- ✅ **SQLite funciona perfectamente** (sql.js + WASM)
- ✅ **Sin servidor necesario**
- ✅ **HTTPS automático**
- ✅ **CDN global**
- ✅ **Funciona offline** después de la primera carga

## ▲ Vercel

### Deploy desde Git

1. Conecta tu repositorio a Vercel
2. Configuración automática:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Deploy manual

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🚀 GitHub Pages

### Configuración

1. **Crea `.github/workflows/deploy.yml`**:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **Habilita GitHub Pages** en la configuración del repositorio
3. **Selecciona** la branch `gh-pages` como source

## 🔥 Firebase Hosting

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Inicializar Firebase
firebase init hosting

# Configurar:
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No

# Construir y desplegar
npm run build
firebase deploy
```

## 📦 Surge.sh

```bash
# Instalar Surge
npm install -g surge

# Construir
npm run build

# Deploy
cd dist
surge
```

## 🐳 Docker

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|wasm)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Comandos Docker

```bash
# Construir imagen
docker build -t hangman-game .

# Ejecutar contenedor
docker run -p 8080:80 hangman-game
```

## ⚡ Optimizaciones para Producción

### 1. Cache de SQLite WASM

El archivo `netlify.toml` incluye cache headers optimizados para sql.js:

```toml
[[headers]]
  for = "/*.wasm"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Content-Type = "application/wasm"
```

### 2. Preload de recursos críticos

En `index.html`:

```html
<link rel="preload" href="/sql-wasm.wasm" as="fetch" crossorigin />
```

### 3. Service Worker (Opcional)

Para funcionalidad offline avanzada, considera implementar un Service Worker.

## 🔍 Verificación de Despliegue

Después del despliegue, verifica:

1. ✅ **El juego carga correctamente**
2. ✅ **El timer funciona**
3. ✅ **Las animaciones se ejecutan**
4. ✅ **El leaderboard guarda datos**
5. ✅ **Responsive en móvil**
6. ✅ **No hay errores en console**

## 🐛 Solución de Problemas

### Error: "sql.js not found"

- **Causa**: Problemas con la carga de WASM
- **Solución**: Verificar headers CORS y Content-Type

### Error: "Cannot resolve module"

- **Causa**: Configuración de build incorrecta
- **Solución**: Verificar `vite.config.js` y `package.json`

### Base de datos no persiste

- **Causa**: LocalStorage bloqueado
- **Solución**: Verificar configuración de privacidad del navegador

---

## 🎯 Plataforma Recomendada

**🏆 Netlify** es la opción más simple y robusta para este proyecto:

- ✅ **Configuración automática** con `netlify.toml`
- ✅ **Excelente soporte** para aplicaciones SPA
- ✅ **SQLite/WASM funciona perfectamente**
- ✅ **Deploy automático** desde Git
- ✅ **Funcionalidad offline** incluida

¡Tu juego del Ahorcado estará online en minutos! 🚀
