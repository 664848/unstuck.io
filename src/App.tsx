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
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
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
