import React, { useContext, useState } from 'react';
import { login } from '../Api/api';
import './register.css';
import laurel from "../img/laurel.svg"
import { VscError } from "react-icons/vsc";

import a from "../img/1.webp"
import b from "../img/2.png"
import c from "../img/3.jpg"
import d from "../img/4.png"
import e from "../img/5.png"
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';

const features = [
  "Create and Manage Classes Easily",
  "Built-In Online Compiler",
  "Automated Test Case Evaluation",
  "Direct Submission to Instructors",
  "Real-Time Feedback: Improve learning efficiency with instant feedback on coding challenges."
];

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  if(isAuthenticated===true){
    navigate("/")
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).then((response)=>{
        console.log("hi")
        if (response.success=="selectrole"){
          window.location.href="/auth/role"
        }
        if (response.success==true){
          window.location.href="/"

        }
        if (response.success!==true){

          console.log(response)
          setError(response.error)
        }
      }).catch((error)=>{
        console.log(error)
      })
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Log in to your account</h2>
        <div className="welcome">
        <p> Don't have an account?</p>
          <label className="dontyouhaveaccount" onClick={() => navigate("/")}>
            Sign Up
          </label>
        </div>
        <form onSubmit={handleLogin}>
        <div className={`${error==null?"deactive":"error"} `}>
            <VscError className='VscError' fontSize="2em"/>
            <div className='ErrorMessage'>
            {error}
            </div>
            </div>
          <div>
            
            <label className='labelemail'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className={`${password == "" || email == "" ? "gray" : "green"}`}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div>
        <div className="features-container">
          <div className="features-left">
            <div className="svg">
              <img src={laurel} alt="123" className="svgimg" />
              <label htmlFor="svgimg" className="svglabel">
                #1 Best Learning Tool
              </label>
            </div>

            <h1 className="features-title">
              EduCode: Empowering Remote Learning with Interactive Coding
              Challenges
            </h1>
            <h3 className="features-subtitle">
              Revolutionize Your Classroom with Real-Time Feedback and
              Collaborative Learning Tools
            </h3>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index} className="features-list-item">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
