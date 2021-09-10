import type { FunctionComponent } from 'react'

const FakePage: FunctionComponent = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-bg'>
      <div className='font-handlee flex flex-col space-y-3 text-center'>
        <h1 className='text-xl md:text-4xl'>
          This page does <span className='text-red-400'>not</span> actually exist 🛑
        </h1>
        <h2 className='text-3xl'>how come?</h2>
        <h3 className='text-lg md:text-2xl'>
          • <span className='text-emerald-400'>unstuck.io</span> is nothing but a showcase project - there's
          no need to do anything here 🐵
        </h3>
      </div>
    </div>
  )
}

export default FakePage
