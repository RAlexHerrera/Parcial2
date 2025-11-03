// By: Rodrigo Herrera, Carne 202102603
// App - Componente raíz que proporciona Redux Store a toda la aplicación
"use client"

import { Provider } from "react-redux"
import { store } from "./redux/store"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import "./App.css"

export default function App() {
  return (
    // Provider envuelve la app y proporciona acceso al store Redux
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header">
          <h1>TaskBoard</h1>
          <p>By: Rodrigo Herrera, Carne 202102603</p>
        </header>

        <main className="app-main">
          <TaskForm /> {/* Componente para agregar nuevas tareas */}
          <TaskList /> {/* Componente para mostrar todas las tareas */}
        </main>

        <footer className="app-footer">
          <p>React + Redux</p>
        </footer>
      </div>
    </Provider>
  )
}
