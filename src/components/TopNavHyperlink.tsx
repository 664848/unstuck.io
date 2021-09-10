import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import IComp from '../interfaces/Component'

const TopNavHyperlink: FunctionComponent<IComp> = (props) => (
  <>
    {props.href ? (
      <Link
        to={props.href}
        className='font-comfortaa hover:text-lapislazuli transition-colors duration-100 ease-in-out'
      >
        {props.text}
      </Link>
    ) : (
      <></>
    )}
  </>
)

export default TopNavHyperlink
