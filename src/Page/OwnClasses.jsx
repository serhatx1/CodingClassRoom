import React, { useEffect, useState } from 'react';
import { GetClasses } from '../Api/api';

export const OwnClasses = () => {
    const [classes, setClasses] = useState(null);
    const [err, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const result = await GetClasses();
                setClasses(result); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div>
            {console.log(classes)}
            {err && <p>{err}</p>}
            {classes ? (
                <ul>
                    {classes.map((cls) => (
                        <li key={cls.ID}>{cls.ID} {cls.Name}</li> 
                    ))}
                </ul>
            ) : (
                !err && <p>Loading...</p> 
            )}
        </div>
    );
};
