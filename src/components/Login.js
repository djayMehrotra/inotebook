import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    /* const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); */


    const [credentials, setCredentials] = useState({email: '', password:''});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
          const json = await response.json();
          console.log(json)
          if(json.success){
              //save the authtoken and redirect
              localStorage.setItem('token', json.authtoken);
              props.showAlert("Logged in successfully", "success");
              navigate('/');
          }
          else{
              // alert('invalid creds');
              props.showAlert("Invalid credentials", "danger");
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  onChange={onChange} name="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange}  name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
