// By: Rodrigo Herrera, Carne 202102603
// TaskItem - Componente individual de una tarea con opciones toggle y eliminar

"use client"

import { useDispatch } from "react-redux"
import { toggleTask, deleteTask, sortTasks } from "../redux/actions"
import { useState } from "react"
import ConfirmModal from "./ConfirmModal"

export default function TaskItem({ task }) {
  // useDispatch para enviar acciones al store
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)

  // Manejar cambio de estado completada
  const handleToggle = () => {
    dispatch(toggleTask(task.id)) // Cambiar estado completada
    dispatch(sortTasks()) // Reordenar tareas
  }

  const handleDeleteClick = () => {
    setShowModal(true)
  }

  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id))
    setShowModal(false)
  }

  const handleCancelDelete = () => {
    setShowModal(false)
  }

  return (
    <>
      <li className={`task-item ${task.completada ? "completed" : ""}`}>
        {/* Checkbox para marcar como completada */}
        <input type="checkbox" checked={task.completada} onChange={handleToggle} className="task-checkbox" />
        {/* Título de la tarea */}
        <span className="task-title">{task.titulo}</span>
        {/* Botón para eliminar - ahora muestra modal */}
        <button onClick={handleDeleteClick} className="btn-delete">
          Eliminar
        </button>
      </li>

      <ConfirmModal
        isOpen={showModal}
        title="Eliminar tarea"
        message={`¿Estás seguro de que deseas eliminar "${task.titulo}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  )
}
