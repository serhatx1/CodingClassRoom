import { useState } from "react";

const useCodeRunner = (questionType, code, testCases) => {
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [testResults, setTestResults] = useState({});
  
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
        switch (questionType) {
          case 'addition':
            funcName = 'value';
            break;
          case 'minimum':
            funcName = 'findMin';
            break;
          case 'palindrome':
            funcName = 'isPalindrome';
            break;
          default:
            throw new Error('Unknown question type');
        }
  
        const userCode = `
          ${code}
          if (typeof ${funcName}!== 'function') {
            throw new Error('Function ${funcName} is not defined.');
          }
          return ${funcName}; // Return the function
        `;
  
        const func = new Function(userCode);
        const userFunction = func();
  
        if (typeof userFunction!== 'function') {
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
  
            console.log(`Test ${index + 1} input: ${JSON.stringify(input)}`);
            console.log(`Test ${index + 1} output: ${result}`);
            console.log(`Test ${index + 1} result: ${result === expected? 'passed' : 'failed'}`);
  
            results[`test${index + 1}`] = result === expected? 'passed' : 'failed';
            if (result!== expected) {
              allTestsPassed = false;
            }
          } catch (e) {
            allTestsPassed = false;
            results[`test${index + 1}`] = 'error';
            console.log(`Test ${index + 1} error: ${e.message}`);
          }
        });
  
        setOutput(logs.join('\n'));
        setTestResults(results);
      } catch (e) {
        setError(`Error executing code: ${e.message}`);
      } finally {
        console.log = originalConsoleLog;
      }
    };
  
    return { output, error, testResults, runCode };
  };
  export default useCodeRunner;
