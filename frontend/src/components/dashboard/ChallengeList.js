import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get('/challenges');
        setChallenges(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div>
      <h2>Challenges</h2>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge._id}>{challenge.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
