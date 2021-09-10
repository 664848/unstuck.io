import type { FunctionComponent } from 'react'

const PageNotFound: FunctionComponent = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-bg'>
      <div className='font-handlee flex flex-col space-y-3 text-center'>
        <h1 className='text-4xl text-red-400'>404</h1>
        <h2 className='text-3xl'>Page not found</h2>
      </div>
    </div>
  )
}

export default PageNotFound
