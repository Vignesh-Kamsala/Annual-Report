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

const MEDepartmentPage = () => {
    const [selectedYear, setSelectedYear] = useState(null);

    const curriculumData = {
        1: [
            { semester: 'Semester 1', subjects: ['Mathematics', 'Physics', 'Introduction to ME', 'Engineering Mechanics', 'Programming in C'] },
            { semester: 'Semester 2', subjects: ['Thermodynamics', 'Fluid Mechanics', 'Manufacturing Processes', 'Materials Science', 'Data Structures'] },
        ],
        2: [
            { semester: 'Semester 3', subjects: ['Heat Transfer', 'Machine Design', 'Mechanics of Solids', 'Engineering Drawing', 'Linear Algebra'] },
            { semester: 'Semester 4', subjects: ['Dynamics of Machinery', 'Control Systems', 'Manufacturing Technology', 'Operations Research', 'Theory of Machines'] },
        ],
        3: [
            { semester: 'Semester 5', subjects: ['Automobile Engineering', 'Robotics', 'Renewable Energy Systems', 'CAD/CAM', 'Ethics in Engineering'] },
            { semester: 'Semester 6', subjects: ['Power Plant Engineering', 'Industrial Engineering', 'Finite Element Analysis', 'Mechatronics', 'Project Work'] },
        ],
        4: [
            { semester: 'Semester 7', subjects: ['Advanced Manufacturing', 'Renewable Energy Systems', 'Computational Fluid Dynamics', 'Automation', 'Research Project'] },
            { semester: 'Semester 8', subjects: ['Industry Internship', 'Final Year Project', 'Advanced Topics in ME', 'Seminar', 'Elective Course'] },
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
                    <h3>Dr. Mark Johnson</h3>
                    <p><strong>Head of Department</strong></p>
                    <p>Dr. Mark Johnson leads the ME department with expertise in advanced manufacturing and robotics.</p>
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
                                <td>Prof. Linda Brown</td>
                                <td>Associate Professor</td>
                                <td>Thermodynamics, Fluid Mechanics</td>
                            </tr>
                            <tr>
                                <td>Dr. Andrew Black</td>
                                <td>Assistant Professor</td>
                                <td>Machine Design, Robotics</td>
                            </tr>
                            <tr>
                                <td>Ms. Susan White</td>
                                <td>Lecturer</td>
                                <td>Manufacturing Processes, CAD/CAM</td>
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
                            <li>Overall Pass Rate: 89%</li>
                            <li>Top Performers: Adam Lee (GPA: 9.6), Jane Doe (GPA: 9.4)</li>
                        </ul>
                    </div>

                    <div className="sports-performance">
                        <h2>Sports Performance</h2>
                        <p>Details on the sports achievements of students within the department, including team performances, individual accolades, and overall sports participation.</p>
                        <ul>
                            <li>Soccer Team: 1st Place in Inter-College Tournament</li>
                            <li>Linda Green: Gold Medal in Shot Put</li>
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
                                    <li>15 High-Performance Workstations with CAD software for 3D modeling.</li>
                                    <li>Robotics Lab equipped with industrial robots and simulation tools.</li>
                                    <li>Advanced CNC machines for manufacturing training.</li>
                                    <li>Heat Transfer Lab with state-of-the-art measurement tools.</li>
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
                            <li>Adam Lee won the National Robotics Competition.</li>
                            <li>Team MechMasters secured the first position in the CAD/CAM Design Challenge.</li>
                        </ul>
                    </div>

                    <div className="research-publications">
                        <h2>Research Publications</h2>
                        <ul>
                            <li>Prof. Linda Brown published a paper on Thermodynamics in the ASME Journal of Heat Transfer.</li>
                            <li>Dr. Andrew Black co-authored a research paper on Robotics in the International Journal of Robotics Research.</li>
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
                                data: [84, 86, 88, 89, 91],
                                fill: false,
                                borderColor: 'blue',
                            },
                            {
                                label: 'Faculty Research Performance',
                                data: [72, 74, 76, 78, 80],
                                fill: false,
                                borderColor: 'green',
                            },
                            {
                                label: 'Overall Department Performance',
                                data: [78, 80, 82, 84, 86],
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

export default MEDepartmentPage;
