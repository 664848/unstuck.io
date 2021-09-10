import IRoute from '../interfaces/route'
import ChatPage from '../pages/chat'
import HomePage from '../pages/home'
import ToSPage from '../pages/tos'
import AboutPage from '../pages/about'
import FAQPage from '../pages/faq'
import PrivacyPage from '../pages/privacy'

const routes: IRoute[] = [
  {
    path: '/home',
    name: 'Home Page',
    component: HomePage,
    exact: true,
  },
  {
    path: '/chat',
    name: 'Chat Page',
    component: ChatPage,
    exact: true,
  },
  {
    path: '/chat/:tech',
    name: 'Chat Page',
    component: ChatPage,
    exact: true,
  },
  {
    path: '/tos',
    name: 'Terms of Service',
    component: ToSPage,
    exact: true,
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    component: PrivacyPage,
    exact: true,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    exact: true,
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQPage,
    exact: true,
  },
]

export default routes
