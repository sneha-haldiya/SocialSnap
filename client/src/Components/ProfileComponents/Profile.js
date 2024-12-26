import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserData } from '../Home';
import ProfileHeader from './ProfileHeader';
import UserProfileHeader from './UserProfileHeader';
import ProfileDetails from './ProfileDetails';

const Profile = () => {
  const defaultUsername = useContext(UserData);
  const location = useLocation();
  const searchedUsername = location.state?.username;

  const usernameToDisplay = searchedUsername || defaultUsername;

  return (
    <div>
      <h1 className='text-xl font-bold text-white'>Profile</h1>
      {searchedUsername? 
        (<ProfileHeader usernameToDisplay={usernameToDisplay}/>):
          (<UserProfileHeader usernameToDisplay = {usernameToDisplay}/>)
      }
      <ProfileDetails/>
    </div>
  );
};

export default Profile;
