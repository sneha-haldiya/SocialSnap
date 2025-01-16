import React, { useState, useEffect, useContext } from 'react';
import { socketContext } from '../Home';
import { UserData } from '../Home';


const Notification = () => {
  const { id: defaultIdFromContext, username: defaultUsername } = useContext(UserData);
  const socket = useContext(socketContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch("http://localhost:8000/getNotifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: defaultIdFromContext }),
        });
        const r = await response.json();
        if (r.message === 'Succcess Notifications') {
          socket.emit("getNumbers", defaultIdFromContext);
          setNotifications(r.notifications);
        }
        else {
          console.log("cannot get notification")
        }
      }
      catch (e) {
        alert(`error fetching notification:`, e);
      }
    }

    fetchNotifications();

    socket.on("newFollowerNotification", (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });
  }, [defaultIdFromContext, socket]);

  async function clearNotifications() {
    try {
      const response = await fetch("http://localhost:8000/clearNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: defaultIdFromContext }),
      });
      const r = await response.json();
      if (r.message === 'Succcess clear Notifications') {
        setNotifications([]);
      }
      else {
        console.log("cannot clear notification")
      }
    }
    catch (e) {
      alert(`error clearing notification:`, e);
    }
  }

  return (
    <div className='bg-gray-900 p-4 rounded-lg'>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <li key={index} className='bg-gray-800 p-4 rounded-lg flex items-start space-x-3'>
              <div className='flex-1'>
                <p className='text-white text-sm'>{notification.message}</p>
                <small className='text-gray-400 text-xs'>{new Date(notification.date).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>) : (<p className='text-gray-400 text-xs'>No notifications available.</p>
      )}
      {notifications.length > 0 && (<button onClick={clearNotifications} className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all'>clear Notifications</button>)}
    </div>
  )
}

export default Notification
