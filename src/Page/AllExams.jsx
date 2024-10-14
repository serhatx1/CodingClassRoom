import React, { useContext, useEffect, useState } from 'react';
import { FetchAllExamsApi } from '../Api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';
import { Search } from '../Component/Search';

const AllExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState(''); 
  const navigate = useNavigate();
  const { isAuthenticated, role, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (authLoading) return; 
    if (isAuthenticated !== true) {
      navigate("/login");
      return;
    }
    if (role !== "teacher") {
      navigate("/");
      return;
    }
  }, [isAuthenticated, role, authLoading, navigate]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const result = await FetchAllExamsApi();
        if (result.error) {
          setError(result.error);
        } else {
          setExams(result);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleSearchQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const filteredExams = exams.filter((exam) =>
    exam.Title.toLowerCase().includes(query.toLowerCase()) ||
    exam.Description.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className='all-exams-container'>
      <div className='all-exams-section'>
        <h1 className='title'>Exams List</h1>
        
        <Search theme={"black"} onSearchQueryChange={handleSearchQueryChange} />

        {filteredExams.length === 0 ? (
          <p className='no-exams'>No exams available.</p>
        ) : (
          <ul className='exams-list'>
            
            {filteredExams.map((exam) => (
                
              <li key={exam.id} className='exam-card'>
                <h2 className='exam-title'>{exam.Title}</h2>
                <p className='exam-description'>{exam.Description}</p>
                <p className='exam-class-id'>Class ID: <strong>{exam.ClassID}</strong></p>
                <p className='exam-duration'>Duration: <strong>{exam.DurationOfExam} minutes</strong></p>
                <p className='exam-start-date'>Start Date: <strong>{new Date(exam.EndOfTheStart).toLocaleString()}</strong></p>
                <div className='exam-actions'>
                <button onClick={() => navigate(`/problems/${exam.ID}`)} className='btn edit-btn'>
                Edit
              </button>

                <button className='btn delete-btn'>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllExams;
