import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import courses from '../data/coursecards.json';
import '../style/index.css';

const HomePage = ({ searchQuery }) => {
    const location = useLocation();
    const [filteredCourses, setFilteredCourses] = useState(courses);

    useEffect(() => {
        const query = location.state?.searchQuery || searchQuery;
        if (query) {
            setFilteredCourses(courses.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query)
            ));
        } else {
            setFilteredCourses(courses);
        }
    }, [location.state, searchQuery]);

    return (
        <div className="main_page">
            <div className="courses">
                {filteredCourses.map(course => (
                    <Link to={`/detail/${course.title}`} key={course.title}>
                        <div className="course_card">
                            <div className="course_background">
                                <img src={course.image} className="course_img" alt={course.description} />
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