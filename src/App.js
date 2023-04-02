
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Home from "./components/Home.js";
import { useEffect, useState } from "react";
import noteContext from "./contaxt/noteContaxt.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";

function App() {

  let note_data = [];
  const [note, setNote] = useState(note_data);
  const [showMenu, setMenu] = useState("false");
  let user_id=JSON.parse(localStorage.getItem('id'));
  //console.log(user_id);


  const url = "http://localhost:3001/";


  const fetchNote = async (user_id) => {
    try {
      const response = await fetch(`${url}note/getnotes/${user_id}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
        },
      });
      ////console.log(response);
      note_data = await response.json();
      //console.log(note_data);
    } catch (error) {
      //console.log(error);
    }
    setNote(note_data);

  }
  useEffect(() => {
    fetchNote(user_id);
  }, []);




  const addNote = async (title, description, user_id) => {
    //console.log(title + " " + description);
    const response = await fetch(`${url}note/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title, description, user_id }),
    });
    fetchNote(user_id);
    ////console.log("h");
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

  const updateNote = async (title, description, user_id, note_id) => {

    //console.log(title + " " + description);
    const response = await fetch(`${url}note/updatenote/${note_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title, description, user_id }),
    });
    fetchNote(user_id);
    ////console.log("h");
    //setNote(note.concat(data));

  }
  return (

    <>
      <noteContext.Provider value={{ note, addNote, deleteNote, updateNote, fetchNote}}>
        <Router>

          <Navbar menu={{ showMenu, setMenu }} />
          <Routes>

            <Route path="/about" element={<About menu={{ showMenu, setMenu }} />} />
            <Route path="/home" element={<Home menu={{ showMenu, setMenu }} />} />
            <Route path="/login" element={<Login menu={{ showMenu, setMenu }} />} />
            <Route path="/signup" element={<Signup menu={{ showMenu, setMenu }} />} />

          </Routes>
        </Router>
      </noteContext.Provider>
    </>
  );
}

export default App;
