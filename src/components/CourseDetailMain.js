import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import '../style/coursedetail.css';

const CustomLabel = (props) => {
  const { x, y, width, value } = props;
  return <text x={x + width + 5} y={y + 15} fill="#666" textAnchor="start">{value.toFixed(2)}</text>;
};

const CourseDetailMain = ({ courseData, evaluations, questions }) => {
  const { courseTitle } = useParams();
  const [course, setCourse] = useState(null);
  const [statistics, setStatistics] = useState({ difficulty: 0, workload: 0, overallRating: 0, averageScore: 0 });
  const [courseEvaluations, setCourseEvaluations] = useState(evaluations);
  const [courseQuestions, setCourseQuestions] = useState(questions);

  useEffect(() => {
    if (courseData.length > 0) {
      const selectedCourse = courseData.find(course => course.title.toString() === courseTitle);
      setCourse(selectedCourse);

      if (selectedCourse) {
        const filteredCourseEvaluations = evaluations.filter(evaluation => evaluation.courseTitle === selectedCourse.title);
        setCourseEvaluations(filteredCourseEvaluations);
        const filteredCourseQuestions = questions.filter(question => question.courseTitle === selectedCourse.title);
        setCourseQuestions(filteredCourseQuestions);

        if (filteredCourseEvaluations.length > 0) {
          const totalDifficulty = filteredCourseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.drating), 0);
          const totalWorkload = filteredCourseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.wlrating), 0);
          const totalOverallRating = filteredCourseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.rating), 0);
          const totalGrades = filteredCourseEvaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.grade), 0);

          const difficulty = totalDifficulty / filteredCourseEvaluations.length;
          const workload = totalWorkload / filteredCourseEvaluations.length;
          const overallRating = totalOverallRating / filteredCourseEvaluations.length;
          const averageScore = totalGrades / filteredCourseEvaluations.length;

          setStatistics({ difficulty, workload, overallRating, averageScore });
        }
      }
    }
  }, [courseTitle, courseData, evaluations, questions]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const data = [
    {name: 'Difficulty', value: statistics.difficulty, fill: '#8884d8'},
    {name: 'Workload', value: statistics.workload, fill: '#83a6ed'},
    {name: 'Overall', value: statistics.overallRating, fill: '#8dd1e1'}
  ];

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
          <div className="statistics">
              <div className="stat-wrapper">
                  <ResponsiveContainer width="70%" height={140} className="responsive-container">
                      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 35, left: 22, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 5]} />
                          <YAxis type="category" dataKey="name" />
                          <Tooltip />
                          <Bar dataKey="value" barSize={20} label={<CustomLabel />}>
                              {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
                  <p className="average-score">Average Grade: {statistics.averageScore.toFixed(2)}</p>
              </div>
           </div>
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
