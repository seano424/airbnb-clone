import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'

function Guests({ header, description, noOfGuests, setNoOfGuests }) {
  const [state, setState] = useState(0)

  return (
    <div className="flex justify-between border-b py-2 select-none">
      <div>
        <h4 className="font-semibold">{header}</h4>
        <p className="font-light text-gray-500">{description}</p>
      </div>
      <div className="flex items-center space-x-3">
        <MinusCircleIcon
          // onClick={() => setState(state > 0 ? state - 1 : 0)}
          onClick={() => setNoOfGuests(noOfGuests > 0 ? noOfGuests - 1 : 0)}
          className={`h-8 text-gray-300 active:scale-90 hover:text-gray-500 cursor-pointer ${
            noOfGuests === 0 && 'text-gray-100 cursor-not-allowed'
          }`}
        />
        <span>{noOfGuests}</span>
        <PlusCircleIcon
          // onClick={() => setState(state + 1)}
          onClick={() => setNoOfGuests(noOfGuests + 1)}
          className="h-8 text-gray-300 active:scale-90 hover:text-gray-500 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Guests
