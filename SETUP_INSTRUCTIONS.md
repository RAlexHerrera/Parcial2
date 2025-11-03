# TaskBoard Setup Instructions

## Requisitos del Entorno
- Node.js: v24.11.0
- npm: 11.6.1
- React: 19.2.0
- React-DOM: 19.2.0

## Instalación y Ejecución

### Paso 1: Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### Paso 2: Ejecutar el servidor de desarrollo
\`\`\`bash
npm run dev
\`\`\`

### Paso 3: Acceder a la aplicación
Abre tu navegador y ve a:
\`\`\`
http://localhost:3000
\`\`\`

## ¿Qué sucede al ejecutar estos comandos?

1. `npm install`: Descarga e instala todas las dependencias del proyecto listadas en package.json
2. `npm run dev`: Inicia el servidor Next.js en modo desarrollo con hot-reload automático
3. La aplicación estará disponible en localhost:3000

## Estructura del Proyecto

\`\`\`
TaskBoard/
├── app/                          # Archivos de Next.js
│   ├── layout.tsx               # Layout raíz
│   ├── page.tsx                 # Página principal
│   └── globals.css              # Estilos globales
├── src/                         # Lógica de la aplicación
│   ├── redux/
│   │   ├── store.js            # Configuración de Redux
│   │   ├── reducer.js          # Lógica de cambios de estado
│   │   └── actions.js          # Acciones de Redux
│   ├── components/
│   │   ├── TaskForm.jsx        # Formulario para agregar tareas
│   │   ├── TaskList.jsx        # Lista de tareas
│   │   ├── TaskItem.jsx        # Item individual
│   │   ├── ConfirmModal.jsx    # Modal de confirmación
│   │   └── SummaryModal.jsx    # Modal de resumen
│   └── App.jsx                 # Componente raíz
├── components/ui/              # Componentes UI de Shadcn/UI
├── package.json                # Dependencias del proyecto
└── README.md
\`\`\`

## Dependencias Principales

- **Next.js 16.0.0**: Framework React
- **React 19.2.0**: Biblioteca de UI
- **Redux 5.0.1**: Gestión de estado
- **React-Redux 9.2.0**: Integración Redux con React
- **Tailwind CSS 4.1.9**: Framework de estilos
- **Radix-UI**: Componentes accesibles

## ¿Qué hacer si hay errores?

### Error: "Cannot find module 'react'"
\`\`\`bash
npm install --save react react-dom
\`\`\`

### Error: "Port 3000 already in use"
\`\`\`bash
npm run dev -- -p 3001
\`\`\`
(O usa otro puerto reemplazando 3001)

### Error: "Module not found"
Borra node_modules y pnpm-lock.yaml, luego ejecuta:
\`\`\`bash
npm install
npm run dev
\`\`\`

## Características de TaskBoard

✓ Agregar nuevas tareas
✓ Marcar tareas como completadas/pendientes
✓ Eliminar tareas (con modal de confirmación)
✓ Ver resumen de tareas (modal con tareas pendientes y completadas)
✓ Estado manejado con Redux
✓ Interfaz responsive con Tailwind CSS
✓ Color de fondo escarlata cómodo para la vista

## Stack Tecnológico

- **Frontend**: React 19.2.0 + Next.js 16.0.0
- **State Management**: Redux 5.0.1 + React-Redux 9.2.0
- **Styling**: Tailwind CSS 4.1.9
- **Componentes**: Radix-UI + Shadcn/UI
- **Node Runtime**: v24.11.0
- **Package Manager**: npm 11.6.1

## Comandos Disponibles

\`\`\`bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye la app para producción
npm start        # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
\`\`\`

---

**By: Rodrigo Herrera, Carne 202102603**
