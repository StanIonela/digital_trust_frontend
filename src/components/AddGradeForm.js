import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const AddGradeForm = ({ onSave, onCancel }) => {
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [gradeValue, setGradeValue] = useState('');

    useEffect(() => {
        const fetchSubjectsAndStudents = async () => {
            try {
                const [subjectResponse, studentResponse] = await Promise.all([
                    axios.get('/api/subject'),
                    axios.get('/api/student') 
                ]);
                setSubjects(subjectResponse.data);
                setStudents(studentResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSubjectsAndStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/grade/addOrUpdateGrade', {
                value: gradeValue,
                studentId: selectedStudentId,
                subjectId: selectedSubjectId
            });
            console.log(response.data);
            onSave(); 
        } catch (error) {
            console.error('Error submitting grade:', error);
        }
    };

    return (
        <div>
            <h2>Grade</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student:</label>
                    <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} required>
                        <option value=''>Select Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Subject:</label>
                    <select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} required>
                        <option value=''>Select Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Grade:</label>
                    <input
                        type="number"
                        value={gradeValue}
                        onChange={(e) => setGradeValue(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add/Update Grade</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddGradeForm;
