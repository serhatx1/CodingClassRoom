import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionLoader from './Component/Question';

const App = () => (
  <Router>
    <Routes>
      <Route path="/:questionType" element={<QuestionLoader />} />
      <Route path="/" element={<div>Welcome! Navigate to /addition, /minimum, or /palindrome.</div>} />
    </Routes>
  </Router>
);

export default App;
