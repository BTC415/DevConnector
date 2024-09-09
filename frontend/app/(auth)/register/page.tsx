'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'; // Ensure this is imported  
import Link from 'next/link'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Input from '@/app/components/Input'


const Register = () => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const router = useRouter();

  //State variable for components
  const [name, setName] = React.useState<string>("")
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [password2, setPassword2] = React.useState<string>("")

  //Handle change event for state variables
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Update the name state
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // Update the name state
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Update the name state
  };
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value); // Update the name state
  };

  //Handle form submit event
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    const userData = { name, email, password, password2 }

    axios.post(`${baseURL}/api/users/register`, userData)
      .then(res => router.push('/login'))
      .catch(err => console.log(err))

    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  return (
    <div className="w-full h-screen">
      <div className="mx-10 lg:mx-60 mt-28">
        <h1 className="font-semibold text-3xl md:text-4xl xl:text-5xl text-blue-500 my-5">Sign Up</h1>
        <div className='flex items-center my-3'>
          <FontAwesomeIcon icon={faUser} className="text-sm md:text-xl lg:text-2xl xl:text-3xl" />
          <p className='ml-2 text-sm md:text-xl lg:text-2xl xl:text-4xl'>Create Your Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Name'
            required={true}
            value={name}
            onChange={handleNameChange}
          />
          <Input
            type='text'
            placeholder='Email Address'
            required={true}
            value={email}
            onChange={handleEmailChange}
          />
          <span className='text-gray-500'>This site uses Gravatar so if you want a profile image, use a Gravatar email
          </span>
          <Input
            type='password'
            placeholder='Password'
            required={true}
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            required={true}
            value={password2}
            onChange={handleConfirmPasswordChange}
          />
          <button
            type='submit'
            className='text-white bg-emerald-600 p-2 hover:bg-emerald-400 cursor-pointer my-3'
          >
            Register
          </button>
          <p>
            Already have an account?
            <Link href="/login" className='text-emerald-600 cursor-pointer ml-2'>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register