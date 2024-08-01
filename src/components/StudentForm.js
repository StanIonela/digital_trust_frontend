import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const StudentForm = ({ studentId, onSave, onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (studentId) {
      axios.get(`/api/student/getStudentById/${studentId}`)
        .then(response => {
          const { firstName, lastName, email } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
        })
        .catch(() => setError('Failed to fetch student data'));
    }
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (studentId) {
        await axios.put(`/api/student/updateStudent/${studentId}`, {
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          email: email || undefined,
          password: password || undefined, 
        });
      } else {
        await axios.post('/api/student/addStudent', {
          firstName,
          lastName,
          email,
          password,
        });
      }
      onSave();
    } catch (err) {
      setError('Failed to save student.');
    }
  };

  return (
    <div>
      <h2>{studentId ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>{studentId ? 'Update' : 'Create'}</button>
        <button type='button' onClick={onCancel}>Cancel</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default StudentForm;
