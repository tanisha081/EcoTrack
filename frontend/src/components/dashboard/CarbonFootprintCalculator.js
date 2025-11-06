import React, { useState } from 'react';
import api from '../../utils/api';

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/calculate-carbon', formData);
      setResult(res.data.carbonFootprint);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Carbon Footprint Calculator</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for calculation inputs */}
        <button type="submit">Calculate</button>
      </form>
      {result && <p>Your carbon footprint is: {result}</p>}
    </div>
  );
};

export default CarbonFootprintCalculator;
