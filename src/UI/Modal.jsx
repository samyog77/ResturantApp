import {createPortal} from 'react-dom';
export default function Modal({children, open, className = ''}){
    const dialog = useRef();

    useEffect(() => {
        if (open) {

        }    
    }, [open]);
    return createPortal(
        <dialog ref ={dialog} className ={`modal ${className}`}>{children}</dialog>, 
        document.getElementById('modal')
    );       
}