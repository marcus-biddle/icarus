import React, { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

const HomeLayout = () => {
    const navigate = useNavigate();
    const user = useLoaderData();
    console.log('user',user);
    

    useEffect(() => {
        if (user === null) navigate('/create');
    }, [navigate, user])

  return (
    <div>HomeLayout</div>
  )
}

export default HomeLayout