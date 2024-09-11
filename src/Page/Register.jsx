import React, { useContext, useEffect, useState } from 'react';
import { register } from '../Api/api';
import './register.css'; 
import laurel from "../img/laurel.svg"
import a from "../img/1.webp"
import b from "../img/2.png"
import c from "../img/3.jpg"
import d from "../img/4.png"
import e from "../img/5.png"
import { useNavigate } from 'react-router-dom';
import { VscError, VscPass } from 'react-icons/vsc';
import { AuthContext } from '../Context/Context';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({name:username,email, password }).then((response)=>{
        if(response.success==true){
          setSuccess("Registered succesfuly")

          setTimeout(() => {
            navigate("/login");
          }, 2000);

        }
        if (response.success!==200){
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

  const features = [
    "Create and Manage Classes Easily",
    "Built-In Online Compiler",
    "Automated Test Case Evaluation",
    "Direct Submission to Instructors",
    "Real-Time Feedback: Improve learning efficiency with instant feedback on coding challenges."
  ];

  return (
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
            {isAuthenticated==false&&
        <div className="features-right">
          <h2>Register</h2>
          <form className="registration-form" onSubmit={handleRegister}>
            <input
              type="username"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={`${error == null ? "deactive" : "error"} `}>
              <VscError className="VscError" fontSize="2em" />
              <div className="ErrorMessage">{error}</div>
            </div>
            <div className={`${success == null ? "deactive" : "success"}`}>
              <VscPass className="VscPass" fontSize="2em" />
              <div className="SuccessMsg">{success}</div>
            </div>
            <button type="submit">Go Register</button>
          </form>
        </div>
        }
      </div>
      <div className="university">
        <img src={a} alt="" />
        <img src={b} alt="" />
        <img src={c} alt="" />
        <img src={d} alt="" />
        <img src={e} alt="" />
      </div>
    </div>
  );
};

export default Register;
