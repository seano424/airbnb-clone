import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import _ from 'lodash'
import {
  SearchIcon,
  MenuIcon,
  GlobeAltIcon,
  UserCircleIcon,
  LocationMarkerIcon,
} from '@heroicons/react/solid'
import { ClockIcon, ChevronRightIcon } from '@heroicons/react/outline'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'

import useWindowSize from 'hooks/useWindowSize'
import useHandleClickOutside from 'hooks/useHandleClickOutside'
import Guests from './Guests'

function Header({ placeholder }) {
  const [atTop, setAtTop] = useState(true)
  const [expandSearchButton, setExpandSearchButton] = useState(true)
  const [infoBar, setInfoBar] = useState(false)
  const [checkShow, setCheckShow] = useState(false)
  const [locationShow, setLocationShow] = useState(false)
  const [locationValue, setLocationValue] = useState('')
  const [guestsShow, setGuestsShow] = useState(false)
  const [checkInOutShow, setCheckInOutShow] = useState(false)
  const [bgChange, setBgChange] = useState(false)
  const [checkInDateRange, setCheckInDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  const [noOfAdults, setNoOfAdults] = useState(0)
  const [noOfChildren, setNoOfChildren] = useState(0)
  const [noOfInfants, setNoOfInfants] = useState(0)

  const { pathname } = useRouter()
  const router = useRouter()
  const searchBarRef = useRef()
  const searchButtonRef = useRef()
  const guestsRef = useRef()
  const locationRef = useRef()
  const checkInOutRef = useRef()

  const size = useWindowSize()
  const smallSize = size.width < 640
  const locationNull = locationValue === ''

  useEffect(() => {
    const input = document.querySelector('input')
    input?.focus()
  }, [locationShow])

  useEffect(() => {
    document.addEventListener(
      'click',
      (event) =>
        useHandleClickOutside(
          locationRef,
          searchBarRef,
          setLocationShow,
          event
        ),
      true
    )
    return () => {
      document.removeEventListener(
        'click',
        (event) =>
          useHandleClickOutside(
            locationRef,
            searchBarRef,
            setLocationShow,
            event
          ),
        true
      )
    }
  }, [])

  useEffect(() => {
    document.addEventListener(
      'click',
      (event) =>
        useHandleClickOutside(
          searchButtonRef,
          searchBarRef,
          setExpandSearchButton,
          event
        ),
      true
    )
    return () => {
      document.removeEventListener(
        'click',
        (event) =>
          useHandleClickOutside(
            searchButtonRef,
            searchBarRef,
            setExpandSearchButton,
            event
          ),
        true
      )
    }
  }, [])

  useEffect(() => {
    document.addEventListener(
      'click',
      (event) =>
        useHandleClickOutside(
          checkInOutRef,
          searchBarRef,
          setCheckInOutShow,
          event
        ),
      true
    )
    return () => {
      document.removeEventListener(
        'click',
        (event) =>
          useHandleClickOutside(
            checkInOutRef,
            searchBarRef,
            setCheckInOutShow,
            event
          ),
        true
      )
    }
  }, [])

  useEffect(() => {
    document.addEventListener(
      'click',
      (event) =>
        useHandleClickOutside(guestsRef, searchBarRef, setGuestsShow, event),
      true
    )
    return () => {
      document.removeEventListener(
        'click',
        (event) =>
          useHandleClickOutside(guestsRef, searchBarRef, setGuestsShow, event),
        true
      )
    }
  }, [])

  useEffect(() => {
    const onScroll = (e) => {
      if (window.pageYOffset === 0) {
        setAtTop(true)
        setInfoBar(false)
      } else {
        setAtTop(false)
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [atTop])

  const handleLocationClick = () => {
    setLocationShow(true)
    setCheckInOutShow(false)
    setCheckShow(false)
    setGuestsShow(false)
  }

  const handleGuestsClick = () => {
    setLocationShow(false)
    setCheckInOutShow(false)
    setCheckShow(false)
    setGuestsShow(true)
  }

  const handleCheckInOutClick = () => {
    setLocationShow(false)
    setCheckShow(true)
    setCheckInOutShow(true)
    setBgChange(true)
    setGuestsShow(false)
  }

  const handleCheckOutClick = () => {
    setLocationShow(false)
    setCheckShow(true)
    setCheckInOutShow(true)
    setBgChange(false)
    setGuestsShow(false)
  }

  const handleDateChange = (item) => {
    setCheckInDateRange([item.selection])
  }

  const handleRangeFocusChange = (item) => {
    setBgChange(_.isEqual(item, [0, 1]))
  }

  const handleChangeBar = () => {
    setAtTop(true)
    setInfoBar(true)
  }

  const handleLocation = () => {
    locationValue === '' ? setLocationShow(true) : handleCheckInOutClick()
  }

  const handleSearch = () => {
    if (locationValue !== '') {
      router.push({
        pathname: '/search',
        query: {
          location: locationValue,
          startDate: checkInDateRange[0].startDate?.toDateString() || '',
          endDate: checkInDateRange[0].endDate?.toDateString() || '',
          guests: noOfInfants + noOfChildren + noOfAdults,
        },
      })
    } else {
      handleLocationClick()
    }
  }

  return (
    <div className="flex flex-col absolute top-0 z-50">
      <header
        className={`${
          atTop && !infoBar && 'bg-opacity-0'
        } w-screen fixed top-0 z-50 flex justify-between items-center md:px-10 bg-white transition duration-300 ease-out`}
      >
        {/* left */}
        <div
          onClick={() => router.push('/')}
          className="relative flex items-center h-28 w-28 cursor-pointer my-auto"
        >
          <Image
            src="https://links.papareact.com/qd3"
            layout="fill"
            alt="Header Logo"
            objectFit="contain"
            objectPosition="left"
          />
        </div>

        {/* middle */}
        <div
          className={` ${
            atTop && pathname === '/' && 'bg-white md:hidden'
          } border rounded-full mx-4 lg:ml-24 p-2 w-[400px] bg-white`}
        >
          <div onClick={handleChangeBar} className="flex justify-between">
            <input
              className="outline-none bg-white w-full text-sm"
              type="text"
              placeholder={
                placeholder
                  ? placeholder
                  : smallSize
                  ? 'Where are you going?'
                  : 'Start your search'
              }
            />
            <SearchIcon className="rounded-full flex-shrink-0 h-10 p-2 md:text-white text-primary md:bg-primary cursor-pointer" />
          </div>
        </div>

        <div
          className={`relative ${
            atTop && pathname === '/' ? 'xl:inline-flex' : 'hidden'
          } ${
            infoBar && 'text-gray-500'
          }  text-center py-3 space-x-4 items-center justify-center text-gray-200 cursor-pointer w-max self-center ml-36 hidden`}
        >
          <h2 className="border-b">Places to stay</h2>
          <h2>Experiences</h2>
          <h2>Online Experiences</h2>
        </div>

        {/* bar for location, check in, check out, and dates */}
        {/* atTop && */}
        {atTop && pathname === '/' && (
          <div
            onClick={() => setExpandSearchButton(true)}
            ref={searchBarRef}
            className="hidden md:inline-flex flex-col absolute top-40 lg:top-28 lg:w-[900px] w-[700px] left-1/2 transform -translate-x-1/2 "
          >
            <div className="flex justify-between items-center text-xs overflow-ellipsis lg:text-base  bg-white rounded-full relative">
              <div
                onClick={handleLocationClick}
                className={`${
                  locationShow && 'bg-gray-100'
                } px-8 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer`}
              >
                <h4 className="group-hover:bg-gray-100">Location</h4>
                <input
                  className={`${
                    locationShow && 'bg-gray-100'
                  } outline-none font-light overflow-ellipsis w-full placeholder-gray-500 group-hover:bg-gray-100`}
                  type="text"
                  autoFocus={true}
                  placeholder="Where are you going?"
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                />
              </div>
              <div
                onClick={handleCheckInOutClick}
                className={`px-10 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer ${
                  bgChange && checkShow && 'bg-gray-100'
                }`}
              >
                <h4
                  className={`group-hover:bg-gray-100 ${
                    bgChange && checkShow && 'bg-gray-100'
                  }`}
                >
                  Check in
                </h4>
                <p className="outline-none font-light text-gray-500 group-hover:bg-gray-100">
                  Add dates
                </p>
              </div>
              <div
                onClick={handleCheckOutClick}
                className={`px-10 py-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer ${
                  !bgChange && checkShow && 'bg-gray-100'
                }`}
              >
                <h4 className="group-hover:bg-gray-100">Check out</h4>
                <p className="outline-none font-light text-gray-500 group-hover:bg-gray-100">
                  Add dates
                </p>
              </div>
              <div
                className={`${
                  guestsShow && 'bg-gray-50 shadow-lg'
                }  flex justify-between items-center gap-3 p-3 bg-white group hover:bg-gray-100 rounded-full cursor-pointer`}
              >
                <div onClick={handleGuestsClick}>
                  <h4 className="group-hover:bg-gray-100">Guests</h4>
                  <p className="outline-none font-light text-gray-500 group-hover:bg-gray-100">
                    Add guests
                  </p>
                </div>
                <div
                  onClick={handleSearch}
                  // onClick={() => console.log('do something')}
                  ref={searchButtonRef}
                  className={`flex ${
                    expandSearchButton &&
                    'space-x-2 items-center rounded-full p-3 mr-2 bg-primary hover:bg-red-600 text-white group'
                  }`}
                >
                  <SearchIcon
                    className={`${
                      expandSearchButton
                        ? 'h-10 transition-all duration-100 ease-linear rounded-full text-white cursor-pointer'
                        : 'rounded-full md:text-white  md:mx-2 w-[50px] p-2 md:bg-primary cursor-pointer transition-all duration-150 ease-linear'
                    } `}
                  />
                  <p
                    className={`${
                      expandSearchButton ? 'flex' : 'hidden'
                    } text-lg`}
                  >
                    Search
                  </p>
                </div>
              </div>

              {/* expandSearchButton */}
            </div>

            {/* Location under div */}
            {locationShow && locationNull && (
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
            {locationShow && !locationNull && (
              <div
                ref={locationRef}
                className="bg-white py-8 rounded-2xl mt-5 w-7/12"
              >
                <div className="flex flex-col gap-4">
                  <div
                    onClick={handleLocation}
                    className="flex space-x-6 items-center px-6 cursor-pointer hover:bg-gray-50"
                  >
                    <LocationMarkerIcon className="h-12 p-4 bg-gray-100 rounded-lg" />
                    <h4 className="font-light">Lodi, CA</h4>
                  </div>
                  <div
                    onClick={handleLocation}
                    className="flex space-x-6 items-center px-6 cursor-pointer hover:bg-gray-50"
                  >
                    <LocationMarkerIcon className="h-12 p-4 bg-gray-100 rounded-lg" />
                    <h4 className="font-light">Lodi, CA</h4>
                  </div>
                  <div
                    onClick={handleLocation}
                    className="flex space-x-6 items-center px-6 cursor-pointer hover:bg-gray-50"
                  >
                    <LocationMarkerIcon className="h-12 p-4 bg-gray-100 rounded-lg" />
                    <h4 className="font-light">Lodi, CA</h4>
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
                    onRangeFocusChange={(item) => handleRangeFocusChange(item)}
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

            {/* Guests under div */}
            {guestsShow && (
              <div
                ref={guestsRef}
                className="mt-5 relative flex flex-col items-end justify-end"
              >
                <div className="bg-white p-10 rounded-3xl w-5/12">
                  <Guests
                    noOfGuests={noOfAdults}
                    setNoOfGuests={setNoOfAdults}
                    header="Adults"
                    description="Ages 13 or above"
                  />
                  <Guests
                    noOfGuests={noOfChildren}
                    setNoOfGuests={setNoOfChildren}
                    header="Children"
                    description="Ages 2-12"
                  />
                  <Guests
                    noOfGuests={noOfInfants}
                    setNoOfGuests={setNoOfInfants}
                    header="Infants"
                    description="Under 2"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* right */}
        <div
          className={`flex items-center justify-end space-x-4 ${
            atTop && !infoBar && pathname === '/'
              ? 'text-white'
              : 'text-gray-500'
          }`}
        >
          <p className="hidden md:inline-flex cursor-pointer w-max">
            Become a host
          </p>
          <GlobeAltIcon className="h-6 cursor-pointer" />

          <div className="flex items-center space-x-2 border-2 rounded-full p-2">
            <MenuIcon className="h-6 cursor-pointer" />
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
