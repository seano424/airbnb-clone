import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import _ from 'lodash'
import {
  SearchIcon,
  MenuIcon,
  GlobeAltIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import { ClockIcon, ChevronRightIcon } from '@heroicons/react/outline'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import { DateRange } from 'react-date-range'

import useWindowSize from 'hooks/useWindowSize'

function Header() {
  const [atTop, setAtTop] = useState(true)
  const [locationShow, setLocationShow] = useState(false)
  const [checkInOutShow, setCheckInOutShow] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [bgChange, setBgChange] = useState(false)

  const [checkInDateRange, setCheckInDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])

  const { pathname } = useRouter()
  const searchBarRef = useRef()
  const locationRef = useRef()
  const checkInOutRef = useRef()

  const size = useWindowSize()
  const smallSize = size.width < 640

  const handleClickOutside = (event) => {
    if (
      locationRef.current &&
      !locationRef.current.contains(event.target) &&
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

  const handleLocationClick = () => {
    setLocationShow(true)
    setCheckInOutShow(false)
  }

  const handleCheckInOutClick = () => {
    setLocationShow(false)
    setCheckInOutShow(true)
    setBgChange(!bgChange)
  }

  const handleDateChange = (item) => {
    setCheckInDateRange([item.selection])
  }

  const handleRangeFocusChange = (item) => {
    setBgChange(_.isEqual(item, [0, 1]))
  }

  return (
    <div className="flex flex-col sticky top-0 z-50">
      <header
        className={`${
          atTop && 'bg-opacity-0'
        } w-full top-0 z-50 flex justify-center md:grid grid-cols-3 p-5 md:px-10 bg-white transition duration-500 ease-out`}
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
        <div className="relative md:-left-20 lg:left-0">
          <div
            className={` ${
              atTop && pathname === '/'
                ? 'bg-white md:hidden w-[500px]'
                : 'bg-gray-50 w-[500px] md:w-full'
            } flex flex-row-reverse md:flex-row items-center justify-center  relative md:border-2 rounded-full p-3 md:py-4 md:shadow-sm transition duration-200 min-w-screen lg:w-9/12 lg:mx-auto `}
          >
            <input
              className="md:px-10 md:text-left bg-transparent outline-none  text-sm text-gray-600 placeholder-gray-700 font-semibold "
              placeholder={`${
                smallSize ? 'Where are you going?' : 'Start your search'
              }`}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchIcon className="md:absolute right-1 rounded-full h-10 p-2 md:text-white text-primary md:bg-primary cursor-pointer" />
          </div>

          <div
            className={`hidden relative ${
              atTop && pathname === '/' ? 'xl:inline-flex' : 'hidden'
            } pl-10 py-3 space-x-4 items-center justify-center text-gray-200 cursor-pointer`}
          >
            <h2 className="border-b">Places to stay</h2>
            <h2>Experiences</h2>
            <h2>Online Experiences</h2>
          </div>
          {/* bar for location, check in, check out, and dates */}
          {atTop && pathname === '/' && (
            <div
              ref={searchBarRef}
              className="hidden md:inline-flex flex-col absolute top-20 w-[600px] lg:w-[900px] justify-between -left-1/2 "
            >
              <div className="grid grid-cols-4 text-xs overflow-ellipsis lg:text-base  bg-white rounded-full relative">
                <div
                  onClick={handleLocationClick}
                  className="px-8 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <h4 className="group-hover:bg-gray-100">Location</h4>
                  <input
                    className="outline-none font-light overflow-ellipsis w-full placeholder-gray-500 group-hover:bg-gray-100"
                    type="text"
                    placeholder="Where are you going?"
                  />
                </div>
                <div
                  onClick={handleCheckInOutClick}
                  className={`px-5 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer ${
                    bgChange && 'bg-gray-100'
                  }`}
                >
                  <h4
                    className={`group-hover:bg-gray-100 ${
                      bgChange && 'bg-gray-100'
                    }`}
                  >
                    Check in
                  </h4>
                  <p className="outline-none font-light text-gray-500 group-hover:bg-gray-100">
                    Add dates
                  </p>
                </div>
                <div
                  onClick={handleCheckInOutClick}
                  className={`px-5 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer ${
                    !bgChange && 'bg-gray-100'
                  }`}
                >
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
                </div>
                <SearchIcon className="absolute right-1 top-3 h-10 lg:h-12 md:h-8 rounded-full md:text-white  p-2 md:mx-2 md:bg-primary cursor-pointer" />
              </div>
              {/* Location under div */}
              {locationShow && (
                <div
                  ref={locationRef}
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

              {/* Check in and Check out under div */}
              {checkInOutShow && (
                <div
                  ref={checkInOutRef}
                  className="bg-white py-8 rounded-2xl mt-5 w-full"
                >
                  <div className="text-xl z-50 top-24 flex-col items-center bg-white flex pb-10">
                    <DateRange
                      onRangeFocusChange={(item) =>
                        handleRangeFocusChange(item)
                      }
                      minDate={new Date()}
                      months={2}
                      showMonthAndYearPickers={false}
                      showDateDisplay={false}
                      editableDateInputs={false}
                      onChange={(item) => handleDateChange(item)}
                      moveRangeOnFirstSelection={false}
                      ranges={checkInDateRange}
                      rangeColors={['#FF3855']}
                      direction="horizontal"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* right */}
        <div
          className={`hidden md:flex items-center justify-end space-x-4 ${
            atTop && pathname === '/' ? 'text-white' : 'text-gray-500'
          }`}
        >
          <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
          <GlobeAltIcon className="h-6 cursor-pointer" />

          <div className="flex items-center space-x-2 border-2 rounded-full p-2">
            <MenuIcon className="h-6 cursor-pointer" />
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        </div>
        {searchInput && (
          <div className="text-xl fixed z-50 top-24 flex-col items-center w-screen bg-white flex pb-10">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              rangeColors={['#FF3855']}
            />
            <div className="self-start flex items-center justify-between w-full mb-4 px-10 border-b">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5" />
              <input
                onChange={(e) => setNumberOfGuests(e.target.value)}
                value={numberOfGuests}
                type="number"
                min={1}
                className="w-12 pl-2 outline-none text-lg text-primary"
              />
            </div>
            <div className="flex w-full">
              <button onClick={() => setSearchInput()} className="flex-grow">
                Cancel
              </button>
              <button className="flex-grow text-primary">Search</button>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header
