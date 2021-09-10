import { FunctionComponent, useRef, useEffect, Key, useState, UIEvent, Fragment, KeyboardEvent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import Editor from 'react-simple-code-editor'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import IMention from '../interfaces/Mention'
import IPage from '../interfaces/Page'
import ILanguageChange from '../interfaces/LanguageChange'

import Message from '../components/Message'
import NoAuth from '../components/NoAuth'

import { technologies, languages } from './data'

const options = languages.map((lang) => ({
  value: lang,
  label: lang.toUpperCase(),
}))

const ChatPage: FunctionComponent<IPage & RouteComponentProps> = ({
  user,
  signIn,
  match: { params },
  firestore,
}) => {
  const [messages, setMessages] = useState<firebase.firestore.DocumentData[]>([])

  const [questionMsg, setQuestionMsg] = useState<boolean>(false)
  const [embedCode, setEmbedCode] = useState<boolean>(false)
  const [showCodePopup, setShowCodePopup] = useState<boolean>(false)

  const [mentions, setMentions] = useState<IMention[]>([])

  const [code, setCode] = useState<string>('')
  const [language, setLanguage] = useState<ILanguageChange>({ value: 'javascript', label: 'JAVASCRIPT' })

  // references

  const textBox = useRef<HTMLTextAreaElement>(null)
  const scrollTo = useRef<HTMLDivElement>(null)
  const loadMore = useRef<HTMLDivElement>(null)
  const chatBox = useRef<HTMLDivElement>(null)

  // @ts-ignore
  const tech = params.tech || 'general'

  // auto-load more messages when its scrolled to the very top

  // const isScrolledIntoView = (e: UIEvent<HTMLElement>) => {
  //   if (e.currentTarget.scrollTop === 0) {
  //     console.log('Scrolled to the top')
  //   }
  // }

  useEffect(() => {
    if (firestore) {
      const unsubscribe = firestore
        .collection(tech)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          if (snapshot.metadata.hasPendingWrites) return

          const data = snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            .reverse()
          setMessages(data)
          if (scrollTo.current) scrollTo.current.scrollIntoView()
        })

      return unsubscribe
    }
  }, [firestore, tech])

  // handle unauthorized users
  if (!user) return <NoAuth signIn={signIn} />

  const scrollChatBoxToBottom = (e: UIEvent<HTMLElement>) => {
    if (scrollTo.current)
      scrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }

  // post the message when enter is pressed

  const handleKeyPress: (e: React.KeyboardEvent<HTMLElement>) => void = async (e) => {
    const messagesRef = firestore.collection(tech)

    // if the key pressed isnt enter then return
    // if enter is pressed && shift key is pressed then return

    if (e.key !== 'Enter') return
    if (e.key === 'Enter' && e.shiftKey) return
    e.preventDefault()

    if (!textBox.current) return
    let { value } = textBox.current
    value = value.trim()

    if (!value || value.length === 0) return

    textBox.current.value = ''

    const { uid, photoURL, displayName } = user

    await messagesRef.add({
      text: value,
      uid,
      photoURL,
      mentions,
      code: embedCode ? code : '',
      language: embedCode ? language : '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      author: displayName,
      question: questionMsg,
    })

    setCode('')
    setMentions([])
    setQuestionMsg(false)

    if (scrollTo.current) scrollTo.current.scrollIntoView()
  }

  const highlight = (code: string) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={language.value}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  )

  const appendMention = ({ id, name }: IMention) => {
    if (id === user.uid || mentions.length > 3) return
    if (!mentions.some((mention) => mention.id === id)) setMentions((m) => [...m, { id, name }])
  }

  const removeMention = (id: string) => {
    const mentionsFixed = mentions.filter((mention) => mention.id !== id)
    setMentions(mentionsFixed)
  }

  const adjustHeight = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value.length) e.currentTarget.style.height = '60px'
    else e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'
  }

  return (
    <main className={`bg-bg h-screen`}>
      {showCodePopup && (
        <>
          <div className={`flex justify-center items-center absolute top-0 left-0 right-0 bottom-0`}>
            <div className='justify-evenly items-center flex-col w-4/5 border-2 bg-gray-800 opacity-100 relative'>
              <div className='w-full h-12 border-b-2'>
                <div className='text-black flex h-full items-center px-1'>
                  <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={(lang) => {
                      if (lang) setLanguage({ value: lang.value, label: lang.label })
                    }}
                    className='w-full mr-2'
                  />
                  <button className='mr-1' onClick={() => setShowCodePopup(false)}>
                    ❌
                  </button>
                </div>
              </div>
              <Editor
                placeholder='Type your code here...'
                value={code}
                onValueChange={(v) => setCode(v)}
                highlight={highlight}
                padding={10}
                maxLength={700}
                className='text-xs md:text-base max-h-screen'
              />
            </div>
          </div>
        </>
      )}
      <div className='flex h-full border-2'>
        <div className='w-12 sm:w-16 xl:w-60 border-r-2 border-white h-full bg-trueGray-900 '>
          <div className='w-full h-3'></div>
          <Link
            to={`/chat`}
            className={`flex justify-center items-center py-2 px-3 cursor-pointer mb-1 hover:bg-black duration-150 ease-in-out transition-colors ${
              tech === 'general' ? 'bg-black' : ''
            }`}
          >
            <div className='w-8 flex justify-center h-full'>
              <img
                src={`/logos/general.svg`}
                alt={'general chat icon'}
                width='24px'
                height='24px'
                className='w-6 h-6 md:w-8 md:h-8'
              />
            </div>
            <div className='w-full font-thin items-center pl-3  hidden xl:flex'>
              <span>GENERAL</span>
            </div>
          </Link>
          {technologies.map((technology, index: Key) => {
            let extraClass = ''
            if (tech === technology) extraClass = 'bg-black'

            return (
              <Link
                to={`/chat/${technology}`}
                className={`flex justify-center items-center py-2 px-1 sm:py-2 sm:px-3 cursor-pointer mb-1 hover:bg-black duration-150 ease-in-out transition-colors ${extraClass}`}
                key={index}
              >
                <div className='w-6 sm:w-8 flex justify-center h-full'>
                  <img
                    src={`/logos/${technology}.svg`}
                    alt={`${technology} logo`}
                    width='24px'
                    height='24px'
                    className='w-6 h-6 md:w-8 md:h-8'
                  />
                </div>
                <div className='w-full font-thin items-center pl-3 hidden xl:flex'>
                  <span>{technology.toUpperCase()}</span>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='messagesContainer h-full bg-trueGray-900 flex flex-col'>
          <div
            className='h-full pl-1 pr-2 lg:px-8 overflow-y-auto overflow-x-auto secondLastMessage'
            ref={chatBox}
          >
            <p className='w-full h-1' ref={loadMore}></p>
            {messages &&
              messages.map(
                (
                  { uid, text, createdAt, photoURL, author, code, language, mentions, question },
                  index: Key,
                ) => {
                  if (!uid) return <></>
                  return (
                    <Message
                      key={index}
                      text={text}
                      createdAt={createdAt}
                      photoURL={photoURL}
                      code={code}
                      language={language}
                      mentions={mentions}
                      question={question}
                      uid={uid}
                      author={author}
                      clientId={user.uid}
                      appendMention={appendMention}
                    />
                  )
                },
              )}
            <p ref={scrollTo}></p>
          </div>
          <div className='border-t-2 border-gray-50 pb-2 px-2 flex items-center'>
            <div className='w-full h-full flex flex-col pr-2'>
              {mentions.length > 0 ? (
                <div className='w-full h-7 border-b-2 flex items-center py-1 space-x-2'>
                  {mentions.map((mention, index: Key) => (
                    <button
                      onClick={() => removeMention(mention.id)}
                      className='font-bold text-blue-600 bg-blue-300 bg-opacity-60 cursor-pointer rounded-md px-1'
                      key={index}
                    >
                      @{mention.name}
                    </button>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <textarea
                className='w-full h-16 overflow-hidden bg-trueGray-900 appearance-none border-none py-3 px-4 outline-none resize-none'
                name='message'
                id='message'
                placeholder={`Message ${tech}`}
                onKeyPress={handleKeyPress}
                ref={textBox}
                maxLength={700}
                onKeyUp={adjustHeight}
              ></textarea>
              {embedCode && (
                <div className='w-full h-7 border-t-2'>
                  <span className='cursor-pointer text-emerald-400' onClick={() => setShowCodePopup(true)}>
                    Open code editor
                  </span>
                </div>
              )}
            </div>
            <div className='w-36 lg:w-48 h-full border-l border-white flex justify-center items-center space-x-1'>
              <button
                className='w-7'
                title='Mark this message as a question'
                onClick={() => setQuestionMsg((prevValue) => !prevValue)}
              >
                {questionMsg ? '❔' : '🔷'}
              </button>
              <button
                className={`w-7 font-handlee ${embedCode ? 'text-green-500' : 'text-white'}`}
                title='Check if you want to embed code in your message'
                onClick={() => setEmbedCode((prevValue) => !prevValue)}
              >
                {'</>'}
              </button>
              <button
                className='w-7 hover:text-blue-400 transition-colors duration-150 ease-in-out'
                title='Jump to the bottom'
                onClick={scrollChatBoxToBottom}
              >
                🡫
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default withRouter(ChatPage)

// add responsiveness
