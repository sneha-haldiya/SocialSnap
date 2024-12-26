import React from 'react';

const ProfileDetails = () => {
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-gray-900 text-white font-semibold">
      <p>{/* {postNum} */} posts</p>
      <p>{/* {followers} */} followers</p>
      <p>{/* {following} */} following</p>
    </div>
  );
};

export default ProfileDetails;
