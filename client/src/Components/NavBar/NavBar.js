import React from 'react'
import { Link } from 'react-router-dom'
import NavBarElement from './NavBarElement'

const NavBar = () => {
    return (
        <div className='w-1/4 bg-blue-950 flex flex-col text-white'>
            <Link to="/home" className="p-4 hover:underline hover:bg-blue-900 cursor-pointer">Home</Link>
            <NavBarElement elementName={"Search"} />
            <NavBarElement elementName={"Notification"} />
            <NavBarElement elementName={"Messages"} />
            <NavBarElement elementName={"Profile"} />
            <NavBarElement elementName={"Settings"} />
        </div>
    )
}

export default NavBar
