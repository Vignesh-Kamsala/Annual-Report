import React, { useState, useEffect } from 'react';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const [selectedSection, setSelectedSection] = useState('Homepage');
    const [showDepartments, setShowDepartments] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        faculty: [],
        performance: {
            academic: '',
            sports: ''
        },
        achievements: [],
        researchPublications: [],
        laboratory: [],
        curriculum: {
            year1: {
                semester1: [],
                semester2: []
            },
            year2: {
                semester1: [],
                semester2: []
            },
            year3: {
                semester1: [],
                semester2: []
            },
            year4: {
                semester1: [],
                semester2: []
            }
        }
    });

    const authToken = sessionStorage.getItem('authToken'); // Retrieve the auth token for API requests

    // Fetch departments when component mounts
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('/api/departments', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setDepartments(data);
                } else {
                    console.error('Error fetching departments:', data.message);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, [authToken]);

    // Handlers for homepage editing
    const [bannerText, setBannerText] = useState({
        title: 'Welcome to the Annual Report Portal',
        description: 'A platform to streamline the creation of comprehensive annual reports for educational institutes.'
    });

    const [leadership, setLeadership] = useState([
        { name: 'Dr. John Smith', position: 'Director', description: 'Dr. John Smith has led the institute...' },
        { name: 'Prof. Emily Johnson', position: 'Dean of Faculty', description: 'Prof. Emily Johnson has been instrumental...' },
        { name: 'Dr. Robert Williams', position: 'Vice Dean', description: 'Dr. Robert Williams has played a crucial role...' },
        { name: 'Ms. Sarah Brown', position: 'Student Welfare Officer', description: 'Ms. Sarah Brown has been dedicated to...' }
    ]);

    const [majorChanges, setMajorChanges] = useState([
        { title: 'Introduction of New Academic Programs', description: 'This year, the institute introduced several new academic programs...' },
        { title: 'Upgradation of Laboratory Facilities', description: 'The institute made significant investments in upgrading laboratory facilities...' },
        { title: 'Expansion of Research Initiatives', description: 'Research initiatives were expanded with new collaborations...' },
        { title: 'Improvement in Campus Infrastructure', description: 'Several infrastructure projects were completed, including the construction of...' }
    ]);

    // Handler functions for Homepage
    const handleBannerChange = (field, value) => {
        setBannerText({ ...bannerText, [field]: value });
    };

    const handleLeadershipChange = (index, field, value) => {
        const updatedLeadership = [...leadership];
        updatedLeadership[index][field] = value;
        setLeadership(updatedLeadership);
    };

    const handleMajorChangesChange = (index, field, value) => {
        const updatedChanges = [...majorChanges];
        updatedChanges[index][field] = value;
        setMajorChanges(updatedChanges);
    };

    // Handlers for department editing
    const handleDepartmentSelect = async (departmentName) => {
        setSelectedSection('Department');
        setSelectedDepartment(departmentName);
        setShowDepartments(false);

        // Fetch department-specific data
        try {
            const response = await fetch(`/api/department/${departmentName.name}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setFormData({
                    ...data,
                    achievements: Array.isArray(data.achievements) ? data.achievements : [],
                    researchPublications: Array.isArray(data.researchPublications) ? data.researchPublications : [],
                    laboratory: Array.isArray(data.laboratory) ? data.laboratory : [],
                    curriculum: data.curriculum || {
                        year1: { semester1: [], semester2: [] },
                        year2: { semester1: [], semester2: [] },
                        year3: { semester1: [], semester2: [] },
                        year4: { semester1: [], semester2: [] }
                    }
                });
            } else {
                console.error('Error fetching department data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching department data:', error);
        }
    };

    const handleFacultyChange = (index, field, value) => {
        const updatedFaculty = [...formData.faculty];
        updatedFaculty[index][field] = value;
        setFormData({ ...formData, faculty: updatedFaculty });
    };

    const handleAddFaculty = () => {
        const newFaculty = { name: '', position: '', specialization: '' };
        setFormData({ ...formData, faculty: [...formData.faculty, newFaculty] });
    };

    const handleAchievementChange = (index, value) => {
        const updatedAchievements = [...formData.achievements];
        updatedAchievements[index] = value;
        setFormData({ ...formData, achievements: updatedAchievements });
    };

    const handleAddAchievement = () => {
        setFormData({ ...formData, achievements: [...formData.achievements, ''] });
    };

    const handleResearchPublicationChange = (index, value) => {
        const updatedPublications = [...formData.researchPublications];
        updatedPublications[index] = value;
        setFormData({ ...formData, researchPublications: updatedPublications });
    };

    const handleAddResearchPublication = () => {
        setFormData({ ...formData, researchPublications: [...formData.researchPublications, ''] });
    };

    const handleLaboratoryChange = (index, field, value) => {
        const updatedLaboratory = [...formData.laboratory];
        if (field === 'details') {
            updatedLaboratory[index][field] = value.split(', '); // Split by commas
        } else {
            updatedLaboratory[index][field] = value;
        }
        setFormData({ ...formData, laboratory: updatedLaboratory });
    };

    const handleAddLaboratoryItem = () => {
        const newLabItem = { item: '', details: [] };
        setFormData({ ...formData, laboratory: [...formData.laboratory, newLabItem] });
    };

    // Initialize curriculum arrays if undefined before adding
    const handleAddCurriculumItem = (year, semester) => {
        const updatedCurriculum = { ...formData.curriculum };

        // Ensure semester array is initialized
        if (!updatedCurriculum[year][semester]) {
            updatedCurriculum[year][semester] = [];
        }

        updatedCurriculum[year][semester].push('');  // Add an empty string as a new subject
        setFormData({ ...formData, curriculum: updatedCurriculum });
    };

    const handleCurriculumChange = (year, semester, index, value) => {
        const updatedCurriculum = { ...formData.curriculum };
        updatedCurriculum[year][semester][index] = value;
        setFormData({ ...formData, curriculum: updatedCurriculum });
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Handle form submission to backend
    const handleSubmit = async () => {
        try {
            if (selectedSection === 'Homepage') {
                const response = await fetch('http://127.0.0.1:5000/api/admin/homepage', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        bannerText,
                        leadership,
                        majorChanges
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Homepage data updated successfully');
                } else {
                    alert(`Error updating homepage: ${data.message}`);
                }
            } else if (selectedSection === 'Department') {
                const response = await fetch(`/api/admin/department/${selectedDepartment.name}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        faculty: formData.faculty,
                        performance: formData.performance,
                        achievements: formData.achievements,
                        researchPublications: formData.researchPublications,
                        laboratory: formData.laboratory,
                        curriculum: formData.curriculum
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Department data updated successfully');
                } else {
                    alert(`Error updating department: ${data.message}`);
                }
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('An error occurred while submitting the data.');
        }
    };

    return (
        <div className="admin-page">
            <div className="sidebar">
                <h3>Select Section</h3>
                <ul>
                    <li>
                        <button onClick={() => setSelectedSection('Homepage')}>Homepage</button>
                    </li>
                    <li>
                        <button onClick={() => setShowDepartments(!showDepartments)}>
                            Departments
                        </button>
                        {showDepartments && (
                            <ul className="sub-menu">
                                {departments.map((department, index) => (
                                    <li key={index}>
                                        <button onClick={() => handleDepartmentSelect(department)}>
                                            {department.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            <div className="main-content">
                {selectedSection === 'Homepage' ? (
                    <div>
                        <h1>Edit Homepage Content</h1>

                        {/* Banner Section */}
                        <section className="admin-section">
                            <h2>Edit Banner</h2>
                            <input
                                type="text"
                                placeholder="Banner Title"
                                value={bannerText.title}
                                onChange={(e) => handleBannerChange('title', e.target.value)}
                            />
                            <textarea
                                placeholder="Banner Description"
                                value={bannerText.description}
                                onChange={(e) => handleBannerChange('description', e.target.value)}
                            />
                        </section>

                        {/* Leadership Section */}
                        <section className="admin-section">
                            <h2>Edit Institute Leadership</h2>
                            {leadership.map((leader, index) => (
                                <div key={index} className="leadership-entry">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={leader.name}
                                        onChange={(e) => handleLeadershipChange(index, 'name', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Position"
                                        value={leader.position}
                                        onChange={(e) => handleLeadershipChange(index, 'position', e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={leader.description}
                                        onChange={(e) => handleLeadershipChange(index, 'description', e.target.value)}
                                    />
                                </div>
                            ))}
                        </section>

                        {/* Major Changes Section */}
                        <section className="admin-section">
                            <h2>Edit Major Changes</h2>
                            {majorChanges.map((change, index) => (
                                <div key={index} className="change-entry">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={change.title}
                                        onChange={(e) => handleMajorChangesChange(index, 'title', e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={change.description}
                                        onChange={(e) => handleMajorChangesChange(index, 'description', e.target.value)}
                                    />
                                </div>
                            ))}
                        </section>
                    </div>
                ) : selectedDepartment ? (
                    <div>
                        <h1>Edit {selectedDepartment.name} Department Report</h1>

                        {/* Faculty Section */}
                        <section className="admin-section">
                            <h2>Faculty Members</h2>
                            {formData.faculty.map((faculty, index) => (
                                <div key={index} className="faculty-entry">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={faculty.name}
                                        onChange={(e) => handleFacultyChange(index, 'name', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Position"
                                        value={faculty.position}
                                        onChange={(e) => handleFacultyChange(index, 'position', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Specialization"
                                        value={faculty.specialization}
                                        onChange={(e) => handleFacultyChange(index, 'specialization', e.target.value)}
                                    />
                                </div>
                            ))}
                            <button onClick={handleAddFaculty}>Add Faculty Member</button>
                        </section>

                        {/* Performance Section */}
                        <section className="admin-section">
                            <h2>Performance</h2>
                            <h3>Academic Performance</h3>
                            <textarea
                                placeholder="Enter academic performance details"
                                value={formData.performance.academic}
                                onChange={(e) => handleInputChange('performance.academic', e.target.value)}
                            />
                            <h3>Sports Performance</h3>
                            <textarea
                                placeholder="Enter sports performance details"
                                value={formData.performance.sports}
                                onChange={(e) => handleInputChange('performance.sports', e.target.value)}
                            />
                        </section>

                        {/* Achievements Section */}
                        <section className="admin-section">
                            <h2>Student Achievements</h2>
                            {formData.achievements.map((achievement, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Student Achievement"
                                    value={achievement}
                                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                                />
                            ))}
                            <button onClick={handleAddAchievement}>Add Achievement</button>
                        </section>

                        {/* Research Publications Section */}
                        <section className="admin-section">
                            <h2>Research Publications</h2>
                            {formData.researchPublications.map((publication, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Research Publication"
                                    value={publication}
                                    onChange={(e) => handleResearchPublicationChange(index, e.target.value)}
                                />
                            ))}
                            <button onClick={handleAddResearchPublication}>Add Research Publication</button>
                        </section>

                        {/* Curriculum Section */}
                        <section className="admin-section">
                            <h2>Curriculum</h2>
                            <table className="curriculum-table">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Semester 1</th>
                                        <th>Semester 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(formData.curriculum).map((year) => (
                                        <tr key={year}>
                                            <td>{`Year ${year.replace('year', '')}`}</td>
                                            <td>
                                                <ul>
                                                    {formData.curriculum[year]?.semester1?.map((subject, idx) => (
                                                        <li key={idx}>
                                                            <input
                                                                type="text"
                                                                value={subject}
                                                                onChange={(e) => handleCurriculumChange(year, 'semester1', idx, e.target.value)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button onClick={() => handleAddCurriculumItem(year, 'semester1')}>Add Subject</button>
                                            </td>
                                            <td>
                                                <ul>
                                                    {formData.curriculum[year]?.semester2?.map((subject, idx) => (
                                                        <li key={idx}>
                                                            <input
                                                                type="text"
                                                                value={subject}
                                                                onChange={(e) => handleCurriculumChange(year, 'semester2', idx, e.target.value)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button onClick={() => handleAddCurriculumItem(year, 'semester2')}>Add Subject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        {/* Laboratory Section */}
                        <section className="admin-section">
                            <h2>Laboratory</h2>
                            {formData.laboratory.map((labItem, index) => (
                                <div key={index} className="lab-entry">
                                    <input
                                        type="text"
                                        placeholder="Item"
                                        value={labItem.item}
                                        onChange={(e) => handleLaboratoryChange(index, 'item', e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Details (comma separated)"
                                        value={labItem.details.join(', ')}
                                        onChange={(e) => handleLaboratoryChange(index, 'details', e.target.value)}
                                    />
                                </div>
                            ))}
                            <button onClick={handleAddLaboratoryItem}>Add Laboratory Item</button>
                        </section>
                    </div>
                ) : (
                    <h1>Please select a section or department to edit</h1>
                )}

                {/* Submit Button */}
                <button className="submit-button" onClick={handleSubmit}>
                    Submit Changes
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
