import { FunctionComponent } from 'react'
import IComp from '../interfaces/Component'

import Loading from './Loading'
import LoginButton from './LoginButton'

const NoAuth: FunctionComponent<IComp> = (props) => {
  return (
    <main className='w-full h-screen bg-bg flex justify-center items-center flex-col space-y-10'>
      <h1 className='font-comfortaa text-4xl flex items-center justify-center space-x-4'>
        <LoginButton signIn={props.signIn} />
        <span> to access this page</span>
      </h1>
      <Loading />
    </main>
  )
}

export default NoAuth
