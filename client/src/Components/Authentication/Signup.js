import React,{useState} from 'react'

import { useNavigate } from "react-router-dom"

const Signup = () => {
  const navigate = useNavigate();
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const setObject = (value) => {
      setPhoneno('');
      setEmail('');
      
      const emailRegex = /[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+(com|org|edu|nz|au)/;
      const phonenoRegex = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;
      if(phonenoRegex.test(value)){
        setPhoneno(value);
      }
      else if(emailRegex.test(value)){
        setEmail(value);
      }
      /* else{
        alert(`Error: $("Invalid Mobile number or email")`)
      } */
    }
    async function submit(e) {
      e.preventDefault();
      try{
        const response = await fetch("http://localhost:8000/signup",{
          method :"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({fullname,username,email,phoneno,password}),
        });
        const r = await response.json();
        if(r === "Success signup"){
          navigate("/");
        }
        else{
          alert(r);
        }
      }
      catch(e){
        alert(`Error: ${e}`);
      }
    }

  
  return (
    <div className='flex flex-col bg-gray-950 py-10 rounded-md align-center border border-gray-500'>
      <h1 className="self-center text-4xl text-white italic font-serif p-4 px-20">SocialSnap</h1>
      <form action='POST' className='flex flex-col gap-2 m-4'>
        <input type="text" className='p-2 w-full bg-gray-800 border border-gray-500 rounded-md text-xs text-white' onChange={(e) => { setFullname(e.target.value) }} placeholder="Full Name"/>
        <input type="text" className='p-2 w-full bg-gray-800 border border-gray-500 rounded-md text-xs text-white' onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"/>
        <input type="text" className='p-2 w-full bg-gray-800 border border-gray-500 rounded-md text-xs text-white' onChange={(e) => { setObject(e.target.value) }} placeholder="Mobile number or email"/>
        <input type="password" className='p-2 w-full bg-gray-800 border border-gray-500 rounded-md text-xs text-white' onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"/>
        <button className='mx-20 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all' onClick={submit}>Sign up</button>
      </form>
    </div>
  )
}

export default Signup
