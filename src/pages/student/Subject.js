import React, { useEffect, useState, useContext } from 'react';
import axios from '../../axiosConfig';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/General.css';
 
const StudentSubject = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMySubjects = async () => {
            try {
                if (user) {
                const response = await axios.get('/api/subject/studentSubject');
                setSubjects(response.data);
                setLoading(false);
            }
            } catch (err) {
                console.error('Error fetching subjects:', err);
                setError('Failed to load subjects');
                setLoading(false);
            }
        };

        fetchMySubjects();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>My Subjects and Grades</h2>
            <table>
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Grades</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id}>
                            <td>{subject.name}</td>
                            <td>
                                {subject.Grades.map(grade => 
                                    <span key={grade.id}>{grade.value} </span>
                                )}
                                {subject.Grades.length === 0 && <span>No Grades</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentSubject;
