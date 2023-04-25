import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handelSubmit =(e)=>{
        e.preventDefault();
    }
    const navigate = useNavigate();
    const navigatetoreg = ()=>{
        navigate('/register');
    }
return (
    <div className="form-container">
        <h2>Log In</h2>
        <form className="login-form" onSubmit={handelSubmit}>
            <label for="email">Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='yoremail@gmail.com' name="email" id="email"/>
            <label for="password">Password</label>
                <input onChange={(e)=>setPass(e.target.value)} value={pass} type="password" placeholder='********' name="password" id="password"/>
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={navigatetoreg}>Don't Have An Account? Register Here</button>
    </div>
)
}

export default Login