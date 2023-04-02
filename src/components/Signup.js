
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    let alerClass = "";
    const [alert, setAlert] = useState({ msg: "", status: "" });
    const [signUpDetail, setSignUpDetail] = useState({name:"", email: "", password: "" });
    const userLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(("http://localhost:3001/user/createuser"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:signUpDetail.name,email: signUpDetail.email, password: signUpDetail.password }),
        });
        const result = await response.json();
        //console.log(result);
        if (result.status) {

            setAlert({ msg: result.msg, status: result.status });
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        }
        else {
            setAlert({ msg: result.msg, status: result.status });
        }
    }

    const valueIschanging = (e) => {
        setSignUpDetail({
            ...signUpDetail, [e.target.name]: e.target.value
        });
    }
    /*  if(alert.msg!==""){
 
      alerClass=alert.status?"success":"danger";
     } */
    //console.log(signUpDetail);

    return (<>
        <div className="container col-6 card p-5 my-5">
             {alert.msg !== "" ? <div className={`alert alert-${alerClass = alert.status ? "success" : "danger"}`} role="alert">
                {alert.msg===""?"Some think wrong ":alert.msg}
            </div> : ""} 
            <h1 >Login</h1>
            <hr />
            <form onSubmit={userLogin}>
            <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Names</label>
                    <input type="text" className="form-control" id="name" name="name" value={signUpDetail.name} onChange={valueIschanging} aria-describedby="emailHelp" />
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={signUpDetail.email} onChange={valueIschanging} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={valueIschanging} value={signUpDetail.password} />
                </div>

                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    </>);
}

export default Signup;