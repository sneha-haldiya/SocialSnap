import React, { useContext } from 'react'
import { UserData } from "../Home";

const Dashboard = () => {
  const userData = useContext(UserData);
  return (
    <div className='text-white'>
      home page
      <h1 >Username: {userData.username}</h1>
    </div>
  )
}

export default Dashboard
