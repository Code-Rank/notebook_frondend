
import { useState,useContext} from "react";
import noteContext from "../contaxt/noteContaxt";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const note_contaxt=useContext(noteContext);
    //console.log(noteContext);
    const {fetchNote}=note_contaxt;
    let alerClass = "";
    const [alert, setAlert] = useState({ msg: "", status: "" });
    const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
    const userLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(("http://localhost:3001/user/loginauth"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: loginDetail.email, password: loginDetail.password }),
        });
        const result = await response.json();
        //console.log(result);
        if (result.status) {

            setAlert({ msg: result.msg, status: result.status });
            
            localStorage.setItem("id", JSON.stringify(result.data[0]._id));
            let user_id=JSON.parse(localStorage.getItem('id'));
            fetchNote(user_id);
            setTimeout(() => {
                navigate("/home");
            }, 1000);
            

        }
        else {
            setAlert({ msg: result.msg, status: result.status });
        }
    }

    const valueIschanging = (e) => {
        setLoginDetail({
            ...loginDetail, [e.target.name]: e.target.value
        });
    }
    /*  if(alert.msg!==""){
 
      alerClass=alert.status?"success":"danger";
     } */
    //console.log(loginDetail);

    return (<>
        <div className="container col-6 card p-5 my-5">
            {alert.msg !== "" ? <div class={`alert alert-${alerClass = alert.status ? "success" : "danger"}`} role="alert">
                {alert.msg}
            </div> : ""}
            <h1 >Login</h1>
            <hr />
            <form onSubmit={userLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={loginDetail.email} onChange={valueIschanging} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={valueIschanging} value={loginDetail.password} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </>);
}

export default Login;