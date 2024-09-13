'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export default function IndexPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  useEffect(() => {
    if(isAuthenticated) {
      router.push("/profiles")
    }
  }, [])

  return (
    <div className="flex w-full h-screen bg-cover bg-center overflow-hidden items-center justify-center" style={{
      backgroundImage: `url('/showcase.jpg')`,
    }}>
      <div className="w-full h-screen bg-black opacity-80 my-auto">
        <div className=" flex flex-col justify-center items-center h-full">
          <h1 className="mb-4 text-6xl font-semibold font-serif text-white">Developer Connector</h1>
          <p className="text-3xl mx-auto my-5 font-sans text-white">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link href="/selectRole" className="m-4 px-3 py-2 text-xl font-serif text-white bg-green-400 hover:bg-green-500 rounded-sm">Sign Up</Link>
            <Link href="/login" className="m-4 px-3 py-2 text-xl font-serif text-black bg-gray-200 hover:bg-gray-300 rounded-sm">Login</Link>
          </div>
        </div>
      </div>
    </div>

  )
}
