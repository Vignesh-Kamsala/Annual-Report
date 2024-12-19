import React, { useState } from 'react';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback submitted:", feedback);
        // Implement feedback submission logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Feedback:</label>
                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FeedbackForm;
