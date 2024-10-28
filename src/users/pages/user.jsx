import React, { useEffect, useState } from 'react';

import UsersList from '../component/userList';
import LoadingSpinner from '../../shared/component/uiElement/LoadingSpinner';
import ErrorModal from '../../shared/component/uiElement/ErrorModal';
import { useHtttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHtttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
      } catch (err) {
        
      } 
    };
    fetchUser();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      
    </>
  );
};

export default Users;
