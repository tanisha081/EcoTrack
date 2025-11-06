import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const UserSettings = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/profile', formData);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserSettings;
