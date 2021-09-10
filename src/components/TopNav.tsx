import { FunctionComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import TopNavHyperlink from '../components/TopNavHyperlink'
import LoginButton from '../components/LoginButton'

import IComp from '../interfaces/Component'

const TopNav: FunctionComponent<IComp & RouteComponentProps> = (props) => {
  return (
    <nav className='w-full h-20 flex justify-center items-center absolute top-0'>
      <div className='h-full w-24 flex justify-center items-center cursor-pointer'>
        <a href='/home'>
          <img src='logo.svg' alt='unstuck.io logo' width='80px' height='80px' />
        </a>
      </div>
      <div className='h-full w-full flex justify-end items-center space-x-4 md:space-x-7 text-sm md:text-base'>
        <TopNavHyperlink text='Home' href='/home' />
        <TopNavHyperlink text='Chat' href='/chat' />
        <TopNavHyperlink text='About' href='/about' />
        {!props.user && <LoginButton signIn={props.signIn} />}
      </div>
    </nav>
  )
}

export default withRouter(TopNav)
