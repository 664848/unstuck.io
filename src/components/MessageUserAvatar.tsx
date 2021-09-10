import { FunctionComponent } from 'react'

import IMessageUserAvatar from '../interfaces/MessageUserAvatar'

import { nameParser } from '../utils/functions'

const Code: FunctionComponent<IMessageUserAvatar> = ({ photoURL, uid, author, appendMention }) => {
  return (
    <div
      className={`mt-1 h-full w-10 px-1 py-1 lg:px-2 lg:py-2 lg:w-16 flex justify-start cursor-pointer`}
      onClick={() => appendMention({ id: uid, name: nameParser(author) })}
    >
      <img src={photoURL} alt='user avatar' className='rounded-full w-7 h-7 lg:w-10 lg:h-10' />
    </div>
  )
}

export default Code
