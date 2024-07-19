import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/course', { name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Course Name"
            />
            <button type="submit">Add Course</button>
        </form>
    );
};

export default CourseForm;
