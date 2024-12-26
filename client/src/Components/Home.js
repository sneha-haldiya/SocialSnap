import React, { createContext,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";

import NavBar from './NavBar/NavBar';
import Profile from './ProfileComponents/Profile';
import Search from './SearchComponents/Search';
import Dashboard from './DashboardComponents/Dashboard';
import Notification from './NotificationComponents/Notification';
import Message from './MessageComponents/Message';

export const UserData = createContext();

const Home = () => {
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || '');
  
  console.log('HOME PAGE: ', username);

  return (
    <UserData.Provider value={username}>
      <div className="flex h-screen w-screen">
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notification" element={<Notification />} />
            <Route path = "/message" element={<Message/>}/>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </UserData.Provider>
  );
};

export default Home;
