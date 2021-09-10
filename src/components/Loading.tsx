import { FunctionComponent } from 'react'
import IComp from '../interfaces/Component'

const Loading: FunctionComponent<IComp> = () => {
  return <img src={'/loading.svg'} width='100px' height='100px' alt='Loading animation' />
}

export default Loading
