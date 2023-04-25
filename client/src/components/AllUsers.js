import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const AllUsers = () => {

    const[users,setUsers] = useState([])

    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/getAllUsers")
        .then((res)=> {
            setUsers(res.data.users)
        })
        }, [users] )

        return (
                <div className="allusersDiv">
                    <h2>All Users</h2>
                    <div className="cards-div">
                        {
                            users.map((item,idx)=>(
                                <div className="card" >
                                    <ul key={idx} className="list-group ">
                                    <li>{item.fname} {item.lname}</li>
                                    <li>{item.email}</li>
                                    </ul>
                                </div>
                                ))
                        }
                    </div>
                
                </div> 
                    )
    }
export default AllUsers