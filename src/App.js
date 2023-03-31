
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Home from "./components/Home.js";
import { useContext, useEffect, useState,useRef } from "react";
import noteContext from "./contaxt/noteContaxt.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  let note_data = [];
  const [note, setNote] = useState(note_data);
  const openModal=useRef(null);
  const closeModal=useRef(null);
  const url = "http://localhost:3001/";
  

  const fetchNote = async () => {
    try {
      const response = await fetch(`${url}note/getnotes/123`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(response);
      note_data = await response.json();
      console.log(note_data);
    } catch (error) {
      console.log(error);
    }
    setNote(note_data);

  }
  useEffect(() => {
    fetchNote();
  }, []);




  const addNote = async (title, description, user_id) => {
    console.log(title + " " + description);
    const response = await fetch(`${url}note/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title, description, user_id }),
    });
    fetchNote();
    //console.log("h");
    //setNote(note.concat(data));
  }


  const deleteNote = async (id) => {

    const data = note.filter((notes) => {
      return notes._id !== id ? notes : "";
    });
    setNote(data);
    const response = await fetch(`${url}note/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },

      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    //return response.json(); 

  }

  const updateNote =async (title,description,user_id,note_id) => {
 
    console.log(title + " " + description);
    const response = await fetch(`${url}note/updatenote/${note_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title, description, user_id }),
    });
    fetchNote();
    //console.log("h");
    //setNote(note.concat(data));

  }
  return (

    <>
      <noteContext.Provider value={{ note, addNote, deleteNote ,updateNote}}>
        <Router>

          <Navbar />
          <Routes>

            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />

          </Routes>
        </Router>
      </noteContext.Provider>
    </>
  );
}

export default App;
