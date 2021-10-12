import React, { useEffect } from 'react';
import api, { registerMock } from 'api/dashboard';

registerMock();

const Dashboard: React.FC<{}> = () => {
  useEffect(() => {
    api.getTest().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
