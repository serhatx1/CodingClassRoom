import React, { useState, useEffect } from'react';
import { useParams, useNavigate } from'react-router-dom';
import { Editor } from '@monaco-editor/react';
import questions from '../testCasesData.json';
import { submitResults } from '../Api//api';
import useCodeRunner from '../Hook/runner';

const QuestionLoader = () => {
  const { questionType } = useParams();
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken');

  const { output, error: runError, testResults, runCode } = useCodeRunner(questionType, code, testCases);

  useEffect(() => {
    if (questionType) {
      loadQuestion(questionType);
    }
  }, [questionType]);

  const loadQuestion = (type) => {
    const question = questions.find(q => q.type === type);
    if (question) {
      setCode(question.startingCode);
      setTestCases(question.testCases);
    } else {
      setError('Question not found');
      navigate('/');
    }
  };

  const handleRunCode = () => {
    runCode();
  };

  const handleSubmitResults = async () => {
    await submitResults(questionType, testResults, jwtToken);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>JavaScript Code Executor with Monaco Editor</h1>
      <div>
        {questions.map((question) => (
          <button key={question.type} onClick={() => navigate(`/${question.type}`)}>
            Load {question.type.charAt(0).toUpperCase() + question.type.slice(1)} Question
          </button>
        ))}
      </div>
      <Editor
        height="300px"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />
      

      <button onClick={handleRunCode}>Run Tests</button>
      <button onClick={handleSubmitResults}>Submit Results</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
        <h2>Error:</h2>
        <pre>{runError || error}</pre>
      </div>
    </div>
  );
};

export default QuestionLoader;