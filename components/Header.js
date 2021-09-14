import React from 'react'
import Image from 'next/image'
import {
  SearchIcon,
  MenuIcon,
  GlobeAltIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          alt="Header Logo"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* middle */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm ">
        <input
          className="pl-5 flex-grow bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          placeholder="Start your search"
          type="text"
        />
        <SearchIcon className="hidden md:inline-flex h-8 rounded-full text-white p-2 md:mx-2 bg-red-400 cursor-pointer" />
      </div>

      {/* right */}
      <div className="flex items-center justify-end text-gray-500 space-x-4">
        <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 rounded-full p-2">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}

export default Header
