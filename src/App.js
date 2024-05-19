import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CourseDetailMain from './components/CourseDetailMain';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/Signup';
import QAPage from './components/qa';
import Rate from './components/Rate';
import HomePage from './components/HomePage';
import Evaluation from './components/Evaluation';
import initialEvaluations from './data/evaluations.json';
import initialQuestions from './data/questions.json';

const App = () => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [questions, setQuestions] = useState(initialQuestions);

  const handleAddEvaluation = (evaluation) => {
    setEvaluations([...evaluations, evaluation]);
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<CourseDetailMain evaluations={evaluations} questions={questions} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/qa" element={<QAPage questions={questions} setQuestions={setQuestions} onAddQuestion={handleAddQuestion} />} />
          <Route path="/rate" element={<Rate onAddEvaluation={handleAddEvaluation} />} />
          <Route path="/evaluation" element={<Evaluation evaluations={evaluations} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


