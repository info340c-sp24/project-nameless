import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddEvaluation = (evaluation) => {
    setEvaluations([...evaluations, evaluation]);
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header setSearchQuery={setSearchQuery} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} isLoggedIn={isLoggedIn} />} />
          <Route path="/detail/:courseId" element={<CourseDetailMain evaluations={evaluations} questions={questions} isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/qa" element={<QAPage questions={questions} setQuestions={setQuestions} onAddQuestion={handleAddQuestion} isLoggedIn={isLoggedIn} />} />
          <Route path="/rate" element={<Rate onAddEvaluation={handleAddEvaluation} isLoggedIn={isLoggedIn} />} />
          <Route path="/evaluation" element={<Evaluation evaluations={evaluations} isLoggedIn={isLoggedIn} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


