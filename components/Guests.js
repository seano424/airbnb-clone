import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'

function Guests({ header, description }) {
  const [state, setState] = useState(0)

  console.log(state)
  return (
    <div className="flex justify-between border-b py-2 select-none">
      <div>
        <h4 className="font-semibold">{header}</h4>
        <p className="font-light text-gray-500">{description}</p>
      </div>
      <div className="flex items-center space-x-3">
        <MinusCircleIcon
          onClick={() => setState(state > 0 ? state - 1 : 0)}
          className={`h-8 text-gray-300 active:scale-90 hover:text-gray-500 cursor-pointer ${
            state === 0 && 'text-gray-100 cursor-not-allowed'
          }`}
        />
        <span>{state}</span>
        <PlusCircleIcon
          onClick={() => setState(state + 1)}
          className="h-8 text-gray-300 active:scale-90 hover:text-gray-500 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Guests
