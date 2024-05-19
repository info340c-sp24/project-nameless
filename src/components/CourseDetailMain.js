import React from 'react';
import { Link } from 'react-router-dom';
import '../style/coursedetail.css';

const CourseDetailMain = ({ evaluations, questions }) => {

  const getYearFromQuarter = (quarterTaught) => {
    const parts = quarterTaught.split(', ');
    return parts.length === 2 ? parts[1] : 'Unknown';
  };

  return (
    <main className="course-detail-page course-detail-main">
      <div className="info-box">
        <Link to="/" aria-label="go back to index page" className="back">Back</Link>
        <h1>INFO 340 Client-Side Development</h1>
        <div className="course-info">
          <ul className="info-list">
            <li>5 credit | RSN</li>
            <li>
              <a href="https://myplan.uw.edu/course/#/courses/INFO%20340?id=87022718-a92e-4ac7-b774-2a6289c77ff4" target="_blank" rel="noopener noreferrer" className="coursedetail-link">
                <img src="/img/external_link_line_icon.png" className="coursedetail-image link-icon" alt="Myplan Icon" />
                <span className="link-text">Myplan</span>
              </a>
            </li>
            <li>
              <a href="https://dawgpath.uw.edu/course?id=INFO%20340&campus=seattle" target="_blank" rel="noopener noreferrer" className="coursedetail-link">
              <img src="/img/external_link_line_icon.png" className="coursedetail-image link-icon" alt="DawgPath Icon" />
                <span className="link-text">DawgPath</span>
              </a>
            </li>
          </ul>
          <div className="statistics">
            <div className="stat-wrapper">
              <label htmlFor="difficulty">Rating difficulty</label>
              <progress id="difficulty" value="3.11" max="4"></progress>
              <span className="progress-value">3.11</span>
            </div>
            <div className="stat-wrapper">
              <label htmlFor="workload">Workload</label>
              <progress id="workload" value="3.01" max="4"></progress>
              <span className="progress-value">3.01</span>
            </div>
            <div className="stat-wrapper">
              <label htmlFor="score">Score</label>
              <progress id="score" value="3.21" max="4"></progress>
              <span className="progress-value">3.21</span>
            </div>
            <p className="average-score">Average score: 3.55</p>
          </div>
        </div>
      </div>
      <div className="course-introduction-box">
        <h2>Course Introduction</h2>
        <p>Introduction to client-side development on the internet, including markup, programming languages, protocols, libraries, and frameworks for creating and maintaining usable and accessible, interactive applications. Prerequisite: either CSE 143, CSE 154, or CSE 163; and INFO 201.</p>
      </div>
      <div className="evaluation-container">
        <div className="evaluate-box">
          <h2>
            <Link to="/evaluation" className="coursedetail-link">Evaluate ({evaluations.length})</Link>
          </h2>
          <p>{evaluations.length > 0 ? evaluations[0].comment : 'No evaluations yet.'}</p>
          <p className="user-info">Posted by <span className="username">{evaluations.length > 0 ? evaluations[0].instructor : 'Anonymous'}</span> on <span className="publish-date">{evaluations.length > 0 ? getYearFromQuarter(evaluations[0].quarterTaught) : 'Unknown'}</span></p>
        </div>
        <div className="question-box">
          <h2>
            <Link to='/qa'>Question ({questions.length})</Link>
          </h2>
          <p>{questions.length > 0 ? questions[0].title : 'No questions yet.'}</p>
          <p className="user-info">Posted by <span className="username">{questions.length > 0 ? 'Kim' : 'Anonymous'}</span></p>
        </div>
      </div>
      <div className="background-only-box">
        <img src={"/img/picture1.png"} alt="Course related" className="course-detail-image" />
      </div>
    </main>
  );
};

export default CourseDetailMain;
