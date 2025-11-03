// By: Rodrigo Herrera, Carne 202102603
// TaskForm - Formulario para crear nuevas tareas

"use client"

import { useDispatch } from "react-redux"
import { addTask, sortTasks } from "../redux/actions"
import { useState } from "react"

export default function TaskForm() {
  // useDispatch permite enviar acciones al store
  const dispatch = useDispatch()
  // Estado local para capturar el texto del input
  const [input, setInput] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (input.trim()) {
      dispatch(addTask(input)) // Enviar acción de agregar tarea
      dispatch(sortTasks()) // Reordenar tareas después de agregar
      setInput("") // Limpiar input
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="titulo"
        placeholder="Escribe una nueva tarea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="btn-add">
        Agregar Tarea
      </button>
    </form>
  )
}
