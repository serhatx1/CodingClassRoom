import React from 'react';

const RequireAuth = ({ children }) => {
  // const location = useLocation();

  // if (!isAuthenticated()) {
  //   return <Navigate to="/addition" state={{ from: location }} />;
  // }

  return children;
};

export default RequireAuth;
