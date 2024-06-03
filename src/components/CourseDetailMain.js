import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../style/coursedetail.css';

const CourseDetailMain = ( { courseData, evaluations, questions }) => {
  const { courseTitle } = useParams();
  const [course, setCourse] = useState(null);
  const [statistics, setStatistics] = useState({ difficulty: 0, workload: 0, overallRating: 0, averageScore: 0 });

  let courseEvaluations = evaluations;
  let courseQuestions = questions;

  useEffect(() => {
    const selectedCourse = courseData.find(course => course.title.toString() === courseTitle);
    setCourse(selectedCourse);

    if (selectedCourse) {
      courseEvaluations = evaluations.filter(evaluation => evaluation.courseTitle === selectedCourse.title);
      courseQuestions = questions.filter(question => question.courseTitle === selectedCourse.title);

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
  }, [courseTitle]);

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
            <Link to={`/evaluation/${course.title}`} key={course.title} className="coursedetail-link">Evaluate ({courseEvaluations.length})</Link>
          </h2>
          {courseEvaluations.length > 0 ? (
            <p>{courseEvaluations[0].comment}</p>
          ) : (
            <p>No evaluations yet.</p>
          )}
          <p className="user-info">Taught by <span className="username">{courseEvaluations.length > 0 ? courseEvaluations[0].instructor : 'Anonymous'}</span></p>
        </div>
        <div className="question-box">
          <h2>
            <Link to={`/qa/${course.title}`} key={course.title}>Question ({courseQuestions.length})</Link>
          </h2>
          {courseQuestions.length > 0 ? (
            <p>{courseQuestions[0].title}</p>
          ) : (
            <p>No questions yet.</p>
          )}
        </div>
      </div>
      <div className="background-only-box">
        <img src={"/img/picture1.png"} alt="Course related" className="course-detail-image" />
      </div>
    </main>
  );
};

export default CourseDetailMain;
