import firebase from 'firebase/app'

export default interface IPage {
  name: string
  user: firebase.User
  signIn: () => void
  firestore: firebase.firestore.Firestore
}
