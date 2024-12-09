import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuth';
import Spinner from "./Spinner"
export default function PrivateRoute() {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) {
    return <Spinner/>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
