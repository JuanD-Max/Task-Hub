import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import './Taskboard.css';
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea as eliminarApi } from "./services/taskService";
import Toast from "./Toast";

function Taskboard() {
    const [tareas, setTareas] = useState(() => {
        const guardadas = localStorage.getItem('tareas');
        return guardadas ? JSON.parse(guardadas) : [];
    })
    const [nuevaTarea, setNuevaTarea] = useState('');
    const [eliminandoIndex, setEliminandoIndex] = useState(null);
    const [toast, setToast] = useState(null);
    const [editandoIndex, setEditandoIndex] = useState(null);
    const [textoEditado, setTextoEditado] = useState('');
    const [filtro, setFiltro] = useState('todas');

    // 🧠 Recuperar tareas de localStorage al cargar
    useEffect(() => {
        obtenerTareas().then(res =>{
            setTareas(res.data);
        }).catch(err => {
            console.error("Error al obtener tareas", err)
        })
    }, []);

    // 💾 Guardar tareas en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]);

    const mostrarToast = (mensaje) => {
        setToast(mensaje);
        setTimeout(() => setToast(null), 2000);
    };

    const agregarTarea = () => {
        if (nuevaTarea.trim() === '') return;
        const nueva = {texto: nuevaTarea, completada: false};
        crearTarea(nueva).then(res => {
            setTareas([...tareas, res.data]);
            setNuevaTarea('');
            mostrarToast('Tarea agregada ✅');
        }).catch(err => {
            console.error("Error al agregar tarea", err);
        });
    };

    const completarTarea = (index) => {
        const tareaOriginal = tareas[index];
        const tareaActualizada = {...tareaOriginal, completada: !tareaOriginal.completada};

        actualizarTarea(tareaOriginal.id, tareaActualizada)
            .then(()=>{
                const tareasActualizadas = [...tareas];
                tareasActualizadas[index] = tareaActualizada;
                setTareas(tareasActualizadas);
                mostrarToast(tareaActualizada.completada ? 'Tarea Completada! ✅':'Desmarcada ⛔');
            })
            .catch(err => console.error("Error al actualizar tarea", err));
    };

    const eliminarTarea = (index) => {
        const tarea = tareas[index];
        setEliminandoIndex(index);
        setTimeout(() => {
            eliminarApi(tarea.id).then(()=>{
                setTareas(prev => prev.filter((_, i) => i !== index));
                setEliminandoIndex(null);
                mostrarToast('Tarea eliminada 🗑️');
            })
            .catch(err => console.error("Error al eliminar tarea", err));
        }, 300);
    };

    const iniciarEdicion = (index, texto) => {
        setEditandoIndex(index);
        setTextoEditado(texto);
    };

    const guardarEdicion = (index) => {
        const tareaOriginal = tareas[index]        ;
        const tareaActualizada = {
            ...tareaOriginal,
            texto: textoEditado.trim() || tareaOriginal.texto
        };

        actualizarTarea(tareaOriginal.id, tareaActualizada)
            .then(()=>{
                const nuevas = [...tareas];
                nuevas[index] = tareaActualizada;
                setTareas(nuevas);
                setEditandoIndex(null);
                setTextoEditado('');
                mostrarToast('Tarea Actualizada ✏️');
            })
            .catch(err => console.error("Error al editar tarea", err));
    };

    const tareasFiltradas = tareas.filter(t=>{
        if(filtro === 'completadas') return t.completada;
        if(filtro === 'pendientes') return !t.completada;
        return true;
    })

    return (
        <section className="task-board">
            <Toast mensaje={toast}/>

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
                <div className="filtro-tareas">
                    <button onClick={()=> setFiltro('todas')} className={filtro === 'todas' ? 'activo' :''}>Todas</button>
                    <button onClick={()=> setFiltro('pendientes')} className={filtro === 'pendientes' ? 'activo': ''}>Pendientes</button>
                    <button onClick={()=> setFiltro('completadas')} className = {filtro === 'completadas' ? 'activo':''}>Completadas</button>
                </div>
            </div>

            <AnimatePresence>
                <ul className="task-list">
                    {tareas.length === 0 ? (
                        <p className="sin-tareas">No tienes tareas por ahora ✨</p>
                    ) : (
                        tareasFiltradas.map((t, i) => (
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
                                {editandoIndex === i ? (
                                    <input
                                        type="text"
                                        className="editar-input"
                                        value={textoEditado}
                                        autoFocus
                                        onChange={(e) => setTextoEditado(e.target.value)}
                                        onBlur={() => guardarEdicion(i)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') guardarEdicion(i);
                                        }}
                                    />
                                ) : (
                                    <span
                                        onClick={() => completarTarea(i)}
                                        onDoubleClick={(e) => {
                                            e.stopPropagation();
                                            iniciarEdicion(i, t.texto);
                                        }}
                                    >
                                        {t.texto}
                                    </span>
                                )}
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
