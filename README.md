# TaskBoard - Gestor de Tareas Interactivo

---

## Descripción

**TaskBoard**

El propósito principal es demostrar la implementación correcta de patrones de gestión de estado con Redux en aplicaciones React funcionales, permitiendo que múltiples componentes accedan y modifiquen el estado global de forma coordinada.
Video:
https://youtu.be/RrqEovFBIJI
<div align="center">
  <a href="https://www.youtube.com/watch?v=RrqEovFBIJI" target="_blank">
    <img src="https://img.youtube.com/vi/RrqEovFBIJI/0.jpg" alt="Introducción a Redux" style="width: 100%; max-width: 560px;">
  </a>
</div>

### Características Principales

- **Agregar nuevas tareas** - Crea tareas rápidamente desde el formulario intuitivo
- **Marcar completadas/pendientes** - Cambia el estado de tus tareas con un clic
- **Eliminar tareas** - Elimina tareas con confirmación modal para evitar acciones accidentales
- **Resumen de tareas** - Visualiza estadísticas de tareas pendientes y completadas
- **Interfaz responsiva** - Compatible con dispositivos móviles y de escritorio
- **Gestión de estado centralizada** - Redux garantiza consistencia y previsibilidad

---

## ¿Por qué React, Redux y Reducers?

### React - Interfaz de Usuario Declarativa

React es la biblioteca elegida para la UI porque ofrece:

- **Reactividad**: Los componentes se actualizan automáticamente cuando cambia el estado
- **Componentización**: Código modular y reutilizable
- **Performance**: Virtual DOM para renderizaciones eficientes
- **Ecosistema maduro**: Amplia comunidad y librerías disponibles

Esto es ideal para aplicaciones dinámicas como TaskBoard, donde los componentes necesitan reflejarse inmediatamente con los cambios de estado.

### Redux - Gestión de Estado Global

**Redux** es un gestor de estado predictible que centraliza toda la lógica de cambios de estado. Es especialmente útil cuando múltiples componentes necesitan acceder a los mismos datos sin tener que pasar props a través de múltiples niveles (prop drilling).

**¿Por qué Redux en lugar de useState?**

- **Single Source of Truth**: Un único objeto `store` contiene todo el estado de la aplicación
- **Previsibilidad**: Los cambios de estado son predecibles, trazables y reproducibles
- **Debugging avanzado**: Redux DevTools permite revisar cada acción y cómo cambió el estado en el tiempo
- **Escalabilidad**: Ideal para aplicaciones con múltiples componentes que necesitan compartir estado complejo
- **Separación de responsabilidades**: La lógica de estado está separada de los componentes
- **Testing**: Más fácil de testear porque los reducers son funciones puras

En TaskBoard, en lugar de pasar tareas entre componentes mediante props, todos acceden al estado global a través de Redux.

### Reducers - Transformación Predecible del Estado

**Los reducers son funciones puras** que especifican cómo el estado cambia en respuesta a acciones:

