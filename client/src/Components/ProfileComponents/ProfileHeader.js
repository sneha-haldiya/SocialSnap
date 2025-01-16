import React, { useState, useEffect, useContext } from 'react';
import { socketContext } from '../Home';

const ProfileHeader = ({ defaultId, idToDisplay, usernameToDisplay }) => {
  const socket = useContext(socketContext);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    socket.emit("isFollowed", { defaultId, searchedId: idToDisplay });

    socket.on("isfollowedResponse", (data) => {
      if (data.message === "Success response") {
        setIsFollowed(data.isFollowed);
      }
      else {
        alert(`Error: ${data.message}`);
      }
    })
  }, []);

  useEffect(() => {
    socket.on("followResponse", (data) => {
      if (data.message === "Success follow") {
        socket.emit("getNumbers", idToDisplay);
        setIsFollowed(true);
      } else if (data.message === "Already Following") {
        setIsFollowed(true);
        alert("You have already followed the user!");
      } else {
        alert("Error: cannot follow");
      }
    });

    return () => {
      socket.off("followResponse");
    };
  }, []);

  const handleFollow = () => {
    socket.emit("followUser", { defaultId, searchedId: idToDisplay });
  };

  return (
    <div className='flex flex-row items-center justify-between p-4 bg-gray-900 text-white font-semibold'>
      <p className='m-2'>{usernameToDisplay}</p>
      <div className="flex space-x-4" >
        <button className={`px-4 py-1 rounded-md transition-all ${isFollowed ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          onClick={handleFollow} disabled={isFollowed}>{isFollowed ? "Followed" : "Follow"}</button>
        <button className='px-4 bg-gray-500 rounded-md hover:bg-gray-600 transition-all'>Message</button>
        <button >...</button>
      </div>
    </div>
  )
}

export default ProfileHeader
