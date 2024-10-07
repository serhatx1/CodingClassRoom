import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CreateExamApi, GetClasses } from '../Api/api';
import { AuthContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const CreateExam = () => {
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [examData, setExamData] = useState({
        Title: '',
        Description: '',
        ClassID: null,
        EndOfTheStart: '',
        DurationOfExam: '',
    });
    const navigate = useNavigate();
    const { isAuthenticated, role, loading } = useContext(AuthContext);

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
    }, [isAuthenticated, role, loading]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const result = await GetClasses();
                setClasses(result); 
                console.log(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClasses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData(prevData => ({
            ...prevData,
            [name]: name === "EndOfTheStart" ? value : value, 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await CreateExamApi({
            ...examData,
            EndOfTheStart: new Date(examData.EndOfTheStart).toISOString(),
        }); 
        if (response === true) {
            setSuccess('Exam created successfully!'); 
            setExamData({
                Title: '',
                Description: '',
                ClassID: null,
                EndOfTheStart: '',
                DurationOfExam: '',
            });
            setError(null);
        } else {
            setError(response);
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Create Exam</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="Title"
                        value={examData.Title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="Description"
                        value={examData.Description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Class</label>
                    <select
                        name="ClassID"
                        value={examData.ClassID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a class</option>
                        {classes.map((classItem) => (
                            <option key={classItem.ID} value={classItem.ID}>
                                {classItem.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>End of the Start</label>
                    <input
                        type="datetime-local"
                        name="EndOfTheStart"
                        value={examData.EndOfTheStart} 
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Duration of Exam (minutes)</label>
                    <input
                        type="number"
                        name="DurationOfExam"
                        value={examData.DurationOfExam}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Exam</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
};

export default CreateExam;
