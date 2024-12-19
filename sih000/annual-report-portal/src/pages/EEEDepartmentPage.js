import React, { useState } from 'react';
import '../styles/DepartmentPage.css';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const EEEDepartmentPage = () => {
    const [selectedYear, setSelectedYear] = useState(null);

    const curriculumData = {
        1: [
            { semester: 'Semester 1', subjects: ['Mathematics', 'Physics', 'Introduction to EEE', 'Circuit Theory', 'Programming in C'] },
            { semester: 'Semester 2', subjects: ['Digital Logic Design', 'Signals and Systems', 'Electrical Machines I', 'Electromagnetic Fields', 'Data Structures'] },
        ],
        2: [
            { semester: 'Semester 3', subjects: ['Power Electronics', 'Microprocessors', 'Control Systems', 'Electrical Machines II', 'Probability Theory'] },
            { semester: 'Semester 4', subjects: ['Digital Signal Processing', 'Power Systems I', 'High Voltage Engineering', 'Analog Circuits', 'Linear Algebra'] },
        ],
        3: [
            { semester: 'Semester 5', subjects: ['Electric Drives', 'Embedded Systems', 'Power Systems II', 'Renewable Energy', 'Ethics in Engineering'] },
            { semester: 'Semester 6', subjects: ['Smart Grid Technology', 'Energy Management', 'Power Quality', 'Electric Vehicle Technology', 'Project Work'] },
        ],
        4: [
            { semester: 'Semester 7', subjects: ['Advanced Power Systems', 'Smart Sensors', 'Power System Protection', 'Energy Storage Systems', 'Research Project'] },
            { semester: 'Semester 8', subjects: ['Industry Internship', 'Final Year Project', 'Advanced Topics in EEE', 'Seminar', 'Elective Course'] },
        ],
    };

    const handleYearClick = (year) => {
        setSelectedYear(year === selectedYear ? null : year);
    };

    return (
        <div>
        <div className="department-page">
            {/* HOD and Faculty Section */}
            <section className="hod-and-faculty">
                <h2>Head of Department and Faculty</h2>
                <div className="hod">
                    <img src="https://via.placeholder.com/150" alt="HOD" className="hod-image" />
                    <h3>Dr. Michael Brown</h3>
                    <p><strong>Head of Department</strong></p>
                    <p>Dr. Michael Brown leads the EEE department with expertise in power systems and renewable energy.</p>
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
                            <tr>
                                <td>Prof. Alice Johnson</td>
                                <td>Associate Professor</td>
                                <td>Power Electronics, Electrical Machines</td>
                            </tr>
                            <tr>
                                <td>Dr. Robert Green</td>
                                <td>Assistant Professor</td>
                                <td>Smart Grid, Renewable Energy</td>
                            </tr>
                            <tr>
                                <td>Ms. Laura White</td>
                                <td>Lecturer</td>
                                <td>Control Systems, Electric Drives</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="curriculum">
                <h2>Curriculum for the Semesters</h2>
                <div className="year-boxes">
                    <div className={`year-box ${selectedYear === 1 ? 'active' : ''}`} onClick={() => handleYearClick(1)}>Year 1</div>
                    <div className={`year-box ${selectedYear === 2 ? 'active' : ''}`} onClick={() => handleYearClick(2)}>Year 2</div>
                    <div className={`year-box ${selectedYear === 3 ? 'active' : ''}`} onClick={() => handleYearClick(3)}>Year 3</div>
                    <div className={`year-box ${selectedYear === 4 ? 'active' : ''}`} onClick={() => handleYearClick(4)}>Year 4</div>
                </div>
                {selectedYear && (
                    <div className="semester-curriculum-container">
                        {curriculumData[selectedYear].map((semesterData, index) => (
                            <div className="semester-curriculum" key={index}>
                                <h3>{semesterData.semester}</h3>
                                <ul>
                                    {semesterData.subjects.map((subject, idx) => (
                                        <li key={idx}>{subject}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Academic and Sports Performance Section */}
            <section className="performance-sections">
                <div className="performance-container">
                    <div className="academic-performance">
                        <h2>Academic Performance</h2>
                        <p>Details on the academic performance of students within the department, including pass rates, top performers, and overall grade distribution.</p>
                        <ul>
                            <li>Overall Pass Rate: 92%</li>
                            <li>Top Performers: John Doe (GPA: 9.8), Jane Smith (GPA: 9.7)</li>
                        </ul>
                    </div>

                    <div className="sports-performance">
                        <h2>Sports Performance</h2>
                        <p>Details on the sports achievements of students within the department, including team performances, individual accolades, and overall sports participation.</p>
                        <ul>
                            <li>Football Team: 1st Place in Inter-College Tournament</li>
                            <li>Robert Green: Gold Medal in 200m Sprint</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Laboratory Conditions and Equipment Details Section */}
            <section className="laboratory-section">
                <h2>Laboratory Conditions and Equipment Details</h2>
                <table className="laboratory-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laboratory Conditions</td>
                            <td>
                                <ul>
                                    <li>All labs are air-conditioned and equipped with high-speed internet.</li>
                                    <li>Regular maintenance checks are conducted to ensure all equipment is in working order.</li>
                                    <li>Labs have emergency power backup to avoid disruptions during sessions.</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Equipment</td>
                            <td>
                                <ul>
                                    <li>10 High-Performance Workstations with Intel i7 processors and 32GB RAM.</li>
                                    <li>Power Electronics Lab with state-of-the-art inverters and converters.</li>
                                    <li>Smart Grid Lab equipped with advanced monitoring systems.</li>
                                    <li>Renewable Energy Lab with solar and wind energy setups.</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Student Achievements and Research Publications Section */}
            <section className="achievements-publications-section">
                <div className="achievements-publications-container">
                    <div className="student-achievements">
                        <h2>Student Achievements</h2>
                        <ul>
                            <li>John Doe won the National Power Systems Competition.</li>
                            <li>Team Electron secured the first position in the Smart Grid Hackathon.</li>
                        </ul>
                    </div>

                    <div className="research-publications">
                        <h2>Research Publications</h2>
                        <ul>
                            <li>Prof. Alice Johnson published a paper on Power Electronics in the IEEE Transactions on Industrial Electronics.</li>
                            <li>Dr. Robert Green co-authored a research paper on Smart Grids in the Journal of Power Systems.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Performance Graphs Section */}
            <section className="performance-graphs">
                <h2>Performance Graphs</h2>
                <div className="chart-container">
                    <Line data={{
                        labels: ['2019', '2020', '2021', '2022', '2023'],
                        datasets: [
                            {
                                label: 'Student Performance',
                                data: [85, 87, 89, 90, 92],
                                fill: false,
                                borderColor: 'blue',
                            },
                            {
                                label: 'Faculty Research Performance',
                                data: [75, 77, 79, 81, 83],
                                fill: false,
                                borderColor: 'green',
                            },
                            {
                                label: 'Overall Department Performance',
                                data: [80, 82, 84, 86, 88],
                                fill: false,
                                borderColor: 'red',
                            },
                        ],
                    }} />
                </div>
            </section>
        </div>
        </div>
    );
};

export default EEEDepartmentPage;
