import React, { useContext } from 'react'
import { UserData } from "../Home";

const Dashboard = () => {
  const username = useContext(UserData);
  return (
    <div className='text-white'>
      home page
      <h1 >Username: {username}</h1>
    </div>
  )
}

export default Dashboard
