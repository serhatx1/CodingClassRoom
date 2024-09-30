import React, { useContext, useEffect, useState } from 'react';
import { GetClasses } from '../Api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';

export const OwnClasses = () => {
    const [classes, setClasses] = useState(null);
    const [err, setError] = useState(null);
    const navigate=useNavigate()
    const { isAuthenticated,role,loading } = useContext(AuthContext);

    useEffect(() => {
   
        const fetchClasses = async () => {
            
        if (loading) return; 

        if (isAuthenticated !== true) {
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
    }, [isAuthenticated,role,navigate]);

    return (
        <div>
            {console.log(classes)}
            {err && <p>{err}</p>}
            {classes ? (
                <ul>
                    {classes.map((cls) => (
                        <li key={cls.ID}>{cls.ID} {cls.Name} <a href={`/class/${cls.ID}`}>Check</a></li> 
                    ))}
                </ul>
            ) : (
                !err && <p>Loading...</p> 
            )}
        </div>
    );
};
