import { useEffect, useState } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';

export default function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return user;
}