// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import UserDataService from '../../services/UserDataService.js';

const Logout = () => {
  useEffect(() => {
    UserDataService.logout();
  }, []);

  return <h2>Saindo...</h2>;
};

export default Logout;