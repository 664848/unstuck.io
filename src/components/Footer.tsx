import { FunctionComponent } from 'react'
import FooterHyperlink from './FooterHyperlink'
import IComp from '../interfaces/Component'

const Footer: FunctionComponent<IComp> = () => (
  <footer className='w-full h-28 flex justify-center items-center space-x-5 sm:space-x-6 md:space-x-20 '>
    <FooterHyperlink text={'Terms of Service'} href={'tos'} />
    <FooterHyperlink text={'Privacy Policy'} href={'privacy'} />
    <FooterHyperlink text={'About'} href={'about'} />
    <FooterHyperlink text={'FAQ'} href={'faq'} />
  </footer>
)

export default Footer
