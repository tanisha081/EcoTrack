import React from 'react';
import ChallengeList from './ChallengeList';
import ActivityLogger from './ActivityLogger';
import CarbonFootprintCalculator from './CarbonFootprintCalculator';
import UserSettings from './UserSettings';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserSettings />
      <CarbonFootprintCalculator />
      <ActivityLogger />
      <ChallengeList />
    </div>
  );
};

export default Dashboard;
