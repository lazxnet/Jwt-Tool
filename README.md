# JWT Toolkit

Una herramienta web moderna e intuitiva para **decodificar**, **codificar** y **analizar** JSON Web Tokens (JWT) directamente en tu navegador. Construida con React, TypeScript y Vite.

##  Caracteristicas

-  **Decodificación de JWT**: Desglose automático de tokens en Header, Payload y Signature
-  **Codificación de JWT**: Genera tokens JWT con algoritmos HMAC (HS256)
-  **Análisis Visual**: Visualización clara de claims en formato tabla
-  **Copiar al Portapapeles**: Copia rápida de componentes individuales del JWT
-  **URL Sharing**: Comparte tokens directamente vía parámetros de URL
-  **Validación en Tiempo Real**: Valida la estructura y formato de JWT automáticamente
-  **Interfaz Responsiva**: Funciona perfectamente en desktop, tablet y móvil
-  **Sin Dependencias Externas de JWT**: Implementación nativa usando Web Crypto API

##  Inicio Rápido

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/lazxnet/jwt-toolkit.git
cd jwt-toolkit

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en http://localhost:5173

### Build para Producción

```bash
# Compilar y generar archivos optimizados
npm run build

# Previsualizar la build de producción
npm run preview
```

##  Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|-----------|
| **React 19** | Framework UI moderno |
| **TypeScript** | Type safety y mejor DX |
| **Vite** | Build tool rápido y moderno |
| **Web Crypto API** | Operaciones criptográficas nativas |
| **ESLint** | Linting y code quality |

##  Estructura del Proyecto

```
src/
 components/          # Componentes reutilizables
    ClaimsTable/    # Tabla de visualización de claims
    DecodeView/     # Vista de decodificación
    EncodeView/     # Vista de codificación
 lib/                 # Lógica de negocio
    jwt.ts          # Funciones de encode/decode JWT
    clipboard.ts    # Utilidades de portapapeles
 styles/             # Temas y estilos
 types/              # Definiciones de TypeScript
 constants/          # Configuraciones por defecto
```

##  Características Técnicas Destacadas

### Decodificación de JWT
- Decodificación Base64URL con validación
- Parsing automático de JSON
- Manejo robusto de errores
- Soporte para tokens malformados

### Codificación de JWT
- Generación de tokens con HMAC-SHA256
- Validación de JSON antes de codificar
- Interfaz para personalizar Header, Payload y Secret
- Soporte para diferentes algoritmos

### Web Crypto API
Implementación nativa de operaciones criptográficas sin dependencias externas:

```typescript
// Firma con HMAC-SHA256
const key = await crypto.subtle.importKey(
  'raw',
  encoder.encode(secret),
  { name: 'HMAC', hash: 'SHA-256' },
  false,
  ['sign']
);
const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
```

##  Casos de Uso

-  **Debugging**: Inspecciona rápidamente el contenido de tus JWTs
-  **Testing**: Genera tokens de prueba con payloads personalizados
-  **Educacion**: Aprende cómo funciona la estructura de JWT
-  **Verificación**: Valida la integridad de tokens existentes
-  **Desarrollo**: Integra fácilmente en tu flujo de trabajo

##  Deployment con Docker

```bash
# Construir imagen
docker build -t jwt-toolkit .

# Ejecutar contenedor
docker run -p 80:3000 jwt-toolkit
```

La aplicación está optimizada para ejecutarse en contenedores y está lista para production.

##  Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| 
pm run dev | Inicia servidor de desarrollo con HMR |
| 
pm run build | Compila y optimiza para producción |
| 
pm run lint | Ejecuta ESLint en todo el proyecto |
| 
pm run preview | Previsualiza la build de producción |

##  Seguridad

-  **Nota Importante**: Esta herramienta se ejecuta completamente en el navegador. **No envíes tokens con datos sensibles a través de la URL.**
- Todos los cálculos criptográficos se realizan localmente
- No se envían datos a servidores externos
- Usa HTTPS siempre en producción

##  Mejoras Futuras

- [ ] Soporte para múltiples algoritmos de firma (RS256, ES256, etc.)
- [ ] Verificación de firmas
- [ ] Historial de tokens
- [ ] Tema oscuro
- [ ] Exportar/Importar configuraciones
- [ ] Soporte para JWE (Encrypted JWT)

##  Licencia
s
Este proyecto está bajo la licencia [Especificar tu licencia - ej: MIT, Apache 2.0]

##  Autor

**Lázaro Campos** - [GitHub](https://github.com/lazxdev)

---

Tienes sugerencias o encontraste un bug? Abre un [issue](https://github.com/lazxnet/jwt-toolkit/issues) o un [pull request](https://github.com/lazxnet/jwt-toolkit/pulls).
