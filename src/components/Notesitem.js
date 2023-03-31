
import { useContext } from "react";
import noteContext from "../contaxt/noteContaxt.js";

const Notesitem = (props) => {
    const note_contaxt=useContext(noteContext);
    const {openModal,deleteNote}=note_contaxt;
   
    
    return (<>
        
        <div className="card col-md-3 mx-4 my-4" >
            <div className="card-header d-flex justify-content-end">
            <i className="fa fa-trash " aria-hidden="true" onClick={()=>{deleteNote(props.note._id);}} ></i><i className="fas fa-edit mx-2" onClick={ ()=>{props.open_modal(props.note)} }></i>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </>);

}
export default Notesitem;