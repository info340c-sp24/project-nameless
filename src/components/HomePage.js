import React from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/coursecards.json';
import '../style/index.css';

const HomePage = () => {
    return (
        <div className="main_page">
            <div className="courses">
                {courses.map(course => (
                    <Link to={`/detail/${course.id}`} key={course.id}>
                        <div className="course_card">
                            <div className="course_background">
                                <img src="img/titlebackground.jpeg" className="course_img" alt={course.description} />
                                <div className="course_title">
                                    <p>{course.title}</p>
                                </div>
                            </div>
                            <div className="simple_description">
                                <div className="course-name">
                                    <p>{course.description}</p>
                                </div>
                                <div className="description-tags">
                                    <div className="tag_RSN">
                                        <p className='credit'>{course.tagRSN}</p>
                                    </div>
                                    <div className="tag_credit">
                                        <p className='credit'>{course.credit}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;