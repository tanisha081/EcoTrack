import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const ActivityLogger = () => {
  const [activity, setActivity] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/activities', { activity });
      setActivity('');
      // Optionally, refresh the activity list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Log Activity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter activity"
        />
        <button type="submit">Log</button>
      </form>
    </div>
  );
};

export default ActivityLogger;
