import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UserData } from '../Home';
import List from './List';

const Search = () => {
  const location = useLocation();
  const defaultUsername = useContext(UserData);

  const [searchedUser, setSearchedUser] = useState('');
  const [userList, setUserList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function submit() {
    if (!searchedUser) {
      setUserList([]);
      setHasSearched(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({defaultUsername, username: searchedUser }),
      });
      const r = await response.json();
      setHasSearched(true);
      /* console.log(r); */
      if (r.message === "Searched") {
        setUserList(r.users);
      }
      else {
        setUserList([]);
      }
    }
    catch (e) {
      alert(`Error: ${e}`);
    }
  }

  //this is the changement
  const handleSubmit = (e) => {
    if (e.target.value === '') {
      setSearchedUser('');
      setHasSearched(false);
    }
    else {
      setSearchedUser(e.target.value);
      submit();
    }
    console.log(searchedUser);
  }

  return (
    <div className='flex text-white'>
      <div className='flex flex-col p-2'>
        <h1>username: {defaultUsername}</h1>
        <div className='flex flex-row'>
          <input type="text" className='p-2 bg-gray-800 border border-gray-500 rounded-md text-xs text-white' onChange={(e) => { handleSubmit(e) }} placeholder="Make new Friends!" />
          {/* <button className='px-5 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all' onClick={submit}>Search</button> */}
        </div>
        {hasSearched && <List userList={userList} />}
      </div>
    </div>
  )
}

export default Search
