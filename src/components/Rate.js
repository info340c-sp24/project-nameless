import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/eval.css';

function Rate({ onSubmitEvaluation }) {
  const [formData, setFormData] = useState({
    instructor: '',
    quarterTaught: '',
    drating: '',
    wlrating: '',
    rating: '',
    grade: '',
    comment: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitEvaluation(formData);
    setFormData({
      instructor: '',
      quarterTaught: '',
      drating: '',
      wlrating: '',
      rating: '',
      grade: '',
      comment: '',
    });
    navigate('/evaluation');
  };

  return (
    <div>
      <main>
        <a href="/evaluation" aria-label="go back to evaluation page" className="back eval-back">
          Back
        </a>
        <h1>Submit your Rating</h1>
        <div className="rateee">
          <form onSubmit={handleSubmit}>
            <div className="input-fields">
              <label htmlFor="instructor">Instructor:</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-fields">
              <label htmlFor="quarterTaught">Quarter Taught:</label>
              <input
                type="text"
                id="quarterTaught"
                name="quarterTaught"
                value={formData.quarterTaught}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-fields">
              <label htmlFor="drating">Course Difficulty:</label>
              <select
                id="drating"
                name="drating"
                value={formData.drating}
                onChange={handleChange}
                required
              >
                <option value="">Select Difficulty</option>
                <option value="5">5 - Most Difficult</option>
                <option value="4">4 - Very Difficult</option>
                <option value="3">3 - Difficult</option>
                <option value="2">2 - Not so Difficult</option>
                <option value="1">1 - Easy</option>
              </select>
            </div>

            <div className="input-fields">
              <label htmlFor="wlrating">Course Work Load:</label>
              <select
                id="wlrating"
                name="wlrating"
                value={formData.wlrating}
                onChange={handleChange}
                required
              >
                <option value="">Select Work Load</option>
                <option value="5">5 - Overwhelming</option>
                <option value="4">4 - Very Much</option>
                <option value="3">3 - Reasonable</option>
                <option value="2">2 - Light</option>
                <option value="1">1 - Very Light</option>
              </select>
            </div>

            <div className="input-fields">
              <label htmlFor="rating">Your Overall Rating:</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                <option value="">Select overall Rating</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            <div className="input-fields">
              <label htmlFor="grade">Grade (Out of 4.0):</label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-fields">
              <label htmlFor="comment">Your Comment:</label>
              <br />
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit">Submit Rating</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Rate;