import { FunctionComponent, useEffect, useRef, Key } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import KUTE from 'kute.js'
import IPage from '../interfaces/Page'

import Footer from '../components/Footer'
import TopNav from '../components/TopNav'
import ScrollToTopButton from '../components/ScrollToTopButton'
import BlueTopWave from '../components/BlueTopWave'
import BlueBottomWave from '../components/BlueBottomWave'
import EmeraldBottomLine from '../components/EmeraldBottomLine'
import EmeraldTopLine from '../components/EmeraldTopLine'

import { technologies } from './data'

const HomePage: FunctionComponent<IPage & RouteComponentProps> = ({ user, signIn }) => {
  const description = useRef<HTMLSpanElement>(null)
  const topSection = useRef<HTMLDivElement>(null)
  const featuresSection = useRef<HTMLDivElement>(null)

  const onStartHeaderHandler = () => {
    setTimeout(() => {
      KUTE.to(description.current, { text: 'Get yourself unstuck with your code!' }).start()
    }, 500)
    return
  }

  useEffect(() => onStartHeaderHandler(), [])

  const scrollToFeatures = () => {
    if (featuresSection.current)
      featuresSection.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }

  return (
    <div>
      <ScrollToTopButton scrollTo={topSection.current ? topSection.current : undefined} />
      <section className='bg-bg h-screen px-6 md:px-12 lg:px-24 py-5' ref={topSection}>
        <div className='relative flex justify-center items-center h-full'>
          <TopNav user={user} signIn={signIn} text='elo' />
          <main className='h-2/3'>
            <article className='flex justify-center flex-col items-center h-full space-y-6'>
              <h1 className='text-4xl md:text-6xl font-comfortaa text-emerald-400'>unstuck.io</h1>
              <span className='text-md md:text-3xl font-thin text-center' ref={description}></span>
              <div className='flex justify-center items-center space-x-6 font-comfortaa'>
                <Link
                  className='px-3 pt-2 pb-1 text-xl md:px-5 md:pt-3 md:pb-2 md:text-3xl xl:px-6 xl:pt-3 xl:pb-2 xl:text-3xl bg-emerald-600  rounded-xl hover:bg-emerald-700 transition-colors duration-150 ease-in-out'
                  to='/chat'
                >
                  Chat
                </Link>
                <button
                  className='px-3 pt-2 pb-1 text-xl md:px-5 md:pt-3 md:pb-2 md:text-3xl xl:px-6 xl:pt-3 xl:pb-2 xl:text-3xl bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors duration-150 ease-in-out'
                  onClick={scrollToFeatures}
                >
                  Discover
                </button>
              </div>
            </article>
          </main>
        </div>
        <BlueTopWave />
      </section>
      <div className='bg-lapislazuli h-10 md:h-44 w-full'></div>
      <section ref={featuresSection} className='bg-bg h-screen px-16 py-5 relative flex justify-center'>
        <article className='flex justify-center items-center flex-col h-full py-4 px-4 md:py-28 md:px-28 w-5/6'>
          <div className='w-full text-center space-y-8'>
            <h2 className='text-4xl'>What exactly is unstuck.io?</h2>
            <p className='text-sm sm:text-base md:text-lg lg:text-xl'>
              <span className='text-emerald-500'>Unstuck.io</span> is a communication platform for web
              developers, those who need help and those who can provide it. Help others, gain points and never
              stop learning. Join our community and start improving the web today!
            </p>
          </div>
          <div className='w-full flex items-center justify-center space-x-3 md:space-x-7 lg:space-x-8 h-10 md:h-32 relative top-5'>
            {technologies.map((tech: any, index: Key) => (
              <img
                key={index}
                src={`logos/${tech}.svg`}
                width='56px'
                height='56px'
                alt={`${tech} logo`}
                className='w-5 h-5 md:w-8 md:h-8 lg:w-14 lg:h-14'
              />
            ))}
          </div>
        </article>
        <BlueBottomWave />
        <EmeraldTopLine />
      </section>
      <div className='bg-emerald-500 h-44 w-full'></div>
      <section className='bg-bg h-80 px-16 py-5 relative flex items-end'>
        <EmeraldBottomLine />
        <Footer />
      </section>
    </div>
  )
}

export default withRouter(HomePage)
