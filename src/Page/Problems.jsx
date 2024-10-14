import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProblems, editProblemInExam } from '../Api/api';
import { Search } from '../Component/Search';

const Problems = () => {
  const [alreadyAdded, setAlreadyAdded] = useState([]);
  const [notAdded, setNotAdded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { examID } = useParams();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getProblems(examID);
        setAlreadyAdded(data.alreadyAdded);
        setNotAdded(data.notAdded);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch problems');
        setLoading(false);
      }
    };

    fetchProblems();
  }, [examID]);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleEditProblem = async (problemID, action) => {
    if (!problemID || !['add', 'remove'].includes(action)) {
      setError('Invalid input. Please try again.');
      return;
    }

    try {
      await editProblemInExam(examID * 1, problemID, action);
      if (action === 'add') {
        setAlreadyAdded((prev) => [
          ...prev,
          notAdded.find((problem) => problem.ID === problemID),
        ]);
        setNotAdded((prev) => prev.filter((problem) => problem.ID !== problemID));
      } else if (action === 'remove') {
        setNotAdded((prev) => [
          ...prev,
          alreadyAdded.find((problem) => problem.ID === problemID),
        ]);
        setAlreadyAdded((prev) => prev.filter((problem) => problem.ID !== problemID));
      }
    } catch (err) {
      setError(`Failed to ${action} problem. Please try again.`);
      console.error(`Failed to ${action} problem:`, err);
    }
  };

  const filteredAlreadyAdded = alreadyAdded.filter(problem =>
    problem.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotAdded = notAdded.filter(problem =>
    problem.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const summarizeDescription = (description) => {
    const sentences = description.split('. ');
    return sentences.length > 1 ? `${sentences[0]}` : description;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="problems-container">
      <Search onSearchQueryChange={handleSearchQueryChange} theme="black" />
      
      <h3 className="section-title">Already Added Problems</h3>
      <div className="table-header">
        <h3>Category</h3>
        <h3>Description</h3>
        <h3>Type</h3>
        <h3>Actions</h3>
      </div>
      <div className="problems-section">
        {filteredAlreadyAdded.length > 0 ? (
          <div className="problems-list">
            {filteredAlreadyAdded.map((problem) => (
              <li key={problem.ID} className="problem-item">
                <h3>{problem.Category}</h3>
                <p className="desc">{summarizeDescription(problem.description)}</p>
                <p>{problem.type}</p>
                <button 
                  className="flat-button"
                  onClick={() => handleEditProblem(problem.ID, 'remove')}>
                  Remove from Exam
                </button>
              </li>
            ))}
          </div>
        ) : (
          <p>No problems added yet.</p>
        )}
      </div>

      <div className="problems-section">
        <h3 className="section-title">Not Added Problems</h3>
        <div className="table-header">
          <h3>Category</h3>
          <h3>Description</h3>
          <h3>Type</h3>
          <h3>Actions</h3>
        </div>
        {filteredNotAdded.length > 0 ? (
          <div className="problems-list">
            {filteredNotAdded.map((problem) => (
              <li key={problem.ID} className="problem-item">
                <h3>{problem.Category}</h3>
                <p className="desc">{summarizeDescription(problem.description)}</p>
                <p>{problem.type}</p>
                <button 
                  className="flat-button"
                  onClick={() => handleEditProblem(problem.ID, 'add')}>
                  Add to Exam
                </button>
              </li>
            ))}
          </div>
        ) : (
          <p>All problems have been added.</p>
        )}
      </div>
    </div>
  );
};

export default Problems;
