import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
import { ref, onValue, push, set } from 'firebase/database';
import initializeDatabase from './components/initializeDatabase';

const App = ({ database }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const evaluationRef = ref(database, 'evaluations');
    const questionsRef = ref(database, 'questions');

    onValue(evaluationRef, (snapshot) => {
      const fetchedEvaluations = snapshot.val() || [];
      setEvaluations(fetchedEvaluations);
    });

    onValue(questionsRef, (snapshot) => {
      const fetchedQuestions = snapshot.val() || [];
      setQuestions(fetchedQuestions);
    });
  }, [database]);

  const handleAddEvaluation = (evaluation) => {
    const newEvaluationRef = push(ref(database, 'evaluations'));
    set(newEvaluationRef, evaluation).then(() => {
      console.log('Successfully submitted evaluation!');
    }).catch((error) => {
      console.error('Error writing evaluation:', error);
    });
  };

  const handleAddQuestion = (question) => {
    const newQuestionRef = push(ref(database, 'questions'));
    set(newQuestionRef, question).then(() => {
      console.log('Successfully submitted question!');
    }).catch((error) => {
      console.error('Error writing question:', error);
    });
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
        {/* {!isLoggedIn && (
          <div className="login-overlay">
            <p>Please login to access course evaluations</p>
            <Link to="/login" className='blur-login'>Login</Link>
          </div>
        )} */}
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} isLoggedIn={isLoggedIn} />} />
          <Route path="/detail/:courseId" element={<CourseDetailMain />} isLoggedIn={isLoggedIn} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/qa/:courseId" element={<QAPage questions={questions} setQuestions={setQuestions} onAddQuestion={handleAddQuestion} />} isLoggedIn={isLoggedIn} />
          <Route path="/rate/:courseId" element={<Rate onAddEvaluation={handleAddEvaluation} isLoggedIn={isLoggedIn} />} />
          <Route path="/evaluation/:courseId" element={<Evaluation evaluations={evaluations} isLoggedIn={isLoggedIn} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


