import PropTypes from 'prop-types';
import { getAuth } from 'firebase/auth';
import { Navigate, useLocation } from "react-router-dom";

import { useAuthStatus } from "src/hooks/useAuthStatus";

import allowedEmails from 'src/config/allowedEmails';

function PrivateRoute({ element }) {
  const { isAuthenticated, loading } = useAuthStatus();
  const auth = getAuth();
  const location = useLocation();

  if(!loading)

  return isAuthenticated && allowedEmails.includes(auth.currentUser.email) ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired, // element prop은 React element이며, 필수임을 명시
};

export default PrivateRoute;