\`\`\`
reducer = (estado_anterior, acción) => nuevo_estado
\`\`\`

Cada reducer recibe el estado actual y una acción, y retorna el nuevo estado sin modificar el original. Esto garantiza que los cambios de estado sean predecibles y trazables.

**Reglas importantes de los Reducers:**
- Son funciones puras (mismo input siempre produce el mismo output)
- No modifican el estado anterior directamente
- Retornan un nuevo estado
- Usan spread operator `...` para garantizar inmutabilidad

---

## Componentes Fundamentales de Redux

### 1. Store (Almacén Global)

El **store** es el objeto central que contiene todo el estado de la aplicación:

\`\`\`javascript
// src/redux/store.js
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);
export default store;
\`\`\`

**Características:**
- Un único objeto que representa el estado completo de la aplicación
- Se conecta a React mediante `<Provider store={store}>`
- Los componentes pueden suscribirse a cambios del store usando `useSelector`
- En TaskBoard, el store contiene: `{ tasks: [] }`

### 2. Reducer (Transformador de Estado)

Los **reducers** son funciones puras que especifican cómo el estado cambia:

\`\`\`javascript
// src/redux/reducer.js
const initialState = {
  tasks: []
};

export default function taskReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload 
            ? { ...task, completada: !task.completada }
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
}
\`\`\`

**Papel del reducer:**
- Define exactamente cómo el estado responde a cada acción
- Actúa como el "cerebro" de la lógica de cambios de estado
- Centraliza toda la lógica de transformación de estado en un solo lugar
- Facilita debugging y testing

### 3. Action (Descripción del Evento)

Una **action** es un objeto que describe qué sucedió. Siempre tiene una propiedad `type` y puede incluir un `payload` con datos adicionales:

\`\`\`javascript
// Acción para agregar una tarea
{
  type: 'ADD_TASK',
  payload: { 
    id: 1699000000000, 
    titulo: 'Hacer tarea', 
    completada: false 
  }
}

// Acción para marcar tarea como completada
{
  type: 'TOGGLE_TASK',
  payload: 1699000000000  // ID de la tarea
}

// Acción para eliminar una tarea
{
  type: 'DELETE_TASK',
  payload: 1699000000000  // ID de la tarea
}
\`\`\`

### 4. Dispatch (Envío de Acciones)

El **dispatch** es la única forma de enviar acciones al store. Es la función que comunica al reducer qué acción se debe procesar:

\`\`\`javascript
// En un componente
import { useDispatch } from 'react-redux';

function TaskForm() {
  const dispatch = useDispatch();

  const handleAddTask = (taskData) => {
    // Dispatch envía una acción al reducer
    dispatch({
      type: 'ADD_TASK',
      payload: taskData
    });
  };

  return (
    <button onClick={() => handleAddTask(newTask)}>
      Agregar Tarea
    </button>
  );
}
\`\`\`

**Flujo de Redux:**
\`\`\`
Usuario interactúa
      ↓
dispatch() envía acción
      ↓
reducer procesa la acción
      ↓
store actualiza su estado
      ↓
useSelector() notifica cambios
      ↓
componentes se re-renderizan con nuevo estado
      ↓
UI se actualiza para reflejar el nuevo estado
\`\`\`

---

## Uso Correcto de Redux en TaskBoard

### Dispatch - En Acción

El **dispatch** se utiliza para enviar acciones al reducer:

\`\`\`javascript
// TaskForm.jsx: Agregar nueva tarea
const dispatch = useDispatch();
dispatch({ type: 'ADD_TASK', payload: newTask });

// TaskItem.jsx: Marcar tarea como completada
const dispatch = useDispatch();
dispatch({ type: 'TOGGLE_TASK', payload: taskId });

// TaskItem.jsx: Eliminar una tarea
const dispatch = useDispatch();
dispatch({ type: 'DELETE_TASK', payload: taskId });
\`\`\`

**Regla clave:** Dispatch es la ÚNICA forma de cambiar el estado en Redux.

### Reducer - Transformación de Estado

El reducer recibe el estado actual y la acción, y retorna el nuevo estado:

\`\`\`javascript
// El reducer NUNCA modifica directamente el estado anterior
// Siempre retorna un nuevo objeto

case 'ADD_TASK':
  // CORRECTO: Crea un nuevo array
  return { ...state, tasks: [...state.tasks, action.payload] };
  
  // INCORRECTO: Mutar el array directamente
  // state.tasks.push(action.payload); ❌

case 'TOGGLE_TASK':
  // CORRECTO: Crea un nuevo array con map
  return {
    ...state,
    tasks: state.tasks.map(task =>
      task.id === action.payload 
        ? { ...task, completada: !task.completada }  // Nuevo objeto
        : task
    )
  };
\`\`\`

**Regla clave:** Los reducers son funciones PURAS que no modifican el estado original.

### Store - Acceso al Estado Global

El store contiene todo el estado y es accedido desde componentes usando `useSelector`:

\`\`\`javascript
import { useSelector } from 'react-redux';

function TaskList() {
  // useSelector se suscribe a cambios del store
  // Solo se re-renderiza cuando tasks cambia
  const tasks = useSelector(state => state.tasks);
  
  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
\`\`\`

**Regla clave:** El store es la fuente única de verdad. Todos los componentes leen de aquí.

---

## Acciones Implementadas

### ADD_TASK - Agregar Nueva Tarea

Agrega una nueva tarea al estado global. Cada tarea tiene:
- `id`: Identificador único (timestamp)
- `titulo`: Texto descriptivo de la tarea
- `completada`: Estado booleano

\`\`\`javascript
dispatch({
  type: 'ADD_TASK',
  payload: {
    id: Date.now(),
    titulo: 'Nueva tarea',
    completada: false
  }
});
\`\`\`

### TOGGLE_TASK - Cambiar Estado de Completitud

Cambia el estado de completitud de una tarea específica:

\`\`\`javascript
dispatch({
  type: 'TOGGLE_TASK',
  payload: taskId  // ID de la tarea a marcar/desmarcar
});
\`\`\`

### DELETE_TASK - Eliminar Tarea

Elimina una tarea del estado global:

\`\`\`javascript
dispatch({
  type: 'DELETE_TASK',
  payload: taskId  // ID de la tarea a eliminar
});
\`\`\`

## Requisitos del Entorno

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v24.11.0 o superior
- **npm**: 11.6.1 o superior
- **Git**: para clonar el repositorio

Puedes verificar tus versiones con:
\`\`\`bash
node --version
npm --version
\`\`\`

---

## Instalación y Ejecución

### Paso 1: Clonar el repositorio
\`\`\`bash
git clone https://github.com/RAlexHerrera/Parcial2.git
cd Parcial2
\`\`\`

### Paso 2: Instalar dependencias
\`\`\`bash
npm install
\`\`\`
Este comando descarga e instala todas las dependencias del proyecto listadas en `package.json`.

### Paso 3: Ejecutar el servidor de desarrollo
\`\`\`bash
npm run dev
\`\`\`
Inicia el servidor Next.js en modo desarrollo con hot-reload automático.

### Paso 4: Acceder a la aplicación
Abre tu navegador y ve a:
\`\`\`
http://localhost:3000
\`\`\`

La aplicación estará disponible y lista para usar.

---

## Estructura del Proyecto

\`\`\`
Parcial2/
├── app/                          # Archivos de Next.js
│   ├── layout.tsx               # Layout raíz
│   ├── page.tsx                 # Página principal
│   └── globals.css              # Estilos globales
├── src/                         # Lógica de la aplicación
│   ├── redux/
│   │   ├── store.js            # Configuración de Redux y estado inicial
│   │   ├── reducer.js          # Lógica de cambios de estado (ADD_TASK, TOGGLE_TASK, DELETE_TASK)
│   │   └── actions.js          # Acciones de Redux
│   ├── components/
│   │   ├── TaskForm.jsx        # Formulario para agregar tareas
│   │   ├── TaskList.jsx        # Lista de tareas
│   │   ├── TaskItem.jsx        # Componente de tarea individual
│   │   ├── ConfirmModal.jsx    # Modal de confirmación para eliminar
│   │   └── SummaryModal.jsx    # Modal de resumen de tareas
│   └── App.jsx                 # Componente raíz
├── components/ui/              # Componentes UI reutilizables de Shadcn/UI
├── hooks/                       # Custom hooks personalizados
├── lib/                         # Utilidades y funciones auxiliares
├── public/                      # Archivos estáticos
├── styles/                      # Estilos adicionales
├── package.json                # Dependencias del proyecto
├── next.config.mjs             # Configuración de Next.js
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Este archivo
\`\`\`

---

## Conceptos Clave: Redux, Dispatch y Store

### Store (Tienda)
El **store** es el objeto central que contiene todo el estado de la aplicación:
\`\`\`javascript
// src/redux/store.js
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);
export default store;
\`\`\`
- **Un único objeto** que representa el estado completo
- Se conecta a React mediante `<Provider store={store}>`
- Los componentes pueden suscribirse a cambios del store

### Reducers (Reductores)
Los **reducers** son funciones puras que especifican cómo el estado cambia:
\`\`\`javascript
// src/redux/reducer.js
const initialState = {
  tasks: [],
  filter: 'all'
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
}
\`\`\`

**Reglas importantes de los Reducers:**
- Son funciones **puras** (mismo input = mismo output)
- No modifican el estado anterior directamente
- Retornan un nuevo estado
- Usan spread operator `...` para inmutabilidad

### Dispatch (Envío)
El **dispatch** es la única forma de enviar acciones al store:
\`\`\`javascript
// En un componente
import { useDispatch } from 'react-redux';

function TaskForm() {
  const dispatch = useDispatch();

  const handleAddTask = (taskData) => {
    // Dispatch envía una acción al reducer
    dispatch({
      type: 'ADD_TASK',
      payload: taskData
    });
  };

  return (
    <button onClick={() => handleAddTask(newTask)}>
      Agregar Tarea
    </button>
  );
}
\`\`\`

**Flujo Redux:**
\`\`\`
Componente → dispatch(acción) → reducer → nuevo estado → componente se actualiza
\`\`\`

---


## Solución de Problemas

### Error: "Cannot find module 'react'"
\`\`\`bash
npm install --save react react-dom
\`\`\`

### Error: "Port 3000 already in use"
\`\`\`bash
# Ejecutar en un puerto diferente (ej. 3001)
npm run dev -- -p 3001
\`\`\`

### Error: "Module not found"
\`\`\`bash
# Limpiar cache y reinstalar dependencias
rm -rf node_modules
npm install
npm run dev
\`\`\`

### Aplicación lenta o no se actualiza
- Limpia el cache del navegador (Ctrl+Shift+Delete)
- Reinicia el servidor de desarrollo
- Verifica que los hooks de Redux estén correctamente importados

## Cómo Usar la Aplicación

1. **Agregar una tarea**: Escribe el título en el formulario y presiona "Agregar"
2. **Completar una tarea**: Haz clic en la casilla de verificación
3. **Marcar como pendiente**: Haz clic nuevamente en la casilla
4. **Eliminar una tarea**: Presiona el botón eliminar y confirma en el modal
5. **Ver resumen**: Abre el modal de resumen para ver estadísticas

---


n**: Noviembre 2025
