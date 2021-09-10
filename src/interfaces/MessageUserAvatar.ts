import IMention from './Mention'

export default interface Code {
  photoURL: string
  appendMention: (mention: IMention) => void
  author: string
  uid: string
}
