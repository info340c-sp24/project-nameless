import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CourseDetailMain from './components/CourseDetailMain';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/Signup';
import QAPage from './components/qa';
import Rate from './components/Rate';
import Evaluation from './components/Evaluation';

const App = () => {
  const [evaluations, setEvaluations] = useState([]);

  const handleSubmitEvaluation = (evaluation) => {
    setEvaluations([...evaluations, evaluation]);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<CourseDetailMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/qa' element={<QAPage />} />
          <Route path="/rate" element={<Rate onSubmitEvaluation={handleSubmitEvaluation} />}/>
          <Route path="/evaluation" element={<Evaluation evaluations={evaluations} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


