import {useContext} from "react";
import noteContext from "../contaxt/noteContaxt.js";


const Addnote = () => {
   const note_contaxt=useContext(noteContext);
   const {addNote}=note_contaxt;
   
    const AddNewNote=(e)=>{
       e.preventDefault();
       let title=document.getElementById("title");
       let description=document.getElementById("description");
       let user_id=JSON.parse(localStorage.getItem('id'));
       //console.log(`id is ${user_id}`);
       addNote(title.value,description.value,user_id);
       description.value="";
       title.value="";
    }
    return (<>
   <div className="card my-5 mx-3 p-4 col-md-10">
    <h1>Add note</h1>
    <hr/>
    <div className="">
        <form>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Note title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"/>
                   
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Note description</label>
                <input type="text" className="form-control" id="description" name="description"/>
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={AddNewNote}>Submit</button>
        </form>
        </div>
        </div>
    </>);
}

export default Addnote;