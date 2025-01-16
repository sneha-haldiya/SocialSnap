import React, { useEffect, useState } from 'react';

const FollowingList = ({ userId, followingsNum }) => {
  const [following, setFollowing] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const response = await fetch("http://localhost:8000/getFollowing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        });
        const data = await response.json();
        if (data.message === "Success getFollowing") {
          setFollowing(data.following);
        } else {
          alert("Error: Unable to fetch following");
        }
      } catch (e) {
        console.log(e);
        alert("Error: Network or server issue");
      }
    }
    if (showFollowing) {
      fetchFollowing();
    }
  }, [showFollowing, userId]);

  return (
    <div className='text-white'>
      <p onClick={() => setShowFollowing(!showFollowing)} className="cursor-pointer">{followingsNum} following</p>
      {showFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold cursor-pointer">Following</h2>
              <button onClick={() => setShowFollowing(false)}> &times; </button>
            </div>
            <ul className="max-h-80 overflow-y-auto">{following.map((following, index) => (
              <li key={index} className="border-t border-gray-600 p-2">{following.name}</li>))}</ul>
          </div>
        </div>)}
    </div>

  );
};

export default FollowingList;