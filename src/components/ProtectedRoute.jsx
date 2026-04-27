import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils/auth.js';
import { ROUTES } from '../constants.js';
import logger from '../utils/logger.js';

/**
 * ProtectedRoute component checks authentication status before rendering
 * child routes. If the user is not authenticated, redirects to the login page.
 * Implements FR-006 unauthorized access handling.
 *
 * @param {object} props
 * @param {import('react').ReactNode} [props.children] - Optional children to render if authenticated.
 * @returns {import('react').ReactElement}
 */
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    logger.warn('Unauthorized access attempt. Redirecting to login.');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children ? children : <Outlet />;
}

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

ProtectedRoute.defaultProps = {
  children: null,
};

export { ProtectedRoute };
export default ProtectedRoute;