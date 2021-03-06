import React from 'react'
import Image from 'next/image'

function Banner({ children }) {
  return (
    <div className="relative h-[700px] sm:h-[550px] lg:h-[500px] xl:h-[550px] 2xl:h-[700px]">
      {children}
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        alt="hero image"
        objectFit="cover"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <button className="bg-white text-purple-500 px-10 py-4 rounded-full shadow-md font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
          I'm flexible
        </button>
      </div>
    </div>
  )
}

export default Banner
