import React, { useState } from "react";
import questionList from '../data/questions.json';
import { Link } from 'react-router-dom';
import '../style/qa.css'

const QuestionCard = ({ question, onAnswerSubmit }) => {
    const [isAnswering, setIsAnswering] = useState(false);
    const [answer, setAnswer] = useState('');

    const handleAnswerSubmit = () => {
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
        <div className="col-md-4">
            <div className="card">
            <div className="card-body">
                <div className="question">
                    <p className="card-title">{question.title}</p>
                </div>
                <div className="answer">
                    <ul className="card-text">
                        {question.answers.map((answer, index) => (
                            <li key={index}>{answer}</li>
                        ))}
                    </ul>
                </div>
                <br />
                <div className="reply">
                    {isAnswering ? (
                        <div>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter your answer"
                            ></textarea>
                            <button onClick={handleAnswerSubmit}>Submit</button>
                            <button onClick={handleAnswerCancel}>Cancel</button>
                        </div>
                ) : (
                    <button onClick={() => setIsAnswering(true)}>Answer</button>
                )}
                </div>
            </div>
        </div>
        </div>
    );
};


const QAPage = () => {
    const [questions, setQuestions] = useState(questionList);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAsking, setIsAsking] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');

    const handleAskQuestion = () => {
        if (newQuestion.trim() !== '') {
          const newQuestionObj = {
            id: questions.length + 1,
            title: newQuestion,
            answers: [],
          };
          setQuestions([...questions, newQuestionObj]);
          setNewQuestion('');
          setIsAsking(false);
        }
    };

    const handleAskCancel = () => {
        setNewQuestion('');
        setIsAsking(false);
    };

    const handleAnswerSubmit = (questionId, answer) => {
        const questionIndex = questions.findIndex((q) => q.id === questionId);
        if (questionIndex !== -1) {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex] = {
                ...questions[questionIndex],
                answers: [...questions[questionIndex].answers, answer],
            };
            setQuestions(updatedQuestions);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredQuestions = questions.filter((question) =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
        <div className="title_ask">
            <Link to='/detail'>Back</Link>
            <h1>Q &amp; A Board</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search for Questions"
                    className="search_q"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="button">Search</button>
            </div>
            <div className="ask">
                {isAsking ? (
                    <div>
                        <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Enter your question"
                        ></textarea>
                        <button onClick={handleAskQuestion}>Submit</button>
                        <button onClick={handleAskCancel}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setIsAsking(true)}>Ask a Question</button>
                )}
            </div>
        </div>

        <div className="question-container">
            <div className="container">
                <div className="row">
                    {filteredQuestions.map((question) => (
                        <div key={question.id} className="col-md-4">
                            <QuestionCard question={question} onAnswerSubmit={handleAnswerSubmit} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default QAPage;