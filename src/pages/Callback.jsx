import { useEffect } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        console.log('Logged in user:', user);
        navigate('/');
      })
      .catch(err => {
        console.error('Auth error:', err);
        navigate('/');
      });
  }, [navigate]);

  return <div className="p-4">Processing login...</div>;
}

export default Callback;