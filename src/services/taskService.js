import axios from "axios";

const API_URL = 'http://localhost:5297/api/tareas';

export const obtenerTareas = ()=> axios.get(API_URL);
export const crearTarea = (tarea) => axios.post(API_URL, tarea);
export const actualizarTarea = (id, tarea) => axios.put(`${API_URL}/${id}`, tarea);
export const eliminarTarea = (id) => axios.delete(`${API_URL}/${id}`);