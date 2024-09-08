import type { Metadata } from "next";
import Link from "next/link";
import { Counter } from "./components/counter/Counter";

export default function IndexPage() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center overflow-hidden bg-black flex opacity-80 items-center justify-center">
      <div className="top-0 left-0 w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-4 text-6xl font-semibold font-serif text-white">Developer Connector</h1>
          <p className="text-3xl mx-auto my-5 font-sans text-white">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link href="/register" className="m-4 px-3 py-2 text-xl font-serif text-white bg-green-400 hover:bg-green-500 rounded-sm">Sign Up</Link>
            <Link href="/login" className="m-4 px-3 py-2 text-xl font-serif text-black bg-gray-200 hover:bg-gray-300 rounded-sm">Login</Link>
          </div>
        </div>
      </div>
    </div>

  )
}
