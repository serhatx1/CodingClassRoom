import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import questions from '../testCasesData.json';
import { submitResults } from '../Api/api';
import useCodeRunner from '../Hook/runner';
import './Question.css'; 

const QuestionLoader = () => {
  const { questionType } = useParams();
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [error, setError] = useState('');
  const [selectedTest, setSelectedTest] = useState(0); 
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

  const handleTestClick = (index) => {
    setSelectedTest(index);
  };

  const getTestResults = () => {
    if (testCases.length === 0) return {};
    return testResults[`test${selectedTest + 1}`];
  };
  
  return (
    <div className='QuestionLoaderContainer'>
      <div className='DescriptionContainer'>
        <h2> {questionType}</h2>
        <div className='questionDesc'>
        <p>{questions.find(q => q.type === questionType)?.description}</p>
        </div>
      </div>
      <div className='EditorContainer'>
        <Editor
          height="300px"
          language="javascript"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
        />
        <div className='ButtonContainer'>
          <button onClick={handleRunCode}>Run Tests</button>
          <button onClick={handleSubmitResults}>Submit Results</button>
        </div>
        <div className='TestButtons'>
          {testCases.map((_, index) => (
            <button
              key={index}
              className={`TestButton ${selectedTest === index ? 'active' : ''}`}
              onClick={() => handleTestClick(index)}
            >
              Test {index + 1}
            </button>
          ))}
        </div>
        <div className='TestCaseDetails'>
          <h3>Test Case {selectedTest + 1}</h3>
          <p><strong>Input:</strong> {JSON.stringify(testCases[selectedTest]?.input)}</p>
          <p><strong>Output:</strong> {JSON.stringify(getTestResults())}</p>
          <p><strong>Result:</strong> {testResults[`test${selectedTest + 1}`]}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionLoader;
