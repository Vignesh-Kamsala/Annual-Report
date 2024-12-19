import React, { useState } from 'react';

const DataUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            console.log("Uploading", file.name);
            // Implement upload logic
        } else {
            alert("Please select a file to upload.");
        }
    };

    return (
        <div>
            <h3>Upload Data</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default DataUpload;
