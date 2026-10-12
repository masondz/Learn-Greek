import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
