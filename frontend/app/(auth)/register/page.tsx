'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
const Register = () => {
  
  return (
    <div className="w-full h-screen">
      <div className="mx-10 lg:mx-60 mt-28">
        <h1 className="font-semibold text-3xl md:text-4xl xl:text-5xl text-blue-500 my-5">Sign Up</h1>
        <div className='flex items-center my-3'>
          <FontAwesomeIcon icon={faUser} className="text-sm md:text-xl lg:text-2xl xl:text-3xl" />
          <p className='ml-2 text-sm md:text-xl lg:text-2xl xl:text-4xl'>Create Your Account</p>
        </div>
        <form >
          <input type='text' className='my-3 p-2 border border-black w-full lg:w-lg' placeholder='Name' required />
          <input type='text' className='my-3 p-2 border border-black w-full lg:w-lg' placeholder='Email Address' required />
          <span className='text-gray-500'>This site uses Gravatar so if you want a profile image, use a Gravatar email
          </span>
          <input type='password' className='my-3 p-2 border border-black w-full lg:w-lg' placeholder='Password' required />
          <input type='password' className='my-3 p-2 border border-black w-full lg:w-lg' placeholder='Confirm Password' required />
          <button type='button' className='text-white bg-emerald-600 p-2 hover:bg-emerald-400 cursor-pointer my-3' >Register</button>
          <p>
            Already have an account?
            <button type='button' className='text-emerald-600 cursor-pointer ml-2'>Sign In</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register