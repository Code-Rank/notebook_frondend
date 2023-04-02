import { useEffect } from "react";
import { Link ,useLocation,useNavigate} from "react-router-dom";

const Navbar = (props) => {
    let location=useLocation();
    //const {showMenu,setMenu}=props.menu;
    const navigate = useNavigate();
    //console.log(showMenu);
   
    const logout=()=>{
        localStorage.clear();
        navigate("/login");
    }
    useEffect(()=>{
      
    },[location]);
    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Note Book</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                   
                   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {JSON.parse(localStorage.getItem('id'))?
                    <>
                    <li className="nav-item">
                           <Link className={`nav-link ${location.pathname==="/home" ?"active":""}` }  aria-current="page" to="/home">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link  className={`nav-link ${location.pathname==="/about"?"active":""}` } to="/about" tabindex="-1" >About</Link>
                        </li> */}
                    </>:""}
                        
                    </ul>
                    <form className="d-flex">
                    {!JSON.parse(localStorage.getItem('id'))?
                        <Link to="/login" className="btn btn-primary mx-1">Login</Link>
                    :""}
                        {!JSON.parse(localStorage.getItem('id'))?
                        <Link to="/signup" className="btn btn-primary mx-1">Signup</Link>
                        :""}
                        {JSON.parse(localStorage.getItem('id'))?
                        <Link to="/login" onClick={logout} className="btn btn-primary mx-1">Logout</Link>
                        :""}
                    </form>
                </div>
            </div>
        </nav>

    </>);
}

export default Navbar;