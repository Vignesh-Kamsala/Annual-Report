import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const Home = ({ refetchTrigger }) => {
    // State to store the dynamic data fetched from the backend
    const [bannerText, setBannerText] = useState({ title: '', description: '' });
    const [leadership, setLeadership] = useState([]);
    const [majorChanges, setMajorChanges] = useState([]);
    const [loading, setLoading] = useState(false);  // For loading indicator

    // Fetch homepage data from the backend
    const fetchHomepageData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/homepage');  // Adjust the endpoint based on your backend
            if (response.ok) {
                const data = await response.json();
                setBannerText(data.bannerText);
                setLeadership(data.leadership);
                setMajorChanges(data.majorChanges);
            } else {
                console.error('Failed to fetch homepage data');
            }
        } catch (error) {
            console.error('Error fetching homepage data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount and whenever refetchTrigger changes
    useEffect(() => {
        fetchHomepageData();
    }, [refetchTrigger]);  // Add refetchTrigger as dependency

    return (
        <div>
            <header className="home-banner">
                <div className="banner-text">
                    <h1>{bannerText.title || 'Welcome to the Annual Report Portal'}</h1>
                    <p>{bannerText.description || 'A platform to streamline the creation of comprehensive annual reports for educational institutes.'}</p>
                </div>
            </header>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* About Section */}
                    <section className="about-section">
                        <h2>About the Annual Report Portal</h2>
                        <p>
                            The Annual Report Portal is designed to provide a comprehensive and streamlined way for educational institutes
                            to manage, visualize, and report their annual data. From academic performance to faculty achievements, this
                            portal integrates various data sources into one cohesive platform, making it easy to generate detailed reports
                            and gain valuable insights.
                        </p>
                        <p>
                            Whether you're looking to review sports achievements, club activities, or department-specific research, the portal
                            offers a user-friendly interface to access all relevant information in one place. Our goal is to help educational
                            institutions effectively showcase their accomplishments and make informed decisions for the future.
                        </p>
                    </section>

                    {/* Leadership Section */}
                    <section className="leadership-section">
                        <h2>Institute Leadership</h2>
                        <div className="leadership-grid">
                            {leadership.length > 0 ? (
                                leadership.map((leader, index) => (
                                    <div key={index} className="leader">
                                        <h3>{leader.name}</h3>
                                        <p><strong>{leader.position}</strong></p>
                                        <p>{leader.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p>No leadership data available.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Major Changes Section */}
                    <section className="major-changes-section">
                        <h2>Major Changes in the Institute</h2>
                        <div className="changes-list">
                            {majorChanges.length > 0 ? (
                                majorChanges.map((change, index) => (
                                    <div key={index} className="change-item">
                                        <h3>{change.title}</h3>
                                        <p>{change.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p>No major changes data available.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="performance-sections">
                        <h2>Institute Performance Overview</h2>

                        <div className="performance-grid">
                            <div className="performance">
                                <h3>Academic Performance</h3>
                                <p>Explore the academic achievements of students across all departments.</p>
                                <ul>
                                    <li><a href="/performance/academic-overview">Overall Academic Performance</a></li>
                                    <li><a href="/performance/department-wise">Department-wise Performance</a></li>
                                    <li><a href="/performance/awards">Academic Awards and Recognitions</a></li>
                                </ul>
                            </div>

                            <div className="performance">
                                <h3>Sports Performance</h3>
                                <p>Review the institute's sports achievements, including championships.</p>
                                <ul>
                                    <li><a href="/performance/sports-overview">Overall Sports Performance</a></li>
                                    <li><a href="/performance/team-achievements">Team Achievements</a></li>
                                    <li><a href="/performance/individual-achievements">Individual Achievements</a></li>
                                </ul>
                            </div>

                            <div className="performance">
                                <h3>Club and Extracurricular</h3>
                                <p>Check out the contributions of various clubs and societies.</p>
                                <ul>
                                    <li><a href="/performance/club-overview">Club Activities Overview</a></li>
                                    <li><a href="/performance/events-organized">Events Organized</a></li>
                                    <li><a href="/performance/participation">Student Participation</a></li>
                                </ul>
                            </div>

                            <div className="performance">
                                <h3>Faculty Performance</h3>
                                <p>Get insights into faculty achievements, including research.</p>
                                <ul>
                                    <li><a href="/performance/faculty-overview">Overall Faculty Performance</a></li>
                                    <li><a href="/performance/research-publications">Research Publications</a></li>
                                    <li><a href="/performance/awards-recognitions">Awards and Recognitions</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="department-sections">
                        <h2>Department Sections</h2>

                        <div className="department-grid">
                            <div className="department">
                                <h3>Department of Computer Science</h3>
                                <p>Explore the latest research, projects, and academic achievements in the field of Computer Science.</p>
                                <a href="/department/cs">View Report</a>
                            </div>

                            <div className="department">
                                <h3>Department of Mechanical Engineering</h3>
                                <p>Discover the innovations and advancements in Mechanical Engineering through our comprehensive reports.</p>
                                <a href="/department/me">View Report</a>
                            </div>

                            <div className="department">
                                <h3>Department of Electronics and Communication Engineering</h3>
                                <p>Dive into the cutting-edge developments and achievements in Electrical Engineering.</p>
                                <a href="/department/ec">View Report</a>
                            </div>

                            <div className="department">
                                <h3>Department of Electrical Engineering</h3>
                                <p>Explore the projects and research that shape the infrastructure and construction industry.</p>
                                <a href="/department/ee">View Report</a>
                            </div>
                        </div>
                    </section>
                </>
            )}

            <footer>
                <p>&copy; 2024 Annual Report Portal. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
