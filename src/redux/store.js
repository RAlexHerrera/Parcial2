// By: Rodrigo Herrera, Carne 202102603
// Redux Store - Centro de gestión de estado global de la aplicación

import { createStore } from "redux"
import { taskReducer } from "./reducer"

// Crear y exportar el store que contiene todo el estado de la app
export const store = createStore(taskReducer)
