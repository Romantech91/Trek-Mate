import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  return Auth.loggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
