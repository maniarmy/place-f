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
      console.log(process.env.REACT_APP_BACKEND_URL);
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users');
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
