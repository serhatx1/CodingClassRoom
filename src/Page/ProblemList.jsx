import React, { useEffect, useState } from 'react';
import { fetchProblems } from '../Api/api';

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const data = await fetchProblems();
        setProblems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problems:', error);
        setLoading(false);
      }
    };

    getProblems();
  }, []);

  const handleButtonClick = (problemID) => {
    console.log(`Problem ${problemID} button clicked!`);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="problems-container">
      <h1>Problems List</h1>
      <div className="table-header">
        <h3>Category</h3>
        <h3>Description</h3>
        <h3>Type</h3>
        <h3>Actions</h3>
      </div>
      {problems.length === 0 ? (
        <p>No problems found</p>
      ) : (
        <ul>
          {problems.map((problem) => (
            <li key={problem.ID} className="problem-item">
              <h3>{problem.Category}</h3>
              <p className="desc">{problem.description}</p>
              <p>{problem.type}</p>
              <button 
                className="flat-button" 
                onClick={() => handleButtonClick(problem.ID)}
              >
                View Problem
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProblemsList;