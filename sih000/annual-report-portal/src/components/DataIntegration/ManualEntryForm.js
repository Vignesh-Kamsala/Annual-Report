import React, { useState } from 'react';

const ManualEntryForm = () => {
    const [data, setData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data submitted:", data);
        // Implement submission logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Manual Data Entry:</label>
                <textarea value={data} onChange={(e) => setData(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ManualEntryForm;
