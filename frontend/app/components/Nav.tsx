'use client'
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { RootState } from "@/lib/store";
import { logoutUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

export const Nav: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userToken } = useAppSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/")
    console.log("Logged out successfully!")
  }

  return (
    <div>
      <nav className="flex flex-col md:flex-row justify-between items-center bg-black py-3 px-8 fixed z-10 w-full top-0 border border-b-2 bg-opacity-90 border-cyan-600">
        <h1>
          <Link href="/" className="text-white font-semibold text-2xl hover:text-lime-500">DevConnector</Link>
        </h1>

        {userToken ?
          (<ul className="flex mx-1 ">
            <li className="p-3 my-0 "><Link href="/profiles" className="text-white text-xl hover:text-lime-500 ">Developers</Link></li>
            <li className="p-3 my-0 "><button type="button" className="text-white text-xl hover:text-lime-500" onClick={handleLogout}>Logout</button></li>
          </ul >)
          :
          (<ul className="flex mx-1 ">
            <li className="p-3 my-0 "><Link href="/profiles" className="text-white text-xl hover:text-lime-500 ">Developers</Link></li>
            <li className="p-3 my-0 "><Link href="/register" className="text-white text-xl hover:text-lime-500">Register</Link></li>
            <li className="p-3 my-0 "><Link href="/login" className="text-white text-xl hover:text-lime-500">Login</Link></li>
          </ul >)
        }
      </nav >
    </div >
  );
};
