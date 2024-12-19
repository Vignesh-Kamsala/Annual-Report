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
const ECEDepartmentPage = () => {
    const [selectedYear, setSelectedYear] = useState(null);

    const curriculumData = {
        1: [
            { semester: 'Semester 1', subjects: ['Mathematics', 'Physics', 'Introduction to ECE', 'Circuit Theory', 'Programming in C'] },
            { semester: 'Semester 2', subjects: ['Digital Logic Design', 'Signals and Systems', 'Electronics I', 'Electromagnetic Fields', 'Data Structures'] },
        ],
        2: [
            { semester: 'Semester 3', subjects: ['Analog Circuits', 'Microprocessors', 'Communication Systems I', 'Control Systems', 'Probability Theory'] },
            { semester: 'Semester 4', subjects: ['Digital Signal Processing', 'VLSI Design', 'Communication Systems II', 'Electronics II', 'Linear Algebra'] },
        ],
        3: [
            { semester: 'Semester 5', subjects: ['Antenna Theory', 'Embedded Systems', 'Microwave Engineering', 'Optical Communication', 'Ethics in Engineering'] },
            { semester: 'Semester 6', subjects: ['Wireless Communication', 'Digital Image Processing', 'Information Theory', 'Nanotechnology', 'Project Work'] },
        ],
        4: [
            { semester: 'Semester 7', subjects: ['Advanced VLSI', 'RF and Microwave Engineering', 'Biomedical Electronics', 'Satellite Communication', 'Research Project'] },
            { semester: 'Semester 8', subjects: ['Industry Internship', 'Final Year Project', 'Advanced Topics in ECE', 'Seminar', 'Elective Course'] },
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
                    <h3>Dr. Jane Doe</h3>
                    <p><strong>Head of Department</strong></p>
                    <p>Dr. Jane Doe leads the ECE department with a focus on advanced communication systems.</p>
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
                                <td>Prof. John Smith</td>
                                <td>Associate Professor</td>
                                <td>Signal Processing, Embedded Systems</td>
                            </tr>
                            <tr>
                                <td>Dr. Emily White</td>
                                <td>Assistant Professor</td>
                                <td>VLSI Design, Digital Circuits</td>
                            </tr>
                            <tr>
                                <td>Ms. Sarah Green</td>
                                <td>Lecturer</td>
                                <td>Communication Systems, Antennas</td>
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
                            <li>Overall Pass Rate: 88%</li>
                            <li>Top Performers: Alice Brown (GPA: 9.7), Bob White (GPA: 9.5)</li>
                        </ul>
                    </div>

                    <div className="sports-performance">
                        <h2>Sports Performance</h2>
                        <p>Details on the sports achievements of students within the department, including team performances, individual accolades, and overall sports participation.</p>
                        <ul>
                            <li>Basketball Team: 2nd Place in Inter-College Tournament</li>
                            <li>Emily Green: Silver Medal in Long Jump</li>
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
                                    <li>15 High-Performance Workstations with Intel i7 processors and 32GB RAM.</li>
                                    <li>Advanced Oscilloscopes for signal analysis.</li>
                                    <li>VLSI Design Kits for circuit design projects.</li>
                                    <li>Microwave Lab equipped with state-of-the-art measurement instruments.</li>
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
                            <li>Alice Brown won the National Robotics Championship.</li>
                            <li>Team Innovators secured the first position in the Hackathon.</li>
                        </ul>
                    </div>

                    <div className="research-publications">
                        <h2>Research Publications</h2>
                        <ul>
                            <li>Prof. John Smith published a paper on Signal Processing in the IEEE Journal of ECE.</li>
                            <li>Dr. Emily White co-authored a research paper on VLSI Design in the Journal of Microelectronics.</li>
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
                                data: [83, 85, 87, 89, 90],
                                fill: false,
                                borderColor: 'blue',
                            },
                            {
                                label: 'Faculty Research Performance',
                                data: [70, 72, 74, 78, 80],
                                fill: false,
                                borderColor: 'green',
                            },
                            {
                                label: 'Overall Department Performance',
                                data: [76, 78, 80, 82, 84],
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

export default ECEDepartmentPage;
