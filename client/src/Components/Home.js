import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import NavBar from './NavBar/NavBar';
import Profile from './ProfileComponents/Profile';
import Search from './SearchComponents/Search';
import Dashboard from './DashboardComponents/Dashboard';
import Notification from './NotificationComponents/Notification';
import Message from './MessageComponents/Message';

export const UserData = createContext();
export const socketContext = createContext();

const Home = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({ username: location.state?.username || '', id: location.state?.id || '' });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      auth: {
        token: "abcd"
      }
    });

    setSocket(socket);
    socket.emit("addUser", userData.id);

    return () => {
      socket.disconnect();
    }
  }, []);


  return (
    <socketContext.Provider value={socket}>
      <UserData.Provider value={userData}>
        <div className="flex h-screen w-screen">
          <NavBar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/message" element={<Message />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </UserData.Provider>
    </socketContext.Provider>
  );
};

export default Home;
