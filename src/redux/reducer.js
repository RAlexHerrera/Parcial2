// By: Rodrigo Herrera, Carne 202102603
// Reducer - Define cómo cambia el estado basado en acciones

const initialState = {
  tasks: [], // Array que almacena todas las tareas
}

// Función pura que recibe estado actual y acción, retorna nuevo estado
export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TASK":
      // Agregar nueva tarea al array sin mutar el estado
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            titulo: action.payload.titulo,
            completada: false,
          },
        ],
      }

    case "TOGGLE_TASK":
      // Cambiar estado de completada (true/false) de una tarea
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completada: !task.completada } : task,
        ),
      }

    case "DELETE_TASK":
      // Eliminar tarea del array filtrando por id
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }

    case "SORT_TASKS":
      // Ordenar tareas: incompletas primero, completadas después
      const incompletadas = state.tasks.filter((task) => !task.completada)
      const completadas = state.tasks.filter((task) => task.completada)
      return {
        ...state,
        tasks: [...incompletadas, ...completadas],
      }

    default:
      return state
  }
}
