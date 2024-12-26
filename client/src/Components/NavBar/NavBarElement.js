import React from 'react'
import { Link } from 'react-router-dom';

const NavBarElement = ({ elementName }) => {
  const path = `/home/${elementName.toLowerCase()}`;
  return (
    <Link to={{ pathname: path }} className='p-4 hover:bg-blue-900 cursor-pointer hover:underline'>{elementName}
    </Link>
  )
}

export default NavBarElement