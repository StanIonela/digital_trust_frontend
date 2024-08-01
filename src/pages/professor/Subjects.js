import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import SubjectForm from '../../components/SubjectForm';
import AddGradeForm from '../../components/AddGradeForm';

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    const [showGradeForm, setShowGradeForm] = useState(false); // Control visibility of the grade form

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('/api/subject');
                setSubjects(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch subjects');
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const handleEdit = (id) => {
        setSelectedSubjectId(id);
        setShowGradeForm(false); 
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/subject/deleteSubjects/${id}`);
            setSubjects(subjects.filter(subject => subject.id !== id));
        } catch (err) {
            setError('Failed to delete subject');
        }
    };

    const handleSave = () => {
        setSelectedSubjectId(null);
        setShowGradeForm(false); 
        axios.get('/api/subject')
            .then(response => setSubjects(response.data))
            .catch(() => setError('Failed to fetch subjects'));
    };

    const handleCancel = () => {
        setSelectedSubjectId(null);
        setShowGradeForm(false); 
    };

    const toggleGradeForm = () => {
        setShowGradeForm(!showGradeForm); 
        setSelectedSubjectId(null); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Subjects</h2>
            <button onClick={() => setSelectedSubjectId('')}>Add New Subject</button>
            <button onClick={toggleGradeForm}>Add/Update Grade</button>
            {selectedSubjectId !== null && (
                <SubjectForm 
                    subjectId={selectedSubjectId} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            )}
            {showGradeForm && (
                <AddGradeForm 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Students (Grades)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(subject => (
                        <tr key={subject.id}>
                            <td>{subject.name}</td>
                            <td>
                                {subject.Students && subject.Students.length > 0 ? (
                                    subject.Students.map(student => `${student.firstName} ${student.lastName} (${student.Grade && student.Grade.value ? student.Grade.value : ""})`).join(', ')
                                ) : 'No students assigned'}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(subject.id)}>Edit</button>
                                <button onClick={() => handleDelete(subject.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subjects;
