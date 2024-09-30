import React, { useContext, useEffect, useState } from 'react';
import { createClass } from '../Api/api'; 
import './register.css'; 
import { AuthContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const CreateClass = () => {
    const [className, setClassName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [ClassToken,setClassToken]=useState(null)
    const navigate=useNavigate()
    const { isAuthenticated,role,loading } = useContext(AuthContext);
    useEffect(() => {
        if (loading) return; 
        if (isAuthenticated !== true) {
            navigate("/login");
            return;
        }
        if (role !== "teacher") {
            navigate("/");
            return;
        }
    }, [isAuthenticated,role,loading])
    
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('Token'); 
        if (!token) {
            setError('Authorization token is missing');
            return;
        }
      

        try {
            const classData = { name: className };
            const result = await createClass(classData, token);
            setSuccess('Class created successfully!');
            setClassName('');
            setClassToken(result.Token)
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="create-class-container">
            <h2>Create a New Class</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Class Name
                        <input
                            type="text"
                            placeholder='Write Class Name'
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Create Class</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default CreateClass;
