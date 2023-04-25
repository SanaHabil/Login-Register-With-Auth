import React from 'react'
import { useEffect,useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
    // const [email, setEmail] = useState("");
    // const [pass, setPass] = useState("");
    // const [fname, setFname] = useState("");
    // const [lname, setLname] = useState("");
const navigate = useNavigate();
const navigatetolog = ()=>{
    navigate('/login');
}
    const [user, setUser] = useState({
        fname:"",
        lname:"",
        email:"",
        pass: "",
        confirmPassword: ""
    })

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handelSubmit = (e)=>{
        e.preventDefault()

        Axios.post("http://localhost:8000/api/users/register",user)
        .then((res)=>{
            console.log(res.data)
            setUser({
                fname:"",
                lname:"",
                email:"",
                pass: "",
                confirmPassword: ""
            })
            // setConfirmReg("Thank you for registering! Now you can login..")
            // setErrors({})
        })
        .catch((err)=>{
            console.log(err)
            // setErrors(err.response.data.errors)
        })
    }


return (
    <div className="form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handelSubmit}>
            <label for="name">First Name</label>
                <input onChange={(e)=> handleChange(e)} value={user.fname} type="text" placeholder='yourname' name="fname" id="fname"/>
            <label for="name">Last Name</label>
                <input onChange={(e)=> handleChange(e)} value={user.lname} type="text" placeholder='lastname' name="lname" id="lname"/>
            <label for="email">Email</label>
                <input onChange={(e)=> handleChange(e)} value={user.email} type="email" placeholder='yoremail@gmail.com' name="email" id="email"/>
            <label for="password">Password</label>
                <input onChange={(e)=> handleChange(e)} value={user.pass} type="password" placeholder='********' name="pass" id="password"/>
            <label for="confirmpassword">Confirm Password</label>
                <input onChange={(e)=> handleChange(e)} value={user.confirmPassword} type="password" placeholder='********' name="confirmPassword" id="confirmpassword"/>
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={navigatetolog}>Already Have An Account?Log In Here</button>
    </div>
)
}

export default Register