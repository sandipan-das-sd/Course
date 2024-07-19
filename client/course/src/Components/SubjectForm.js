import React, { useState } from 'react';
import axios from 'axios';

const SubjectForm = ({ courseId, yearId }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/course/${courseId}/year/${yearId}/subject`, { name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Subject Name"
            />
            <button type="submit">Add Subject</button>
        </form>
    );
};

export default SubjectForm;
