import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: '', email: '', password: '', cpassword:''});
    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
            });
            const json = await response.json();
            console.log(json)
            if(json.success){
                //save the authtoken and redirect
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.showAlert("Account created succesffuly", "success");
            }
            else{
                // alert('invalid creds');
                props.showAlert("Invalid credentials", "danger");
            }
        }
        else{
            props.showAlert("Password doesnt match", "danger");
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input type="username" className="form-control" id="username"  onChange={onChange} name="name" placeholder="Steve Majumdar" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  onChange={onChange} name="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange}  name="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange}  name="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
