// By: Rodrigo Herrera, Carne 202102603
// ConfirmModal - Modal de confirmación para acciones críticas

"use client"

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  // No renderiza si el modal no está abierto
  if (!isOpen) return null

  return (
    <>
      {/* Overlay oscuro de fondo */}
      <div className="modal-overlay" onClick={onCancel}></div>

      {/* Modal centrado */}
      <div className="modal-container">
        <div className="modal-content">
          {/* Título del modal */}
          <h2 className="modal-title">{title}</h2>

          {/* Mensaje del modal */}
          <p className="modal-message">{message}</p>

          {/* Botones de acción */}
          <div className="modal-buttons">
            <button onClick={onCancel} className="modal-btn-cancel">
              Cancelar
            </button>
            <button onClick={onConfirm} className="modal-btn-confirm">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
