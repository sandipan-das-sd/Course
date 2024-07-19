import React, { useState } from 'react';
import axios from 'axios';

const YearForm = ({ courseId }) => {
    const [year, setYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/course/${courseId}/year`, { year });
        setYear('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
            />
            <button type="submit">Add Year</button>
        </form>
    );
};

export default YearForm;
