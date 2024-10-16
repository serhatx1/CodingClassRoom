import { useState } from "react";

const useCodeRunner = (questionType, code, testCases) => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState({});

  console.log("Initial values:", questionType, code, testCases);

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
      console.log("Starting code execution");

      const funcName = questionType;

      const userCode = `
      ${code} // User-defined code here
      if (typeof ${funcName} !== 'function') {
         throw new Error('Function ${funcName} is not defined.');
      }
      return ${funcName}; // Return the function
    `;
    
      const func = new Function(userCode);
      const userFunction = func();

      if (typeof userFunction !== 'function') {
        throw new Error(`The evaluated code did not return a function`);
      }

      console.log("User function defined successfully");

      const results = {};
      testCases.forEach(({ input, expected }, index) => {
        
        let result;
        console.log(`Processing test case ${index + 1}`);
        try {
          console.log(`Running test case ${index + 1}`);
          console.log(`Input: ${input}`);
          result = userFunction(...JSON.parse(input));

          logs.push(`Test ${index + 1} input: ${input}`);
          logs.push(`Test ${index + 1} output: ${result}`);
          logs.push(`Test ${index + 1} result: ${result === expected ? 'passed' : 'failed'}`);

          results[`test${index + 1}`] = result == expected ? 'passed' : "failed";
        } catch (e) {
          console.error(`Error in test case ${index + 1}: ${e.message}`);
          results[`test${index + 1}`] = 'error';
          logs.push(`Test ${index + 1} error: ${e.message}`);
        }
      });

      setOutput(logs.join('\n'));
      setTestResults(results);
    } catch (e) {
      setError(`Error executing code: ${e.message}`);
      console.error("Error in code execution:", e);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  return { output, error, testResults, runCode };
};

export default useCodeRunner;
