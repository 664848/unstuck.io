import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import IComp from '../interfaces/Component'

const FooterHyperlink: FunctionComponent<IComp> = ({ href, text }) => (
  <>
    {href ? (
      <Link
        className='text-xs sm:text-sm md:text-base font-comfortaa hover:text-lapislazuli transition-colors duration-100 ease-in-out'
        to={href}
      >
        {text}
      </Link>
    ) : (
      <></>
    )}
  </>
)

export default FooterHyperlink
