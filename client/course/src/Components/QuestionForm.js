import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = ({ courseId, yearId, subjectId }) => {
    const [type, setType] = useState('text');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/course/${courseId}/year/${yearId}/subject/${subjectId}/question`, { type, content });
        setType('text');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
            </select>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Question Content"
            />
            <button type="submit">Add Question</button>
        </form>
    );
};

export default QuestionForm;
