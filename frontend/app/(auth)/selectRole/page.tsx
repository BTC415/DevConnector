'use client'
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faUserCheck } from "@fortawesome/free-solid-svg-icons"

interface RoleCardProps {
  icon: any;
  text: string;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<>>;
}

const RoleSelection: React.FC = () => {
  const [role, setRole] = React.useState<string>("")

  return (
    <div>
      <h1 className="m-2 p-2 text-4xl font-bold text-center">Join as a developer or recruiter</h1>
      <div className="flex items-center justify-center">
        <RoleCard icon={faCode} text={"I am a Developer, looking for work"} role={"developer"} setRole={setRole} />
        <RoleCard icon={faUserCheck} text={"I am a Recruiter, hiring for a project"} role={"recruiter"} setRole={setRole} />
      </div>
      <div className="flex items-center justify-center mb-8">
        {!role && <button className="text-center font-bold text-2xl text-gray-500 bg-gray-200 p-4 border rounded">Create Account</button>}
        {role === "developer" && <Link href="/register/developer" className="text-center font-bold text-2xl text-white bg-green-500 p-4 border rounded">Apply as a Developer</Link>}
        {role === "recruiter" && <Link href="/register/recruiter" className="text-center font-bold text-2xl text-white bg-green-500 p-4 border rounded">Join as a Recruiter</Link>}
      </div>
      <p className="text-center ">
        Already have an account?
        <Link href="/login" className='text-emerald-600 cursor-pointer ml-2'>Sign In</Link>
      </p>
    </div>
  )
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, text, role, setRole }) => {
  return (
    <div onClick={() => setRole(role)} className="w-64 flex flex-col items-center m-8 p-8 border border-black rounded-lg hover:bg-gray-200 hover:border-green-300">
      <div className="flex w-full justify-between mb-4">
        <FontAwesomeIcon icon={icon} className="mr-2 text-2xl" />
      </div>
      <p className="font-bold text-xl">{text}</p>
    </div>
  )
}

export default RoleSelection;