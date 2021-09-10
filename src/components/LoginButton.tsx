import { FunctionComponent } from 'react'
import IComp from '../interfaces/Component'

const LoginButton: FunctionComponent<IComp> = (props) => {
  return (
    <button
      onClick={props.signIn}
      className='text-xl px-2 py-1 md:text-2xl md:px-4 md:py-2 bg-emerald-600 font-catamaran rounded-full hover:bg-emerald-700 transition-colors duration-150 ease-in-out'
    >
      Login
    </button>
  )
}

export default LoginButton
