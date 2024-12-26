import React from 'react'

const ProfileHeader = (props) => {
    const usernameToDisplay = props.usernameToDisplay;
  return (
    <div className='flex flex-row items-center justify-between p-4 bg-gray-900 text-white font-semibold'>
      <p className='m-2'>{usernameToDisplay}</p>
      <div className="flex space-x-4" >
        <button className='px-4 py-1 bg-blue-500 rounded-md hover:bg-blue-600 transition-all'>Follow</button>
        <button className='px-4 bg-gray-500 rounded-md hover:bg-gray-600 transition-all'>Message</button>
        <button >...</button>
      </div>
    </div>
  )
}

export default ProfileHeader
