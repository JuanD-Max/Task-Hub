using Microsoft.AspNetCore.Mvc;
using Taskapi.Models;

namespace Taskapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TareasController:ControllerBase
    {
        private static List<Tarea> tareas = new List<Tarea>
        {
            new Tarea {Id = 1, Texto = "Aprender .Net", Completada = false},
            new Tarea {Id = 2, Texto = "Conectar con React", Completada = true}
        };
        [HttpGet]
        public ActionResult<IEnumerable<Tarea>> Get()=> tareas;
        [HttpPost]
        public ActionResult<Tarea> Post(Tarea nueva)
        {
            nueva.Id = tareas.Count + 1;
            tareas.Add(nueva);
            return CreatedAtAction(nameof(Get), new { id = nueva.Id }, nueva);
        }
    }
}