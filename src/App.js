import React, {Suspense} from 'react';
import { RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom';
//import User from './users/pages/user';
import MainNavigation from './shared/component/Navigation/MainNavigation';
//import UserPlaces from './places/pages/UserPlaces';
//import NewPlace from './places/pages/NewPlace';
//import UpdatePlace from './places/pages/UpdatePlace';
//import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/component/uiElement/LoadingSpinner';

const User = React.lazy(()=> import('./users/pages/user')); // this component is not necessary to be loaded lazy b'se it requared initially
const UserPlaces = React.lazy(()=> import('./places/pages/UserPlaces'));
const NewPlace = React.lazy(()=> import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(()=> import('./places/pages/UpdatePlace'));
const Auth = React.lazy(()=> import('./users/pages/Auth'));



function App() {

  const {token, login, logout, userId} = useAuth();
  
  
  const routes = [
    {
      path: '/',
      element: <User />,
    },
    {
      path: '/:userId/places',
      element: <UserPlaces />,
    },
    {
      path: '/places/new',
      element: token ? <NewPlace /> : <Navigate to="/auth" />,
    },
    {
      path: '/places/:placeId',
      element: token ? <UpdatePlace /> : <Navigate to="/auth" />,
    },
    {
      path: '/auth',
      element: <Auth />,
    },
  ];

  const root = createBrowserRouter([
    {
      element: <MainNavigation />,
      children: routes,
    },
  ]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, userId: userId, login, logout, token: token }}>
      <Suspense fallback={<div className='center'><LoadingSpinner/></div>}>
      <RouterProvider router={root} />
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
