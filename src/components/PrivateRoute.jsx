import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuth';

export default function PrivateRoute() {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) {
    return <h3>Loading...</h3>; 
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
