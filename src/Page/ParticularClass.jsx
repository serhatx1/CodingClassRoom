import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchParticularClass } from "../Api/api";
import './register.css'; 

export const ParticularClass = () => {
    const { classID } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tokenCopied, setTokenCopied] = useState(false); 

    useEffect(() => {
        const loadClassData = async () => {
            try {
                const data = await fetchParticularClass(classID);
                console.log("data:", data);
                setClassData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadClassData();
    }, [classID]); 

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setTokenCopied(true); 
                setTimeout(() => {
                    setTokenCopied(false); 
                }, 1500);
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
            });
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="class-particular-container"> 
            <h1>Class Details</h1>
            {classData ? (
                <div>
                    <p><strong>Name:</strong> {classData.Name}</p>
                    <p>
                        <strong>Token:</strong>
                        <span
                            className="token"
                            onClick={() => copyToClipboard(classData.Token)} 
                        >
                            {tokenCopied ? "Copied!" : classData.Token}
                        </span>
                    </p>
                    <p><strong>Owner ID:</strong> {classData.OwnerID}</p>
                </div>
            ) : (
                <div>No class found</div>
            )}
        </div>
    );
};
