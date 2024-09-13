'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import Input from '@/app/components/Input'
import Spinner from '@/app/components/Spinner';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { registerUser } from '@/lib/features/auth/authActions';
import { RootState } from '@/lib/store';

const Register: React.FC = () => {
  const { loading, error } = useAppSelector((state: RootState) => state.auth)

  const dispatch = useAppDispatch();
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
    setEmail(event.target.value); // Update the email state
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Update the password state
  };
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value); // Update the password2 state
  };

  //Handle form submit event
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Handle form submission
    try {
      await dispatch(registerUser({ name, email, password, password2 })).unwrap();
      // Redirect to login page after successful registration  
      router.push('/login');
      // Optionally reset form fields  
      setName("");
      setEmail("");
      setPassword("");
      setPassword2("");
    } catch (error) {
      console.error("registrationError----->", error);
    }
  };

  return loading ? (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className="w-40">
        <Spinner />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen">
      <div className="mx-10 lg:mx-60 mt-28">
        <h1 className="font-semibold text-3xl md:text-4xl xl:text-5xl text-blue-500 my-5">Sign Up</h1>
        <div className='flex items-center my-3'>
          <FontAwesomeIcon icon={faUser} className="text-sm md:text-xl lg:text-2xl xl:text-3xl" />
          <p className='ml-2 text-sm md:text-xl lg:text-2xl xl:text-4xl'>Create Your Account as a Recruiter</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id='name'
            type='text'
            placeholder='Name'
            required={true}
            value={name}
            onChange={handleNameChange}
            error={error ? error.name : null}
          />
          <Input
            id='email'
            type='email'
            placeholder='Email Address'
            required={true}
            value={email}
            onChange={handleEmailChange}
            error={error ? error.email : null}
          />
          <span className='text-gray-500'>This site uses Gravatar so if you want a profile image, use a Gravatar email
          </span>
          <Input
            id='password'
            type='password'
            placeholder='Password'
            required={true}
            value={password}
            onChange={handlePasswordChange}
            error={error ? error.password : null}
          />
          <Input
            id='password2'
            type='password'
            placeholder='Confirm Password'
            required={true}
            value={password2}
            onChange={handleConfirmPasswordChange}
            error={error ? error.password2 : null}
          />
          <button
            type='submit'
            className='text-white bg-emerald-600 p-2 hover:bg-emerald-400 cursor-pointer my-3'
            disabled={loading}
          >
            Register
          </button>
          <p>
            Already have an account?
            <Link href="/login" className='text-emerald-600 cursor-pointer ml-2'>Sign In</Link>
          </p>
        </form>
      </div >
    </div>
  )
}

export default Register