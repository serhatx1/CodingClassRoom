import React, { useEffect, useState } from 'react';
import { MyExamsApi } from '../Api/api';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; 
};

const MyExams = () => {
  const [attendedExams, setAttendedExams] = useState([]);
  const [notAttendedExams, setNotAttendedExams] = useState([]);
  const [passedExams, setPassedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getExams = async () => {
      try {
        console.log("Fetching exam data...");

        const data = await MyExamsApi();
        setAttendedExams(data.attendedExams || []);
        setNotAttendedExams(data.notAttendedExams || []);
        setPassedExams(data.passedExams || []);
      } catch (err) {
        setError('Failed to fetch exams.');
      } finally {
        setLoading(false);
      }
    };

    getExams();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exams-container">
      <h2>My Exams</h2>
    

      <div className="exam-category attended">
        <h3>Attended Exams</h3>
        <table className="exam-table">
        <thead>
          <tr>
            <th>Exam Title</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
      </table>
        {attendedExams.length === 0 ? (
          <p>No attended exams found.</p>
        ) : (
          <ul>
            {attendedExams.map((exam) => (
              <li key={exam.ID}>
                <span className="exam-name">{exam.Title}</span>
                <span>{formatDate(exam.EndOfTheStart)}</span>
                <span>{exam.Description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="exam-category not-attended">
        <h3>Not Attended Exams</h3>
        <table className="exam-table">
        <thead>
          <tr>
            <th>Exam Title</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
      </table>
        {notAttendedExams.length === 0 ? (
          <p>No not attended exams found.</p>
        ) : (
          <ul>
            {notAttendedExams.map((exam) => (
              <li key={exam.ID}>
                <span className="exam-name">{exam.Title}</span>
                <span>{formatDate(exam.EndOfTheStart)}</span>
                <span>{exam.Description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="exam-category passed">
        <h3>Passed Exams</h3>
        <table className="exam-table">
        <thead>
          <tr>
            <th>Exam Title</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
      </table>
        {passedExams.length === 0 ? (
          <p>No passed exams found.</p>
        ) : (
          <ul>
            {passedExams.map((exam) => (
              <li key={exam.ID}>
                <span className="exam-name">{exam.Title}</span>
                <span>{formatDate(exam.EndOfTheStart)}</span>
                <span>{exam.Description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyExams;
