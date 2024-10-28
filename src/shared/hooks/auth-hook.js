import { useCallback, useEffect, useState } from 'react';

let logoutTimer;
export const useAuth = () =>{
  const [token, setToken] = useState(false);
  const [myTokenExpirationDate, setMyTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    setMyTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid, 
        token: token, 
        expirationDate: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setMyTokenExpirationDate(null);
    localStorage.removeItem('userData') 
  }, []);

  useEffect(()=>{
    if(token && myTokenExpirationDate){
      const remainingTime = myTokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    }
    else{
      clearTimeout(logoutTimer);
    }
  },[token, logout, myTokenExpirationDate])

  useEffect(()=>{
    const storedData = JSON.parse((localStorage.getItem('userData')));
    if(storedData && storedData.token && new Date(storedData.expirationDate) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expirationDate));
    }
  }, [login]);

  return {token, login, logout, userId}

}