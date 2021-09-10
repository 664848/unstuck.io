import firebase from 'firebase'
import IMention from './Mention'
import ILanguageChange from './LanguageChange'

export default interface IMessage {
  uid: string
  text: string
  photoURL: string
  createdAt: firebase.firestore.Timestamp | null
  author: string
  code: string
  language: ILanguageChange
  mentions: IMention[]
  question: boolean
  appendMention: (mention: IMention) => void
  clientId: string
}
