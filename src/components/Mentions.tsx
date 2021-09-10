import { FunctionComponent, Key } from 'react'

import IMentions from '../interfaces/Mentions'

const Mentions: FunctionComponent<IMentions> = ({ mentions }) => {
  return (
    <div>
      <div className='w-full h-6 flex items-center py-1 px-1 space-x-2'>
        {mentions.map((mention, index: Key) => (
          <span
            className='text-sm font-bold md:text-base text-blue-600 bg-blue-300 bg-opacity-60 cursor-pointer rounded-md px-1'
            key={index}
          >
            @{mention.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Mentions
