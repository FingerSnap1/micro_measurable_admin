import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";

import { useAuthStatus } from "src/hooks/useAuthStatus";

function PrivateRoute({ element }) {
  const { isAuthenticated, loading } = useAuthStatus();
  const location = useLocation();

  if(!loading)

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired, // element prop은 React element이며, 필수임을 명시
};

export default PrivateRoute;