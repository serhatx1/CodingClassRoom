import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import questions from './testCasesData.json';
import axios from 'axios';

const QuestionLoader = () => {
  const { questionType } = useParams();
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState({}); 
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken');

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

  const runCode = () => {
    setOutput('');
    setError('');
    setTestResults({}); 

    const originalConsoleLog = console.log;
    const logs = [];
    console.log = (...args) => {
      logs.push(args.join(' '));
    };

    try {
      let funcName;
      if (questionType === 'addition') {
        funcName = 'value';
      } else if (questionType === 'minimum') {
        funcName = 'findMin';
      } else if (questionType === 'palindrome') {
        funcName = 'isPalindrome';
      } else {
        throw new Error('Unknown question type');
      }

      const userCode = `
        ${code}
        if (typeof ${funcName} !== 'function') {
          throw new Error('Function ${funcName} is not defined.');
        }
        return ${funcName};
      `;

      const func = new Function(userCode);
      const userFunction = func();

      if (typeof userFunction !== 'function') {
        throw new Error(`The evaluated code did not return a function`);
      }

      let allTestsPassed = true;
      const results = {};
      testCases.forEach(({ input, expected }, index) => {
        let result;
        try {
          if (questionType === 'addition') {
            result = userFunction(...input);
          } else if (questionType === 'minimum') {
            result = userFunction(input[0]);
          } else if (questionType === 'palindrome') {
            result = userFunction(input[0]);
          } else {
            throw new Error('Unknown question type');
          }

          if (result !== expected) {
            allTestsPassed = false;
            results[`test${index + 1}`] = 'failed';
          } else {
            results[`test${index + 1}`] = 'passed';
          }
        } catch (e) {
          allTestsPassed = false;
          results[`test${index + 1}`] = 'error';
        }
      });

      if (allTestsPassed) {
        console.log('All tests passed!');
      } else {
        console.log('Some tests failed.');
      }

      setOutput(logs.join('\n'));
      setTestResults(results);
    } catch (e) {
      setError(`Error executing code: ${e.message}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const submitResults = async () => {
    try {
      await axios.post('https://localhost:3000/api/results', {
        questionType,
        results: testResults,
      }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log('Results submitted successfully');
    } catch (e) {
      console.error('Error submitting results:', e);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>JavaScript Code Executor with Monaco Editor</h1>
      <div>
        <button onClick={() => navigate('/addition')}>Load Addition Question</button>
        <button onClick={() => navigate('/minimum')}>Load Minimum Question</button>
        <button onClick={() => navigate('/palindrome')}>Load Palindrome Question</button>
      </div>
      <Editor
        height="300px"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />
      <br />
      <button onClick={runCode}>Run Tests</button>
      <button onClick={submitResults}>Submit Results</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
        <h2>Error:</h2>
        <pre>{error}</pre>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/:questionType" element={<QuestionLoader />} />
      <Route path="/" element={<div>Welcome! Navigate to /addition, /minimum, or /palindrome.</div>} />
    </Routes>
  </Router>
);

export default App;
