import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserData } from '../Home';
import ProfileHeader from './ProfileHeader';
import UserProfileHeader from './UserProfileHeader';
import ProfileDetails from './ProfileDetails';

const Profile = () => {
  const { id: defaultIdFromContext, username: defaultUsername } = useContext(UserData);

  const location = useLocation();
  const searchedId = location.state?.id;

  const [defaultId, setDefaultId] = useState(defaultIdFromContext);
  const [isSearchedUser, setIsSearchedUser] = useState(!!searchedId);
  const [searchedUsername, setSearchedUsername] = useState();

  useEffect(() => {
    if (searchedId) {
      setIsSearchedUser(true);
      async function getUsername() {
        try {
          const response = await fetch("http://localhost:8000/getUsername", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchedId }),
          });
          const r = await response.json();
          if (r.message === "Success getUsername") {
            setSearchedUsername(r.Username);
          }
          else {
            alert("cannot fetch username");
          }
        }
        catch (e) {
          alert("getUsername Error");
        }
      }
      getUsername();
    }
    else {
      setIsSearchedUser(false);
      setDefaultId(defaultIdFromContext);
    }
  }, [defaultIdFromContext, searchedId]);

  const idToDisplay = isSearchedUser ? searchedId : defaultId;
  const usernameToDisplay = isSearchedUser ? searchedUsername : defaultUsername;

  return (
    <div>
      <h1 className='text-xl font-bold text-white'>Profile</h1>
      {isSearchedUser ?
        (<ProfileHeader defaultId={defaultId} idToDisplay={idToDisplay} usernameToDisplay={usernameToDisplay} />) :
        (<UserProfileHeader idToDisplay={idToDisplay} usernameToDisplay={usernameToDisplay} />)
      }
      <ProfileDetails idToDisplay={idToDisplay} />
    </div>
  );
};

export default Profile;
