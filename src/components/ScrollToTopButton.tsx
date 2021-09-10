import { FunctionComponent } from 'react'
import IComp from '../interfaces/Component'

const ScrollToTopButton: FunctionComponent<IComp> = ({ scrollTo }) => {
  const scroll = () => scrollTo?.scrollIntoView({ behavior: 'smooth' })

  return (
    <button
      onClick={scroll}
      className='fixed bottom-4 right-4 bg-teal-500 z-50 px-2 py-1 rounded-full text-2xl shadow-2xl'
    >
      <span>🡩</span>
    </button>
  )
}

export default ScrollToTopButton
