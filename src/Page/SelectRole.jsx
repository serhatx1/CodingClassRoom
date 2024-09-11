import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import student from "../img/Student.png"
import teacher from "../img/Teacher.png"
import "./register.css"
import {Role} from "../Api/api"
export const SelectRole = () => {
    const {isAuthenticated,role} = useContext(AuthContext);
   
    const navigate = useNavigate()
    const [roles,setRole] = useState("")
    if(isAuthenticated===false || role!==""){
        navigate("/")
    }
    const handleRole = async (e) => {
        e.preventDefault();
        try {
          await Role({roles}).then((response)=>{
            if(response.success==true){
                
              setTimeout(() => {
                navigate("/");
              }, 2000);
    
            }
            if (response.success!==200){
              console.log(response)
            }
          }).catch((error)=>{
            console.log(error)
          })
        } catch (err) {
        }
      };
  return (
    
    <form onSubmit={handleRole} className='Role-Section'>
        <button className="role" type='submit' onClick={()=>setRole("teacher")}>
        <img src={teacher} alt="" />
            <p>
            Select your role as Teacher

            </p>
        </button>
        <button className="role" type='submit' onClick={()=>setRole("student")}>
        <img src={student} alt="" />
    <p>
    Select your role as Student

    </p>
        </button>

    </form>
  )
}
