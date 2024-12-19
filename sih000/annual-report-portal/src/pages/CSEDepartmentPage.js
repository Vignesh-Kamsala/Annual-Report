import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../styles/DepartmentPage.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CSEDepartmentPage = () => {
    const [departmentData, setDepartmentData] = useState(null); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const authToken = sessionStorage.getItem('authToken'); // Token to authenticate API requests

    useEffect(() => {
        const fetchDepartmentData = async () => {
            try {
                const response = await fetch('/api/department/cs', {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.message);
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setDepartmentData(data); // Store the fetched department data
            } catch (error) {
                setError('Failed to fetch department data');
            } finally {
                setLoading(false); // Stop loading when the request is done
            }
        };

        fetchDepartmentData();
    }, [authToken]);

    // Handling loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!departmentData) {
        return <div>Error loading department data.</div>;
    }

    // Performance Data for Charts
    const performanceData = {
        labels: departmentData.performance?.labels || [], // Ensure labels exist
        datasets: [
            {
                label: 'Student Performance',
                data: departmentData.performance?.studentPerformance || [], // Ensure data exists
                fill: false,
                borderColor: 'blue',
            },
            {
                label: 'Faculty Research Performance',
                data: departmentData.performance?.facultyPerformance || [],
                fill: false,
                borderColor: 'green',
            },
            {
                label: 'Overall Department Performance',
                data: departmentData.performance?.overallPerformance || [],
                fill: false,
                borderColor: 'red',
            },
        ],
    };

    return (
        <div className="department-page">
            {/* HOD and Faculty Section */}
            <section id="hod-faculty">
                <h2>Head of Department and Faculty</h2>
                <div className="hod">
                    <img
                        src={departmentData.hod?.imageUrl || 'https://via.placeholder.com/150'}
                        alt="HOD"
                        className="hod-image"
                    />
                    <h3>{departmentData.hod?.name}</h3>
                    <p><strong>{departmentData.hod?.position}</strong></p>
                    <p>{departmentData.hod?.description}</p>
                </div>
                <div className="faculty-list">
                    <h3>Faculty Members</h3>
                    <table className="faculty-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Specialization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentData.faculty?.map((faculty, index) => (
                                <tr key={index}>
                                    <td>{faculty.name}</td>
                                    <td>{faculty.position}</td>
                                    <td>{faculty.specialization}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Curriculum Section */}
            <section id="curriculum">
                <h2>Curriculum for the Semesters</h2>
                <table className="curriculum-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Semester 1</th>
                            <th>Semester 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(departmentData.curriculum || {}).map((year) => (
                            <tr key={year}>
                                <td>{`Year ${year.replace('year', '')}`}</td>
                                <td>
                                    <ul>
                                        {departmentData.curriculum[year]?.semester1?.map((subject, idx) => (
                                            <li key={idx}>{subject}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {departmentData.curriculum[year]?.semester2?.map((subject, idx) => (
                                            <li key={idx}>{subject}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Academic and Sports Performance Section */}
            <section id="academic-sports-performance">
                <div className="performance-container">
                    <div className="academic-performance">
                        <h2>Academic Performance</h2>
                        <table className="performance-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departmentData.performance?.academic?.details?.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="sports-performance">
                        <h2>Sports Performance</h2>
                        <table className="performance-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departmentData.performance?.sports?.details?.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Laboratory Conditions and Equipment Details Section */}
            <section id="laboratory">
                <h2>Laboratory Conditions and Equipment Details</h2>
                <table className="laboratory-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentData.laboratory?.map((labItem, index) => (
                            <tr key={index}>
                                <td>{labItem.item}</td>
                                <td>
                                    <ul>
                                        {labItem.details?.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Student Achievements and Research Publications Section */}
            <section id="achievements-publications">
                <div className="achievements-publications-container">
                    <div className="student-achievements">
                        <h2>Student Achievements</h2>
                        <table className="achievements-table">
                            <thead>
                                <tr>
                                    <th>Achievement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departmentData.achievements?.students?.map((achievement, index) => (
                                    <tr key={index}>
                                        <td>{achievement}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="research-publications">
                        <h2>Research Publications</h2>
                        <table className="research-table">
                            <thead>
                                <tr>
                                    <th>Publication</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departmentData.achievements?.research?.map((publication, index) => (
                                    <tr key={index}>
                                        <td>{publication}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Performance Graphs Section */}
            <section id="performance-graphs">
                <h2>Performance Graphs</h2>
                <div className="chart-container">
                    <Line data={performanceData} />
                </div>
            </section>
        </div>
    );
};

export default CSEDepartmentPage;
