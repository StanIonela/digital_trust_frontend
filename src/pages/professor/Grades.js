import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import AddGradeForm from '../../components/AddGradeForm';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState(null);

  const fetchGrades = async () => {
    try {
      const response = await axios.get('/api/grade');
      setGrades(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch grades');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    

    fetchGrades();
  }, []);

  const handleEdit = (id) => {
    setSelectedGradeId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/grade/deleteGrade/${id}`);
      setGrades(grades.filter(grade => grade.id !== id));
    } catch (err) {
      setError('Failed to delete grade');
    }
  };

  const handleSave = () => {
    // Refresh the grades list after updating
    fetchGrades();
    setSelectedGradeId(null); // Hide the form after saving
  };

  const handleCancel = () => {
    setSelectedGradeId(null); // Hide the form without saving
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Grades</h2>
      {selectedGradeId !== null && (
        <AddGradeForm
          gradeId={selectedGradeId}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Student ID</th>
            <th>Subject ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(grade => (
            <tr key={grade.id}>
              <td>{grade.value}</td>
              <td>{grade.Student.firstName} {grade.Student.lastName}</td>
              <td>{grade.Subject.name}</td>
              <td>
                <button onClick={() => handleEdit(grade.id)}>Edit</button>
                <button onClick={() => handleDelete(grade.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
