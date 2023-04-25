import './App.css';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"

// Importing Components
import Login from './components/Login';
import Register from './components/Register';
import AllUsers from './components/AllUsers';
import ApiBB from './components/ApiBB';

function App() {
  // const [currentForm,setCurrentForm] = useState("login")
  // const toggleForm = (formName) =>{
  //         setCurrentForm(formName);
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route element={<Login />}  path={"/"} />
            <Route element={<Login />}  path="/login" />
            <Route element ={<Register />} path='/register' />
            <Route element ={<AllUsers />} path='/allusers' />
            <Route element ={<ApiBB />} path='/shows' />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
