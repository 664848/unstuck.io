export default interface IComp {
  name?: string
  text?: string
  href?: string
  scrollTo?: HTMLDivElement
  user?: object | null
  signIn?: () => void
}
