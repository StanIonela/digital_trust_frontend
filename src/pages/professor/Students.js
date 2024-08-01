import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import StudentForm from '../../components/StudentForm';
import AssignSubjectForm from '../../components/AssignSubjectForm';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [assignStudentId, setAssignStudentId] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false); 

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/student');
            console.log(response.data)
            setStudents(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch students');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        console.log(students); // Log to see the structure of students data
    }, [students]);

    const handleEdit = (id) => {
        setSelectedStudentId(id);
        setIsAddingNew(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/student/deleteStudent/${id}`);
            setStudents(students.filter(student => student.id !== id));
        } catch (err) {
            setError('Failed to delete student');
        }
    };

    const handleSave = () => {
        setSelectedStudentId(null);
        setAssignStudentId(null);
        axios.get('/api/student')
            .then(response => setStudents(response.data))
            .catch(() => setError('Failed to fetch students'));
    };

    const handleCancel = () => {
        setSelectedStudentId(null);
        setAssignStudentId(null);
    };

    const removeSubjectFromStudent = async (studentId, subjectId) => {
        try {
            const response = await axios.delete(`/api/subject/removeSubjectFromStudent/${studentId}/${subjectId}`);
            console.log(response.data);
            fetchStudents(); 
        } catch (err) {
            console.error('Failed to remove subject from student:', err);
            setError('Failed to remove subject from student');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Students</h2>
            <button onClick={() => setSelectedStudentId('')}>Add New Student</button>
            {selectedStudentId !== null && (
                <StudentForm 
                    studentId={selectedStudentId} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            )}
            {assignStudentId !== null && (
                <AssignSubjectForm 
                    studentId={assignStudentId} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Subjects</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.role}</td>
                            <td>
                                {student.Subjects && student.Subjects.length > 0 ? (
                                    student.Subjects.map(subject => (
                                        <div key={subject.id}>
                                            {subject.name}
                                            <button onClick={() => removeSubjectFromStudent(student.id, subject.id)}>Remove</button>
                                        </div>
                                    ))
                                ) : 'No subjects'}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(student.id)}>Edit</button>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                                <button onClick={() => setAssignStudentId(student.id)}>Assign Subject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
