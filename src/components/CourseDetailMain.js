import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../style/coursedetail.css';
import courseData from '../data/coursecards.json'; 
import evaluationsData from '../data/evaluations.json'; 
import questionsData from '../data/questions.json'; 

const CourseDetailMain = () => {
  const { courseId } = useParams(); 
  const [course, setCourse] = useState(null); 
  const [statistics, setStatistics] = useState({ difficulty: 0, workload: 0, overallRating: 0, averageScore: 0 });
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const selectedCourse = courseData.find(course => course.id === parseInt(courseId));
    setCourse(selectedCourse);

    if (selectedCourse) {
      const courseEvaluations = evaluationsData.filter(evaluation => evaluation.courseTitle === selectedCourse.title);
      const courseQuestions = questionsData.filter(question => question.courseTitle === selectedCourse.title);
      
      setFilteredEvaluations(courseEvaluations);
      setFilteredQuestions(courseQuestions);
      
      if (courseEvaluations.length > 0) {
        const totalDifficulty = courseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.drating), 0);
        const totalWorkload = courseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.wlrating), 0);
        const totalOverallRating = courseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.rating), 0);
        const totalGrades = courseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.grade), 0);

        const difficulty = totalDifficulty / courseEvaluations.length;
        const workload = totalWorkload / courseEvaluations.length;
        const overallRating = totalOverallRating / courseEvaluations.length;
        const averageScore = totalGrades / courseEvaluations.length;

        setStatistics({ difficulty, workload, overallRating, averageScore });
      }
    }
  }, [courseId]);

  const getYearFromQuarter = (quarterTaught) => {
    const parts = quarterTaught.split(', ');
    return parts.length === 2 ? parts[1] : 'Unknown';
  };

  if (!course) {
    return <div>Loading...</div>; 
  }

  return (
    <main className="course-detail-page course-detail-main">
      <div className="info-box">
        <Link to="/" aria-label="go back to index page" className="back">Back</Link>
        <h1>{course.title} {course.description}</h1>
        <div className="course-info">
          <ul className="info-list">
            <li>{course.credit} credit | {course.tagRSN}</li>
            <li>
              <a href={course.myplanLink} target="_blank" rel="noopener noreferrer" className="coursedetail-link">
                <img src="/img/external_link_line_icon.png" className="coursedetail-image link-icon" alt="Myplan Icon" />
                <span className="link-text">Myplan</span>
              </a>
            </li>
            <li>
              <a href={course.dawgpathLink} target="_blank" rel="noopener noreferrer" className="coursedetail-link">
                <img src="/img/external_link_line_icon.png" className="coursedetail-image link-icon" alt="DawgPath Icon" />
                <span className="link-text">DawgPath</span>
              </a>
            </li>
          </ul>
          <div className="statistics">
            <div className="stat-wrapper">
              <label htmlFor="difficulty">Rating Difficulty</label>
              <progress id="difficulty" value={statistics.difficulty} max="5"></progress>
              <span className="progress-value">{statistics.difficulty.toFixed(2)}</span>
            </div>
            <div className="stat-wrapper">
              <label htmlFor="workload">Workload</label>
              <progress id="workload" value={statistics.workload} max="5"></progress>
              <span className="progress-value">{statistics.workload.toFixed(2)}</span>
            </div>
            <div className="stat-wrapper">
              <label htmlFor="overallRating">Overall Rating</label>
              <progress id="overallRating" value={statistics.overallRating} max="5"></progress>
              <span className="progress-value">{statistics.overallRating.toFixed(2)}</span>
            </div>
            <p className="average-score">Average Grade: {statistics.averageScore.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="course-introduction-box">
        <h2>Course Introduction</h2>
        <p>{course.courseIntroduction}</p>
      </div>
      <div className="evaluation-container">
        <div className="evaluate-box">
          <h2>
            <Link to="/evaluation" className="coursedetail-link">Evaluate ({filteredEvaluations.length})</Link>
          </h2>
          <p>{filteredEvaluations.length > 0 ? filteredEvaluations[0].comment : 'No evaluations yet.'}</p>
          <p className="user-info">Taught by <span className="username">{filteredEvaluations.length > 0 ? filteredEvaluations[0].instructor : 'Anonymous'}</span> on <span className="publish-date">{filteredEvaluations.length > 0 ? getYearFromQuarter(filteredEvaluations[0].quarterTaught) : 'Unknown'}</span></p>
        </div>
        <div className="question-box">
          <h2>
            <Link to='/qa'>Question ({filteredQuestions.length})</Link>
          </h2>
          <p>{filteredQuestions.length > 0 ? filteredQuestions[0].title : 'No questions yet.'}</p>
          <p className="user-info">Posted by <span className="username">{filteredQuestions.length > 0 ? filteredQuestions[0].username : 'Anonymous'}</span></p>
        </div>
      </div>
      <div className="background-only-box">
        <img src={"/img/picture1.png"} alt="Course related" className="course-detail-image" />
      </div>
    </main>
  );
};

export default CourseDetailMain;
