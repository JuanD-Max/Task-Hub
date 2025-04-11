namespace Taskapi.Models
{
    public class Tarea
    {
        public int Id {get;set;}
        public string Texto {get;set;} = string.Empty;
        public bool Completada {get;set;}
    }
}