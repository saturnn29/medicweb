import React from 'react';
import { Navigate } from 'react-router-dom';

function withAuth(WrappedComponent, userType) {
  return class extends React.Component {
    render() {
      const isAuthenticated = sessionStorage.getItem('userType') === userType;

      if (isAuthenticated) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Navigate to="/login" />;
      }
    }
  };
};

export default withAuth;