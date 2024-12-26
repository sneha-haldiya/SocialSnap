import React from 'react'
import { Link } from 'react-router-dom';

const List = (props) => {
    let userlist = props.userList;
  return (
    <div className='mt-4'>
        {userlist.length > 0?(
            <ul>{userlist.map((user,index)=>(
                <li key={index} className='py-1 text-white border border-gray-100'>
                <Link to={{pathname:'/home/profile'}} state={{username:user}} className='hover:underline'>{user}</Link>
                </li>
            ))}</ul>
            ):(<p className='text-white'>No users found!</p>)}
    </div>
  )
}

export default List
