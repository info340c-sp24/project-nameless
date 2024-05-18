import React, { useState } from "react";
import questionList from '../data/questions.json';
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

    return (
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
                        </div>
                ) : (
                    <button onClick={() => setIsAnswering(true)}>Answer</button>
                )}
                </div>
            </div>
        </div>
    );
};


const QAPage = () => {
    const [questions, setQuestions] = useState(questionList);
    const [searchQuery, setSearchQuery] = useState('');

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
            <a href="course_detail.html" className="back">Back</a>
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
                <a href="ask.html" className="back">Ask a Question</a>
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