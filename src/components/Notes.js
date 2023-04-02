import { useContext,useRef } from "react";
import noteContext from "../contaxt/noteContaxt.js";
import Notesitem from "../components/Notesitem.js";
const Notes = () => {


  const note_data = useContext(noteContext);
  const { fetchNote,note,updateNote } = note_data;
  //console.log(note_data);
  const openModal = useRef(null);
  const closeModal = useRef(null);
  const open_modal = (note) => {
    openModal.current.click();
    //console.log(note);

    let etitle = document.getElementById('etitle');
    let edescription = document.getElementById('edescription');
    let note_id = document.getElementById('note_id');
    etitle.value = note.title;
    edescription.value = note.description;
    note_id.value = note._id;

  }
  const update = () => {

    let etitle = document.getElementById('etitle').value;
    let edescription = document.getElementById('edescription').value;
    let note_id = document.getElementById('note_id').value;
    let user_id=JSON.parse(localStorage.getItem('id'));
  
            
    updateNote(etitle, edescription, user_id,note_id);
    
    closeModal.current.click();
    
  }

  return (<>

    <h1 className="mx-2">Your notes</h1>

    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={openModal}>
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
            <input type="text" className="form-control" id="note_id" name="note_id" aria-describedby="emailHelp" hidden/>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Note title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" />

              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Note description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" />
              </div>

            </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={update}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-4">

      {note.map((data) => {
        return <Notesitem note={data} open_modal={open_modal} />
      })}
    </div>

  </>);
}

export default Notes;