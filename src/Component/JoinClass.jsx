import React, { useContext, useEffect, useState } from 'react';
import { JoinClassApi } from '../Api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';
export const JoinClass = () => {
  const [classCode, setClassCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [load, setLoading] = useState(false);
  const navigate=useNavigate()
  const { isAuthenticated,user,loading } = useContext(AuthContext);

    useEffect(() => {
      if(loading) return;
      if(isAuthenticated===false){
        navigate("/")
      }
    }, [isAuthenticated,loading,user])
    



  const handleJoinClass = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (classCode.length !== 32) {
      setErrorMessage('Class token must be exactly 36 characters.');
      return;
    }

    setLoading(true);

    try {
      const data = {
        classCode: classCode,
      };
      const res = await JoinClassApi(data.classCode);

      if (res !== true) {
        setErrorMessage(res);
      } else {
        setSuccessMessage("You've joined the class!");
      }
    } catch (error) {
      setErrorMessage('An error occurred while joining the class. Please try again.'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='joinclass-container'>
        <h3>Join class</h3>
      <div>
        <div>
          <span>You're currently signed in as</span>
          <div>
            {console.log("the user",user)}
            {user!==null&&
            <div>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>


            </div>
            
            }
          </div>
        </div>

        <div>
          <span>Class Code</span>
          <span>Ask your teacher for the class code, then enter it here.</span>
          <input 
            type="text" 
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            placeholder="Enter class code" 
          />
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success">{successMessage}</div>}

        <div>
          <button onClick={handleJoinClass} disabled={load}>
            {load ? 'Joining...' : 'Join Class'}
          </button>
        </div>

        <div>
          <span>To sign in with a class code</span>
          <ul>
            <li>Use a student account.</li>
            <li>Enter a class token with a length of 32 characters.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
