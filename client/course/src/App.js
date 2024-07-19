import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseForm from './Components/CourseForm';
import YearForm from './Components/YearForm';
import SubjectForm from './Components/SubjectForm';
import QuestionForm from './Components/QuestionForm';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await axios.get('http://localhost:5000/courses');
      setCourses(result.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Education App</h1>
      <CourseForm />
      {courses.map(course => (
        <div key={course._id}>
          <h2>{course.name}</h2>
          <YearForm courseId={course._id} />
          {course.years.map(year => (
            <div key={year._id}>
              <h3>{year.year}</h3>
              <SubjectForm courseId={course._id} yearId={year._id} />
              {year.subjects.map(subject => (
                <div key={subject._id}>
                  <h4>{subject.name}</h4>
                  <QuestionForm courseId={course._id} yearId={year._id} subjectId={subject._id} />
                  {subject.questions.map(question => (
                    <div key={question._id}>
                      <p>{question.type}: {question.content}</p>
                      <p>Likes: {question.like} Dislikes: {question.dislike}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
