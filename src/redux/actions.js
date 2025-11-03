// By: Rodrigo Herrera, Carne 202102603
// Actions - Creadores de acciones que describe qué sucede

// Acción para agregar una nueva tarea
export const addTask = (titulo) => ({
  type: "ADD_TASK",
  payload: {
    id: Date.now(), // ID único basado en timestamp
    titulo,
  },
})

// Acción para cambiar estado completada de una tarea
export const toggleTask = (id) => ({
  type: "TOGGLE_TASK",
  payload: id,
})

// Acción para eliminar una tarea
export const deleteTask = (id) => ({
  type: "DELETE_TASK",
  payload: id,
})

// Acción para reordenar tareas (incompletas primero)
export const sortTasks = () => ({
  type: "SORT_TASKS",
})
