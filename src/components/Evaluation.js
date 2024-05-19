import React from 'react';
import '../style/eval.css';

function Evaluation({ evaluations }) {
  return (
    <div>
      <main>
        <div class="rate">
            <div class="rate-wrap">
                    <a href="/" aria-label="go back to detail page" class="back">Back</a>
                    <h1> Class Rating for INFO340</h1>
                    <a href="/rate" aria-label="go to the rating page" class="back">Submit Rating</a>
            </div>
        </div>
        <div>
          {evaluations.map((evaluation, index) => (
            <div className="container" key={index}>
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