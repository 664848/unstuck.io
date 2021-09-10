import { FunctionComponent } from 'react'
import { nameParser, dateParser } from '../utils/functions'

import IMessageTop from '../interfaces/MessageTop'

const MessageTop: FunctionComponent<IMessageTop> = ({ appendMention, author, uid, question, createdAt }) => {
  return (
    <div
      className={`w-full flex justify-start items-start space-x-1 sm:space-x-2 lg:space-x-4 text-gray-400 mb-1 lg:mb-1`}
    >
      <span
        className='text-emerald-400 cursor-pointer'
        onClick={() => appendMention({ id: uid, name: nameParser(author) })}
      >
        {author ? nameParser(author) : 'unknown'}
      </span>
      <span>•</span>
      <span>{dateParser(createdAt)}</span>
      {question && (
        <>
          <span>•</span>
          <span className='text-rose-400'>Question</span>
        </>
      )}
    </div>
  )
}

export default MessageTop
