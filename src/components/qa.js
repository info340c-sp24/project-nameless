import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../style/qa.css';
import { ref, onValue, push, set, update } from 'firebase/database';

const QuestionCard = ({ question, onAnswerSubmit }) => {
  const [isAnswering, setIsAnswering] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    if (answer.trim() !== '') {
      onAnswerSubmit(question.id, answer);
      setAnswer('');
      setIsAnswering(false);
    }
  };

  const handleAnswerCancel = () => {
    setAnswer('');
    setIsAnswering(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="question">
          <p className="card-title">{question.title}</p>
        </div>
        <div className="answer">
          <ul className="card-text">
            {question.answers && question.answers.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </div>
        <br />
        <div className="reply">
          {isAnswering ? (
            <form onSubmit={handleAnswerSubmit}>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
              ></textarea>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleAnswerCancel}>Cancel</button>
            </form>
          ) : (
            <button onClick={() => setIsAnswering(true)}>Answer</button>
          )}
        </div>
      </div>
    </div>
  );
};

const QAPage = ({ database, questions, setQuestions, onAddQuestion, isLoggedIn }) => {
  const { courseTitle } = useParams();
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noMatchingResults, setNoMatchingResults] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const filtered = questions.filter(q => q.courseTitle === courseTitle);
    setFilteredQuestions(filtered);
  }, [courseTitle, questions]);

  useEffect(() => {
    const questionsRef = ref(database, 'questions');
    onValue(questionsRef, (snapshot) => {
      const fetchedQuestions = snapshot.val();
      if (fetchedQuestions) {
        const updatedQuestions = Object.values(fetchedQuestions);
        setQuestions(updatedQuestions);
      }
    });
  }, [database]);

  // const handleAnswerSubmit = (answer) => {
  //   const questionIndex = questions.findIndex((q) => q.courseTitle === courseTitle);
  //   console.log(questionIndex);
  //   if (questionIndex !== -1) {
  //   const answerRef = ref(database, `questions/${questionIndex}/answers/${questions[questionIndex].answers.length}`);
  //   set(answerRef, answer).then(() => {
  //     console.log('Successfully submitted answer!');
  //   }).catch((error) => {
  //     console.error('Error writing answer:', error);
  //   });
  //   }
  // };

  const handleAnswerSubmit = (questionId, answer) => {
    const questionIndex = questions.findIndex((q) => q.id === questionId);
    if (questionIndex !== -1) {
      const questionRef = ref(database, `questions/${questionIndex}`);
      const currentAnswers = questions[questionIndex].answers;

      let updatedAnswers;
      if (currentAnswers.length === 1 && currentAnswers[0] === "No answer yet...") {
        updatedAnswers = [answer];
      } else {
        updatedAnswers = [...currentAnswers, answer];
      }

      const answerRef = ref(database, `questions/${questionIndex}/answers`);
      set(answerRef, updatedAnswers)
        .then(() => {
          console.log('Successfully submitted answer!');
        })
        .catch((error) => {
          console.error('Error writing answer:', error);
        });
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setNoMatchingResults(false);
    } else {
      const filteredResults = questions.filter((question) =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      setNoMatchingResults(filteredResults.length === 0);
    }
  };

  const handleAskQuestion = (event) => {
    event.preventDefault();
    if (newQuestion.trim() !== '') {
      const newQuestionObj = {
        id: questions.length + 1,
        title: newQuestion,
        answers: ["No answer yet..."],
        courseTitle: courseTitle
      };
      onAddQuestion(newQuestionObj);
      setNewQuestion('');
      setIsAsking(false);
    }
  };

  const handleAskCancel = () => {
    setNewQuestion('');
    setIsAsking(false);
  };

  return (
    <div>
      {!isLoggedIn && (
        <div className="login-overlay">
          <p>Please login to access</p>
          <Link to="/login" className='blur-login'>Login</Link>
        </div>
      )}
      <div className={`title_ask ${isLoggedIn ? '' : 'blurred'}`}>
        <Link to={`/detail/${courseTitle}`}>
          <button className="back-btn-qa">Back</button>
        </Link>
        <h1>Q &amp; A Board</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for Questions"
            className="search_q"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="button" onClick={handleSearch} className="search-btn-qa">Search</button>
          {noMatchingResults && (
            <div className="no-match">
              <p>No Matching Questions</p>
            </div>
          )}
        </div>
        <div className={`ask`}>
          {isAsking ? (
            <form onSubmit={handleAskQuestion}>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question"
              ></textarea>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleAskCancel}>Cancel</button>
            </form>
          ) : (
            <button onClick={() => setIsAsking(true)}>Ask a Question</button>
          )}
        </div>
      </div>

      <div className={`question-container title_ask ${isLoggedIn ? '' : 'blurred'}`}>
        <div className="container">
          <div className="row">
            {searchResults.length > 0 ? (
              searchResults.map((question) => (
                <div key={question.id} className="col-md-4">
                  <QuestionCard question={question} onAnswerSubmit={handleAnswerSubmit} />
                </div>
              ))
            ) : (
              filteredQuestions.map((question) => (
                <div key={question.id} className="col-md-4">
                  <QuestionCard question={question} onAnswerSubmit={handleAnswerSubmit} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAPage;