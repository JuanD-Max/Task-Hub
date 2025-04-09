import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import './Taskboard.css';


function Taskboard() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState('');
    const [eliminandoIndex, setEliminandoIndex] = useState(null);
    const [toast, setToast] = useState(null);

    const mostrarToast = (mensaje) => {
        setToast(mensaje);
        setTimeout(() => setToast(null), 2000);
    }

    const agregarTarea = () => {
        if (nuevaTarea.trim() === '') return;
        setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
        setNuevaTarea('');
        mostrarToast('Tarea agregada ✅');
    };

    const completarTarea = (index) => {
        const tareasActualizadas = [...tareas];
        tareasActualizadas[index].completada = !tareasActualizadas[index].completada;
        setTareas(tareasActualizadas);
        mostrarToast(tareasActualizadas[index].completada ? '¡Tarea completada! 🎉' : 'Desmarcada 🚫');
    }

    const eliminarTarea = (index) => {
        setEliminandoIndex(index);
        setTimeout(() => {
            setTareas((prev) => prev.filter((_, i) => i !== index));
            setEliminandoIndex(null);
            mostrarToast('Tarea eliminada 🗑️');
        }, 300);
    };

    return (
        <section className="task-board">
            {toast && <div className="toast">{toast}</div>}

            <div className="task-header">
                <h2>📝 Mis Tareas</h2>
                <div className="task-form">
                    <input
                        type="text"
                        placeholder="Escribe una nueva tarea..."
                        value={nuevaTarea}
                        onChange={(e) => setNuevaTarea(e.target.value)}
                    />
                    <button onClick={agregarTarea}>Agregar</button>
                </div>
            </div>

            <AnimatePresence>
                <ul className="task-list">
                    {tareas.length === 0 ? (
                        <p className="sin-tareas">No tienes tareas por ahora ✨</p>
                    ) : (
                        tareas.map((t, i) => (
                            <motion.li
                                key={i}
                                className={`task-card ${t.completada ? 'completada' : ''} ${eliminandoIndex === i ? 'eliminando' : ''}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: t.completada ? 0.8 : 1,
                                    x: t.completada ? 12 : 0,
                                }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span onClick={() => completarTarea(i)}>{t.texto}</span>
                                <button className="eliminar" onClick={() => eliminarTarea(i)}>🗑️</button>
                            </motion.li>
                        ))
                    )}
                </ul>
            </AnimatePresence>
        </section>
    );
}

export default Taskboard;
