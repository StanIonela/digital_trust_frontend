import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const AssignSubjectForm = ({ studentId, onSave, onCancel }) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const subjectResponse = await axios.get('/api/subject');
                setSubjects(subjectResponse.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/subject/assignSubject/${studentId}`, {
                subjectId: selectedSubjectId
            });
            setMessage('Subject assigned successfully');
            onSave();
        } catch (error) {
            console.error('Error assigning subject:', error);
            setMessage('Failed to assign subject');
        }
    };

    return (
        <div>
            <h2>Assign Subject to Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subject: </label>
                    <select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} required>
                        <option value=''>Select Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Assign</button>
                <button type="button" onClick={onCancel}>Cancel</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default AssignSubjectForm;
