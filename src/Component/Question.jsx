import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { GetAllProblems, submitResults } from '../Api/api';
import useCodeRunner from '../Hook/runner';
import './Question.css'; 
import AuthCheckComponent from './AuthCheck';

const QuestionLoader = () => {
  const { idOfQ } = useParams();
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [error, setError] = useState('');
  const [questionType,setQuestionType]=useState(null)
  const [questions, setQuestions] = useState([]);
  const [selectedTest, setSelectedTest] = useState(0); 
  const [question,setQuestion] = useState(null)
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken');
  const { output, error: runError, testResults, runCode } = useCodeRunner(questionType, code, testCases);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await GetAllProblems();
        setQuestions(response);
      } catch (err) {
        console.error('Failed to fetch problems:', err);
        setError('Could not fetch questions. Please try again later.');
      }
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    if (idOfQ && questions.length > 0) {
      loadQuestion(idOfQ*1);
    }
  }, [idOfQ, questions]);

  const loadQuestion = (idOfQ) => {
    const question = questions.find(q => q.ID===idOfQ);
    if (question) {
      setCode(question.startingCode);
      setTestCases(question.TestCases); 
      setQuestion(question)
      var arr = question.startingCode.split(" ")
      var result =""
      for(let i=0;i<arr[1].length;i++){
        if (arr[1][i]!="("){
            result+=arr[1][i]
        }else{
          break
        }
      }
      setQuestionType(result)
    } else {
      setError('Question not found');
      navigate('/');
    }
  };

  const handleRunCode = () => {
    runCode();
  };

  const handleSubmitResults = async () => {
    try {
      await submitResults(idOfQ, testResults, jwtToken);
      alert('Results submitted successfully!');
    } catch (err) {
      console.error('Failed to submit results:', err);
      setError('Could not submit results. Please try again later.');
    }
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
      <AuthCheckComponent/>
      {error && <p className='error'>{error}</p>}
      <div className='DescriptionContainer'>
        <h2>{idOfQ}</h2>
        <div className='questionDesc'>
          <p>{question!=null&&question.description}</p>
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
