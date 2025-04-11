import axios from "axios";

const API_URL = 'http://localhost:5297/api/tareas';

export const obtenerTareas = ()=> axios.get(API_URL);
export const crearTarea = (tarea) => axios.post(API_URL, tarea);