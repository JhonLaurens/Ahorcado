# 🎯 Hangman Game - Juego del Ahorcado

Un juego del ahorcado moderno construido con **React 18**, **Vite**, y **SQLite** para navegadores.

![Hangman Game Preview](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![SQLite](https://img.shields.io/badge/SQLite-WASM-003B57?style=for-the-badge&logo=sqlite)

## ✨ Características

### 🎮 Mecánicas de Juego

- ⏱️ **Timer descendente**: 90 segundos iniciales
- ❌ **Penalización**: -8 segundos por error
- 🎯 **Máximo 6 errores** permitidos
- ⌨️ **Control por teclado** únicamente
- 📊 **Sistema de puntuación**: `tiempo_restante × letras_correctas`

### 🎨 Efectos Visuales

- 🔤 **Animación de letras**: Tiemblan cada 15 segundos
- 💫 **Animaciones CSS** suaves y modernas
- 🎭 **Dibujo del ahorcado** en ASCII art
- 🏆 **Efectos de celebración** al ganar

### 💾 Base de Datos Local

- 🗃️ **SQLite en navegador** con sql.js (WASM)
- 📈 **Leaderboard** en tiempo real
- 📊 **Estadísticas** de jugador
- 🔄 **Persistencia local** automática

### 📱 Diseño Responsivo

- 🖥️ **Layout desktop**: Juego a la izquierda, leaderboard a la derecha
- 📱 **Layout móvil**: Diseño apilado optimizado
- 🎯 **Accesibilidad** completa con navegación por teclado

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El juego estará disponible en http://localhost:5173
```

### Construcción para Producción

```bash
# Construir para producción
npm run build

# Previsualizar la construcción
npm run preview
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── HangmanGame.jsx   # Componente principal
│   ├── MainMenu.jsx      # Menú principal
│   ├── GameBoard.jsx     # Tablero de juego
│   ├── WordDisplay.jsx   # Mostrar palabra
│   ├── Timer.jsx         # Temporizador
│   ├── WrongGuesses.jsx  # Errores cometidos
│   ├── HangmanDrawing.jsx # Dibujo ASCII
│   ├── Leaderboard.jsx   # Tabla de puntuaciones
│   └── GameModal.jsx     # Modal de fin de juego
├── context/              # Context API
│   └── GameContext.jsx   # Estado global del juego
├── hooks/                # Custom hooks
│   └── useGame.js        # Hook del contexto de juego
├── utils/                # Utilidades
│   ├── constants.js      # Constantes del juego
│   ├── database.js       # Gestor de SQLite
│   └── gameLogic.js      # Lógica de juego
├── styles/               # Archivos CSS
│   └── ...               # Estilos modulares
└── App.jsx              # Componente raíz
```

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de UI con hooks
- **Vite** - Build tool ultra-rápido
- **CSS Grid/Flexbox** - Layout responsivo
- **CSS Animations** - Efectos visuales

### Base de Datos

- **sql.js** - SQLite compilado a WebAssembly
- **Local Storage** - Persistencia en navegador

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **PropTypes** - Validación de props

## 🎯 Flujo del Juego

1. **Menú Principal** - Mostrar reglas y comenzar
2. **Selección de Palabra** - Palabra aleatoria del pool
3. **Gameplay** - Input por teclado únicamente
4. **Timer** - Cuenta regresiva con penalizaciones
5. **Win/Lose** - Modal con captura de nombre
6. **Leaderboard** - Actualización automática

## 📊 Sistema de Puntuación

```javascript
puntuación = tiempo_restante × letras_correctas
```

## 🌐 Deploy en Netlify

### Configuración para Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Node Version**: `18.x`

El proyecto usa **sql.js** que funciona perfectamente en entornos estáticos como Netlify:

- ✅ **Sin backend necesario**
- ✅ **Base de datos local en el navegador**
- ✅ **Funciona offline después de la primera carga**
- ✅ **Compatible con todos los navegadores modernos**

## 🎮 Controles de Juego

| Tecla     | Acción          |
| --------- | --------------- |
| `A-Z`     | Adivinar letra  |
| `Espacio` | Pausar/Reanudar |
| `Escape`  | Pausar/Reanudar |

## 🔧 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Construcción para producción
npm run preview    # Previsualizar construcción
npm run lint       # Linting de código
npm run clean      # Limpiar archivos temporales
```

---

⭐ **¡Proyecto completo de Hangman Game con React + Vite + SQLite!** ⭐

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres agregar nuevas características o mejorar las existentes:

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para demostrar las capacidades de React + Vite + SQLite en el navegador.
