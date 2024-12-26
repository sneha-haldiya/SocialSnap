import React, { useState } from 'react'

import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [phoneno, setPhoneno] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setObject = (value) => {
    setUsername('');
    setPhoneno('');
    setEmail('');
    const emailRegex = /[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+(com|org|edu|nz|au)/;
    const phonenoRegex = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
    if (emailRegex.test(value)) {
      setEmail(value);
    }
    else if (phonenoRegex.test(value)) {
      setPhoneno(value);
    }
    else {
      setUsername(value);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phoneno, password }),
      });
      const r = await response.json();

      if (r.message === "Success login") {
        navigate("/home", { state: { username: r.username } });
      }
      else {
        alert(r);
      }
    }
    catch (e) {
      alert(`Error: ${e}`);
    }
  }
  return (
    <div className='flex flex-col bg-gray-950 py-10 rounded-md align-center border border-gray-500'>
      <h1 className="self-center text-4xl text-white italic font-serif p-4 px-20">SocialSnap</h1>
      <form action='POST' className='flex flex-col gap-2 m-4'>
        <input type="text" className='p-2 w-full bg-gray-800 border border-gray-500 rounded-md text-xs text-white' onChange={(e) => { setObject(e.target.value) }} placeholder="Phone number,username, or email" />
        <input type="password" className='p-2 w-full bg-gray-800 border border-gray-500 rounded-md text-xs text-white' onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
        <button className='mx-20 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all' onClick={submit}>Login</button>
      </form>

      <div className='flex items-center justify-center my-4 gap-2'>
        <div className='w-1/3 h-px bg-gray-500'></div>
        <h5 className='text-gray-400 text-sm'>OR</h5>
        <div className='w-1/3 h-px bg-gray-500'></div>
      </div>

      <div className='flex items-center justify-center my-4 gap-2'>
        <h6 className='text-white'>Don't have an account?</h6>
        <button className='text-blue-400'><Link to="/signup" >Signup</Link></button>
      </div>

    </div>
  )
}

export default Login
