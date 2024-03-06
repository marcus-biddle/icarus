import { getToken } from '@/helpers/functional';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';

export const useAuthCheck = () => {
  const token = getToken();
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    console.log(location.pathname !== '/' && token === null)
    if (token !== null) {
      setAuth(true);
    }
    
    if (location.pathname !== '/' && token === null) {
      navigate('/')
      setAuth(false)
    };
    console.log('useAuthCheck', auth)
  }, [location.pathname, token])

  return auth;
}