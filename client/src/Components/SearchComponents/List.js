import React from 'react'
import { Link } from 'react-router-dom';

const List = (props) => {
  let userlist = props.userList;
  return (
    <div className='mt-4'>
      {userlist.length > 0 ? (
        <ul>{userlist.map((user, index) => (
          <li key={user.id || index} className='py-1 text-white border border-gray-100'>
            <Link to={{ pathname: '/home/profile' }} state={{ id: user.id }} className='hover:underline'>{user.username}</Link>
          </li>))}
        </ul>
      ) : (<p className='text-white'>No users found!</p>)}
    </div>
  )
}

export default List
