import firebase from 'firebase'
import IMention from './Mention'

export default interface Code {
  question: boolean
  author: string
  uid: string
  createdAt: firebase.firestore.Timestamp | null
  appendMention: (mention: IMention) => void
}
