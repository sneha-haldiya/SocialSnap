import React, { useState } from 'react'

const UserProfileHeader = ({ idToDisplay, usernameToDisplay }) => {

    const [isOptions, setIsOptions] = useState(false);

    const logout = () => { window.location.href = '/'; }

    return (
        <div className='flex flex-row items-center justify-between p-4 bg-gray-900 text-white font-semibold'>
            <p className='m-2'>{usernameToDisplay}</p>
            <div className="flex space-x-4" >
                <button className='px-4 py-1 bg-gray-500 rounded-md hover:bg-gray-600 transition-all'>Edit profile</button>
                <button className='px-4 bg-gray-500 rounded-md hover:bg-gray-600 transition-all'>View archive</button>
                <button onClick={() => setIsOptions(true)}>...</button>
            </div>

            {isOptions && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-700 rounded-md p-4 w-50">
                        <h3 className="pb-2">Options</h3>
                        <button onClick={logout} className="w-full mb-3 px-4 py-1 text-white bg-red-500 rounded-md hover:bg-red-600">Logout</button>
                        <button onClick={() => setIsOptions(false)} className="w-full px-4 py-1 text-black bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                    </div>
                </div>)}
        </div>
    )
}

export default UserProfileHeader
