import { useEffect, useState } from 'react'
import { getToken } from '../../helpers/functional';
import { useLocation, useNavigate } from 'react-router';

export const useAuthCheck = () => {
  const token = getToken();
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    console.log(location.pathname !== '/' && token === null)
    if (location.pathname !== '/' && token === null) {
      navigate('/')
      setAuth(true)
    };
    console.log('useAuthCheck')
  }, [location.pathname, token])

  return auth;
}