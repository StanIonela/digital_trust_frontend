import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const SubjectForm = ({ subjectId, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (subjectId) {
      axios.get(`/api/subject/getSubjectById/${subjectId}`)
        .then(response => {
          const { name } = response.data;
          setName(name);
        })
        .catch(() => setError('Failed to fetch subject data'));
    }
  }, [subjectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subjectId) {
        await axios.put(`/api/subject/updateSubjects/${subjectId}`, {
          name: name || undefined,
        });
      } else {
        await axios.post('/api/subject/addSubjects', {
          name,
        });
      }
      onSave();
    } catch (err) {
      setError('Failed to save subject.');
    }
  };

  return (
    <div>
      <h2>{subjectId ? 'Edit Subject' : 'Add Subject'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type='submit'>{subjectId ? 'Update' : 'Create'}</button>
        <button type='button' onClick={onCancel}>Cancel</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SubjectForm;
