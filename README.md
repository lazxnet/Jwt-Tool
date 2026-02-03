# JWT Toolkit ⚙️

**JWT Toolkit** es una aplicación web ligera y de código abierto para **decodificar**, **codificar** y **explorar** JSON Web Tokens (JWT) desde tu navegador. Está construida con **React + TypeScript** y usa la **Web Crypto API** para las operaciones criptográficas en el cliente.

---

## 📌 Índice

- [Características](#-características)
- [Demo rápida](#-demo-rápida)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Scripts útiles](#-scripts-útiles)
- [Cómo usar](#-cómo-usar)
- [Detalles técnicos](#-detalles-técnicos)
- [Docker](#-docker)
- [Seguridad](#-seguridad)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## ✅ Características

- Decodificación instantánea de JWT (Header, Payload, Signature)
- Visualización en **JSON** y **tabla** de claims
- Generación de JWT (soporta HMAC-SHA256 / **HS256**) con secret
- Copiar al portapapeles (token, header o payload)
- Compartir token mediante parámetro `?token=` en la URL
- Procesamiento 100% local usando Web Crypto API (sin envío a servidores)
- Interfaz responsiva y simple

---

## 🚀 Demo rápida

1. Clona el proyecto, instala dependencias y ejecuta en modo desarrollo:

```bash
git clone https://github.com/lazxdev/Jwt-Toolkit.git
cd jwt-toolkit
npm install
npm run dev
# Abrir http://localhost:5173
```

2. Pega un JWT en el textarea o abre la app con `?token=<tu-token>` para auto-cargarlo.

---

## 🧰 Requisitos

- Node.js 18+ (recomendado)
- npm o yarn

---

## 🔧 Instalación y uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver la build en modo preview
npm run preview

# Ejecutar el linter
npm run lint
```

---

## 📝 Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Compila TypeScript y genera la build de Vite |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint en el proyecto |

---

## 📖 Cómo usar (funcionalidades principales)

- **Decodificar**: Pega un token y la app mostrará Header y Payload en JSON o en tabla.
- **Codificar**: Cambia a la vista "Encode" y genera un JWT con HS256 proporcionando un secret.
- **Copiar**: Usa los botones COPY para copiar token, header o payload.
- **Compartir**: Añade `?token=<jwt>` a la URL para cargar un token automáticamente.

> Nota: Si no se proporciona `secret` al generar un token, se crea un token sin firma (tercera parte vacía).

---

## 🔍 Detalles técnicos

- La decodificación se realiza con Base64URL y parseo JSON, con manejo de errores para tokens malformados (`src/lib/jwt.ts`).
- La firma con **HS256** se realiza mediante `crypto.subtle` (Web Crypto API) y se codifica en Base64URL.
- Tipos TS relevantes: `JWTDecodeResult`, `ViewMode`, `TabType` en `src/types`.

---

## 🐳 Docker

```bash
# Construir imagen
docker build -t jwt-toolkit .

# Ejecutar contenedor (ajusta puertos si es necesario)
docker run -p 80:3000 jwt-toolkit
```

(Verifica tu `Dockerfile` y puertos expuestos según tu configuración de producción.)

---

## ⚠️ Seguridad

- Todo el procesamiento se realiza localmente en el navegador. **No envíes tokens sensibles por URL en entornos no seguros**.
- Usa HTTPS en producción.
- Esta herramienta NO está pensada para uso en producción como verificador de firmas (actualmente solo genera y decodifica HS256; la verificación completa de firmas está en la lista de mejoras).

---

## 🤝 Contribuir

¡Contribuciones bienvenidas! Abre un issue o un pull request para proponer mejoras o correcciones. Algunas ideas:

- Añadir verificación de firmas y soporte para RS/ES
- Guardar historial de tokens
- Añadir tests y CI
- Añadir tema oscuro

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

## 👤 Autor

Lázaro Campos

---

Si detectas bugs o tienes sugerencias, abre un issue o envía un PR. ¡Gracias por tu interés! ✨
