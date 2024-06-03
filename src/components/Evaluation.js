import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/eval.css';

function Evaluation({ evaluations }) {
  const navigate = useNavigate();
  const { courseTitle } = useParams();
  const [filterInstructor, setFilterInstructor] = useState('');
  const [filterQuarter, setFilterQuarter] = useState('');
  const [filterRating, setFilterRating] = useState('');

  const handleBackClick = () => {
    navigate(`/detail/${courseTitle}`);
  };

  const handleRateClick = () => {
    navigate(`/rate/${courseTitle}`);
  };

  const handleInstructorChange = (event) => {
    setFilterInstructor(event.target.value);
  };

  const handleQuarterChange = (event) => {
    setFilterQuarter(event.target.value);
  };

  const handleRatingChange = (event) => {
    setFilterRating(event.target.value);
  };

  const filteredEvaluations = evaluations.filter((evaluation) => {
    const instructorMatch = filterInstructor === '' || evaluation.instructor.toLowerCase().includes(filterInstructor.toLowerCase());
    const quarterMatch = filterQuarter === '' || evaluation.quarterTaught.toLowerCase().includes(filterQuarter.toLowerCase());
    const ratingMatch = filterRating === '' || evaluation.rating === filterRating;
    const courseMatch = evaluation.courseTitle === courseTitle;
    return instructorMatch && quarterMatch && ratingMatch && courseMatch;
  });

  return (
    <div>
      <main>
        <div className="rate">
          <div className="rate-wrap">
            <button onClick={handleBackClick} aria-label="go back to detail page" className="back">Back</button>
            <h1>Class Rating for {courseTitle}</h1>
            <button onClick={handleRateClick} aria-label="go to the rating page" className="back">Submit Rating</button>
          </div>
        </div>
        <div>
          <div className="filter-group">
            <input
              type="text"
              id="instructor-filter"
              placeholder="Filter by Instructor"
              value={filterInstructor}
              onChange={handleInstructorChange}
              className="filter-input"
            />
            <input
              type="text"
              id="quarter-filter"
              placeholder="Filter by Quarter"
              value={filterQuarter}
              onChange={handleQuarterChange}
              className="filter-input"
            />
            <input
              type="text"
              id="rating-filter"
              placeholder="Filter by Overall Rating"
              value={filterRating}
              onChange={handleRatingChange}
              className="filter-input"
            />
          </div>
          {filteredEvaluations.map((evaluation, index) => (
            <div className="evaluationTable" key={index}>
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body p-1 m-1">
                      <p>{evaluation.instructor}</p>
                      <p>{evaluation.quarterTaught}</p>
                      <div className="card-text p-0 m-0">
                        <p>{evaluation.comment}</p>
                      </div>
                      <div className="ratingBoxContainer">
                        <div className="ratingBox">
                          <p>Difficulty:</p>
                          <p className="rating">{evaluation.drating} / 5</p>
                        </div>
                        <div className="ratingBox">
                          <p>Work Load:</p>
                          <p className="rating">{evaluation.wlrating} / 5</p>
                        </div>
                        <div className="ratingBox">
                          <p>Grades:</p>
                          <p className="rating">{evaluation.grade}</p>
                        </div>
                        <div className="ratingBox">
                          <p>Overall Rating:</p>
                          <p className="rating">{evaluation.rating} / 5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Evaluation;