import React, { useContext, useEffect, useState } from 'react';
import { GetClasses } from '../Api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';
import "./register.css";

export const OwnClasses = () => {
    const [classes, setClasses] = useState(null);
    const [err, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, role, loading } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchClasses = async () => {
            if (loading) return; 

            if (!isAuthenticated) {
                navigate("/login");
                return;
            }
            if (role !== "teacher") {
                navigate("/");
                return;
            }
            try {
                const result = await GetClasses();
                setClasses(result); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClasses();
    }, [isAuthenticated, role, loading, navigate]);

    const countOfStudents = (arr) => (Array.isArray(arr) ? arr.length : 0);

    return (
        <div className="allClasses-container">
            {err && <p className="error-message">{err}</p>}
            
            {classes ? (
                <table className="classes-table">
                    <thead className='header-bar'>
                        <tr>
                            <th>ID</th>
                            <th>Token</th>
                            <th>Student Count</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((cls) => (
                            <tr key={cls.ID} className="class-item">
                                <td>{cls.ID}</td>
                                <td>{cls.Token}</td>
                                <td>{countOfStudents(cls.Students)}</td>
                                <td>{cls.Name}</td>
                                <td><a href={`/class/${cls.ID}`} className="check-link">Check</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !err && <p className="loading-message">Loading...</p> 
            )}
        </div>
    );
};
