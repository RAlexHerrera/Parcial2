// By: Rodrigo Herrera, Carne 202102603
// SummaryModal - Modal que muestra resumen de tareas completadas y pendientes

"use client"

export default function SummaryModal({ isOpen, tasks, onClose }) {
  // No renderiza si el modal no está abierto
  if (!isOpen) return null

  // Separar tareas en completadas y pendientes
  const completadas = tasks.filter((task) => task.completada)
  const pendientes = tasks.filter((task) => !task.completada)

  return (
    <>
      {/* Overlay oscuro de fondo */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Modal centrado */}
      <div className="modal-container">
        <div className="modal-content modal-summary">
          {/* Título del modal */}
          <h2 className="modal-title">Resumen de Tareas</h2>

          {/* Sección de tareas pendientes */}
          <div className="summary-section">
            <h3 className="summary-section-title pending-title">Tareas Pendientes ({pendientes.length})</h3>
            {pendientes.length === 0 ? (
              <p className="summary-empty">No hay tareas pendientes</p>
            ) : (
              <ul className="summary-list">
                {pendientes.map((task) => (
                  <li key={task.id} className="summary-item">
                    {task.titulo}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sección de tareas completadas */}
          <div className="summary-section">
            <h3 className="summary-section-title completed-title">Tareas Completadas ({completadas.length})</h3>
            {completadas.length === 0 ? (
              <p className="summary-empty">No hay tareas completadas</p>
            ) : (
              <ul className="summary-list">
                {completadas.map((task) => (
                  <li key={task.id} className="summary-item completed-item">
                    ✓ {task.titulo}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botón cerrar */}
          <div className="modal-buttons">
            <button onClick={onClose} className="modal-btn-confirm">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
