import { useEffect, useState } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => navigate('/'));
  }, [navigate]);

  if (!user) return <div className="p-4">Checking authentication...</div>;

  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold mb-4">Protected Page</h2>
      <p>Welcome, {user.username}!</p>
    </div>
  );
}

export default ProtectedPage;