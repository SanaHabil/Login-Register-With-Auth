import React from 'react'
import { useState } from 'react';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const handelSubmit =(e)=>{
        e.preventDefault();
        console.log(email);
    }
return (
    <div className="form-container">
        <h2>Register</h2>
        <form className="register-form"onSubmit={handelSubmit}>
            <label for="name">Full Name</label>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='yourname' name="name" id="name"/>
            <label for="email">Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='yoremail@gmail.com' name="email" id="email"/>
            <label for="password">Password</label>
                <input onChange={(e)=>setPass(e.target.value)} value={pass} type="password" placeholder='********' name="password" id="password"/>
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={()=> props.onFormSwitch('login')}>Already Have An Account?Log In Here</button>
    </div>
)
}

export default Register