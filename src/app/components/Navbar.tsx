import Link from 'next/link';
import React from 'react';
import AuthButton from './auth/AuthButton';

const Navbar = async () => {
  return (
    // <nav className="border-b bg-background w-full flex items-center">
    //   <div className="flex w-full items-center justify-between my-4">
    //     <Link className="font-bold" href="/">
    //       Home
    //     </Link>

    //     <div className="flex items-center gap-x-5">
    //       <Link href="/dashboard">Dashboard</Link>
    //     </div>
    //     <div className="flex items-center gap-x-5">
    //       <Link href="/login">
    //         <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
    //           Login
    //         </div>
    //       </Link>
    //     </div>
    //   </div>
    // </nav>
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            {/* <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          KP Blog&apos;s
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <form action="/auth/signout" method="post">
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Sign Out
          </button>
        </form> */}
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;
