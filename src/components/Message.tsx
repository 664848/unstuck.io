import { FunctionComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import Mentions from './Mentions'
import Code from './Code'
import MessageUserAvatar from './MessageUserAvatar'
import MessageTop from './MessageTop'

import IMessage from '../interfaces/Message'

const Message: FunctionComponent<IMessage & RouteComponentProps> = ({
  text,
  uid,
  photoURL,
  createdAt,
  code,
  language,
  mentions,
  question,
  author,
  clientId,
  appendMention,
}) => {
  const iAmMentioned = mentions.map((mention) => mention.id).includes(clientId)

  return (
    <div className={` w-full px-1 sm:px-2 flex flex-col border-t pt-2 pb-4 text-xs sm:text-sm lg:text-base`}>
      {/* handle mentions */}
      {mentions.length > 0 ? <Mentions mentions={mentions} /> : <></>}

      {/* if user is mentioned, change the background */}

      <div
        className={`w-full h-full mt-1 sm:mt-2 flex rounded-md ${
          iAmMentioned ? 'bg-blue-400 bg-opacity-10' : ''
        }`}
      >
        <MessageUserAvatar photoURL={photoURL} appendMention={appendMention} author={author} uid={uid} />
        <div className={`w-full px-1 sm:px-3 py-1 overflow-auto`}>
          <MessageTop
            appendMention={appendMention}
            author={author}
            uid={uid}
            createdAt={createdAt}
            question={question}
          />
          {/* message itself */}
          <div className={`w-full flex justify-start items-start`}>
            <span className='whitespace-pre-line'>{text}</span>
          </div>
          {/* add code if any */}
          {code.length > 0 ? <Code code={code} language={language} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Message)
