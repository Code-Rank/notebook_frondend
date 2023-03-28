
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Home from "./components/Home.js";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
function App() {
  return (
   <>
  <Router>
<Navbar/>
   <Routes>
    
    <Route path="/about"  element={<About/>}/>
    <Route path="/home" element={<Home />}/>
      
    </Routes>
    </Router>
   </>
  );
}

export default App;
