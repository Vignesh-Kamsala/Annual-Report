import React, { useState } from 'react';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setComments([...comments, newComment]);
        setNewComment('');
    };

    return (
        <div>
            <h3>Comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button type="submit">Add Comment</button>
            </form>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
