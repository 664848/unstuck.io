import { FunctionComponent, useEffect } from 'react'
import { BrowserRouter, Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import { useAuthState } from 'react-firebase-hooks/auth'

import PageNotFound from './components/PageNotFound'

import routes from './config/routes'

firebase.initializeApp({
  apiKey: 'AIzaSyDcQ8vdJxqbKCWbsD7NM3HoRx8YQ3UhXP0',
  authDomain: 'unstuckio.firebaseapp.com',
  projectId: 'unstuckio',
  storageBucket: 'unstuckio.appspot.com',
  messagingSenderId: '648167466748',
  appId: '1:648167466748:web:02857bbb352761f2015979',
  measurementId: 'G-PVX8ET9Z3G',
})

const auth = firebase.auth()
const firestore = firebase.firestore()
// const analytics = firebase.analytics()

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider)
}

const App: FunctionComponent = (props) => {
  useEffect(() => {}, [])

  const [user] = useAuthState(auth)

  return (
    <div>
      <BrowserRouter>
        <Route path='/' exact render={() => <Redirect to='/home' />}></Route>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <>
                    <route.component
                      name={route.name}
                      {...props}
                      {...route.props}
                      user={user}
                      signIn={signIn}
                      firestore={firestore}
                    />
                  </>
                )}
              />
            )
          })}
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
