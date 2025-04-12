import './Toast.css';

function Toast({mensaje}){
    if(!mensaje) return null;

    return(
        <div className="toast">
            {mensaje}
        </div>
    );
}

export default Toast;