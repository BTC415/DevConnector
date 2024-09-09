'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Input from '@/app/components/Input'

const Login = () => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const router = useRouter()

  //state variable for inputs
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")

  //Handle change event for state variables
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // Update the name state
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Update the name state
  };

  //Handle form submit event
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    const userData = { email, password }

    axios.post(`${baseURL}/api/users/login`, userData)
      .then(res => router.push('/profiles'))
      .catch(err => console.error(err))

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen">
      <div className="mx-10 lg:mx-60 mt-28">
        <h1 className="font-semibold text-3xl md:text-4xl xl:text-5xl text-blue-500 my-5">Sign In</h1>
        <div className='flex items-center my-3'>
          <FontAwesomeIcon icon={faUser} className="text-sm md:text-xl lg:text-2xl xl:text-3xl" />
          <p className='ml-2 text-sm md:text-xl lg:text-2xl xl:text-4xl'>Sign into Your Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id='email'
            type='email'
            placeholder='Email Address'
            required={true}
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            id='password'
            type='password'
            placeholder='Password'
            required={true}
            value={password}
            onChange={handlePasswordChange}
          />

          <button type='submit' className='text-white bg-emerald-600 p-2 hover:bg-emerald-400 cursor-pointer my-3'>Login</button>
          <p>
            Don't have an account?
            <Link href="/register" className='text-emerald-600 cursor-pointer ml-2'>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login