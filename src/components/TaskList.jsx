// By: Rodrigo Herrera, Carne 202102603
// TaskList - Componente que muestra todas las tareas y estadísticas

"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import TaskItem from "./TaskItem"
import SummaryModal from "./SummaryModal"

export default function TaskList() {
  // useSelector extrae estado del store Redux
  const tasks = useSelector((state) => state.tasks)

  const [showSummary, setShowSummary] = useState(false)

  // Calcular cantidad de tareas completadas
  const completadosCount = tasks.filter((task) => task.completada).length

  return (
    <div className="task-list-container">
      {/* Sección de estadísticas */}
      <div className="stats">
        <h3>Total de tareas: {tasks.length}</h3>
        <h3>Tareas completadas: {completadosCount}</h3>
      </div>

      <button onClick={() => setShowSummary(true)} className="summary-button">
        Ver Resumen
      </button>

      <SummaryModal isOpen={showSummary} tasks={tasks} onClose={() => setShowSummary(false)} />

      {/* Mostrar mensaje si no hay tareas o listar todas */}
      {tasks.length === 0 ? (
        <p className="empty-message">No hay tareas. ¡Crea una nueva!</p>
      ) : (
        <ul className="task-list">
          {/* Renderizar cada tarea como componente TaskItem */}
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  )
}
