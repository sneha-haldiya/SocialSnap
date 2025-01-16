import React, { useState, useEffect } from 'react';


const FollowersList = ({ userId, followersNum }) => {
    const [followers, setFollowers] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);

    useEffect(() => {
        async function fetchFollowers() {
            try {
                const response = await fetch("http://localhost:8000/getFollowers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: userId }),
                });
                const r = await response.json();
                if (r.message === "Success getFollowers") {
                    setFollowers(r.followers);
                } else {
                    alert("Error: Unable to fetch user data");
                }
            } catch (e) {
                console.log(e);
                alert("Error: Network or server issue");
            }
        }
        if (showFollowers) {
            fetchFollowers();
        }
    }, [userId, showFollowers]);

    return (
        <div className='text-white'>
            <p onClick={() => setShowFollowers(!showFollowers)} className="cursor-pointer">{followersNum} followers</p>
            {showFollowers && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-4 rounded-lg w-1/3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold cursor-pointer">Followers</h2>
                            <button onClick={() => setShowFollowers(false)}> &times; </button>
                        </div>
                        <ul className="max-h-80 overflow-y-auto">{followers.map((follower, index) => (
                            <li key={index} className="border-t border-gray-600 p-2">{follower.name}</li>))}
                        </ul>
                    </div>
                </div>)}
        </div>
    )
}

export default FollowersList
