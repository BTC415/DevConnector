'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
  
  return (
    <div className="w-full h-screen">
      <div className="mx-10 lg:mx-60 mt-28">
        <h1 className="font-semibold text-3xl md:text-4xl xl:text-5xl text-blue-500 my-5">Sign In</h1>
        <div className='flex items-center my-3'>
          <FontAwesomeIcon icon={faUser} className="text-sm md:text-xl lg:text-2xl xl:text-3xl" />
          <p className='ml-2 text-sm md:text-xl lg:text-2xl xl:text-4xl'>Sign into Your Account</p>
        </div>
        <form >
          <input type='text' className='my-3 p-2 border border-black w-full lg:w-lg' placeholder='Email Address' required />
          
          <input type='password' className='my-3 p-2 border border-black w-full lg:w-lg' placeholder='Password' required />
          <button type='button' className='text-white bg-emerald-600 p-2 hover:bg-emerald-400 cursor-pointer my-3' >Login</button>
          <p>
            Don't have an account?
            <button type='button' className='text-emerald-600 cursor-pointer ml-2'>Sign Up</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login