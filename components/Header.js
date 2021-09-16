import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import {
  SearchIcon,
  MenuIcon,
  GlobeAltIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import { ClockIcon, ChevronRightIcon } from '@heroicons/react/outline'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import useWindowSize from 'hooks/useWindowSize'

function Header() {
  const [atTop, setAtTop] = useState(true)
  const [locationShow, setLocationShow] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const size = useWindowSize()
  const smallSize = size.width < 640

  const popupRef = useRef()
  const searchBarRef = useRef()

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target)
    ) {
      setLocationShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  useEffect(() => {
    const onScroll = (e) => {
      window.pageYOffset === 0 ? setAtTop(true) : setAtTop(false)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [atTop])

  const handleSelect = (ranges) => {
    console.log(ranges)
    setEndDate(ranges.selection.endDate)
    setStartDate(ranges.selection.startDate)
  }

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  return (
    <div className="flex flex-col relative">
      <header
        className={`${
          atTop && 'bg-opacity-0'
        } fixed w-full top-0 z-50 flex justify-center md:grid grid-cols-3 p-5 md:px-10 bg-white transition duration-500 ease-out`}
      >
        {/* left */}
        <div className="relative hidden md:flex items-center h-10 cursor-pointer my-auto">
          <Image
            src="https://links.papareact.com/qd3"
            layout="fill"
            alt="Header Logo"
            objectFit="contain"
            objectPosition="left"
          />
        </div>

        {/* middle */}
        <div className="relative">
          <div
            className={` ${
              !atTop ? 'bg-gray-50' : 'bg-white xl:hidden w-[500px]'
            } flex flex-row-reverse md:flex-row items-center relative md:border-2 rounded-full p-3 md:py-2 md:shadow-sm transition duration-200 min-w-screen md:w-9/12 mx-auto `}
          >
            <input
              className="md:px-10 md:text-left bg-transparent outline-none w-full text-center text-sm text-gray-600 placeholder-gray-700 font-semibold "
              placeholder={`${
                smallSize ? 'Where are you going?' : 'Start your search'
              }`}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchIcon className="md:static md:inline-flex h-6 md:h-8 rounded-full md:text-white text-[#FF3855] md:mx-2 md:p-2 md:bg-[#FF3855] cursor-pointer" />
          </div>

          <div
            className={`hidden relative ${
              atTop ? 'xl:inline-flex' : 'hidden'
            } pl-10 py-3 space-x-4 items-center justify-center text-gray-200 cursor-pointer`}
          >
            <h2 className="border-b">Places to stay</h2>
            <h2>Experiences</h2>
            <h2>Online Experiences</h2>
          </div>

          {/* bar for location, check in, check out, and dates */}
          {atTop && (
            <div
              ref={searchBarRef}
              className="hidden md:inline-flex absolute top-20 w-[900px] justify-between -left-1/2 "
            >
              <div className="grid grid-cols-4  bg-white rounded-full">
                <div
                  onClick={() => setLocationShow(true)}
                  className="px-8 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <h4 className="group-hover:bg-gray-100">Location</h4>
                  <input
                    className="outline-none font-light placeholder-gray-500 group-hover:bg-gray-100"
                    type="text"
                    placeholder="Where are you going?"
                  />
                </div>
                <div className="px-5 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer">
                  <h4 className="group-hover:bg-gray-100">Check in</h4>
                  <p className="outline-none font-light text-gray-500 group-hover:bg-gray-100">
                    Add dates
                  </p>
                </div>
                <div className="px-5 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer">
                  <h4 className="group-hover:bg-gray-100">Check out</h4>
                  <p className="outline-none font-light text-gray-500 group-hover:bg-gray-100">
                    Add dates
                  </p>
                </div>
                <div className="px-5 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer">
                  <h4 className="group-hover:bg-gray-100">Guests</h4>
                  <p className="outline-none font-light text-gray-500 group-hover:bg-gray-100">
                    Add guests
                  </p>
                  <SearchIcon className="absolute right-2 top-5 h-10 md:h-8 rounded-full md:text-white  p-2 md:mx-2 md:bg-[#FF3855] cursor-pointer" />
                </div>
              </div>

              {/* Location under div */}
              {locationShow && (
                <div
                  ref={popupRef}
                  className="bg-white py-8 rounded-2xl mt-5 w-7/12"
                >
                  <div className="px-8">
                    <p className="font-bold text-sm">GO ANYWHERE, ANYTIME</p>
                    <button className="my-4 py-3 px-5 flex items-center justify-between w-full border-2 rounded-full shadow-xl">
                      <span className="text-purple-600 text-xl font-bold">
                        I'm flexible
                      </span>
                      <ChevronRightIcon className="h-6 cursor-pointer" />
                    </button>
                    <p className="font-bold text-sm mb-2">RECENT SEARCHES</p>
                  </div>
                  <div className="flex cursor-pointer hover:bg-gray-100 py-2 px-8 w-full items-center space-x-3 gap-2">
                    <div className="bg-gray-100 p-5 rounded-lg border">
                      <ClockIcon className="h-6 cursor-pointer" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-800 font-light">
                        Playa del Carmen - Stays
                      </p>
                      <p className="text-gray-400 font-light">Sep 21-28</p>
                    </div>
                  </div>
                  <div className="flex cursor-pointer hover:bg-gray-100 py-2 px-8 w-full items-center space-x-3 gap-2">
                    <div className="bg-gray-100 p-5 rounded-lg border">
                      <ClockIcon className="h-6 cursor-pointer" />
                    </div>
                    <div className="flex flex-col">
                      <p className=" text-gray-800 font-light">
                        Playa del Carmen - Stays
                      </p>
                      <p className="text-gray-400 font-light">Sep 21-28</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* right */}
        <div
          className={`hidden md:flex items-center justify-end space-x-4 ${
            atTop ? 'text-white' : 'text-gray-500'
          }`}
        >
          <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
          <GlobeAltIcon className="h-6 cursor-pointer" />

          <div className="flex items-center space-x-2 border-2 rounded-full p-2">
            <MenuIcon className="h-6 cursor-pointer" />
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        </div>
        {searchInput && !atTop && (
          <div className="text-xl fixed z-50 top-20 flex-col items-center col-span-3 mx-auto bg-white w-full flex justify-center">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              rangeColors={['#FF3855']}
            />
          </div>
        )}
      </header>
    </div>
  )
}

export default Header
