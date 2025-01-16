import React, { useState, useEffect, useContext } from 'react';
import { socketContext } from '../Home';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';


const ProfileDetails = ({ idToDisplay }) => {
  const socket = useContext(socketContext);
  const [postNum, setPostNum] = useState(0);
  const [followersNum, setFollowersNum] = useState(0);
  const [followingsNum, setFollowingsNum] = useState(0);


  useEffect(() => {
    const fetchNumbers = () => {
      socket.emit("getNumbers", idToDisplay);
    }

    fetchNumbers();

    socket.on("numbersResponse", (data) => {
      if (data.message === "Success getNumbers") {
        setPostNum(data.postNum);
        setFollowersNum(data.followers);
        setFollowingsNum(data.following);
      }
      else {
        alert("Error: cannot get numbers");
      }
    });

    socket.on("newFollowerNotification", (data) => {
      if (data.message.includes(" started following you")) {
        fetchNumbers();
      }
    })
  }, [idToDisplay, socket]);

  return (
    <div className="flex flex-row items-center justify-between p-4 bg-gray-900 text-white font-semibold">
      <p>{postNum} posts</p>
      <FollowersList userId={idToDisplay} followersNum={followersNum} />
      <FollowingList userId={idToDisplay} followingsNum={followingsNum} />
    </div>
  );
};

export default ProfileDetails;
