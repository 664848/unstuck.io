import dayjs from 'dayjs'

export const nameParser = (fullName: string) =>
  fullName
    .split(' ')
    .map((name, index) => {
      if (index === 0) return name
      else return name.charAt(0) + '.'
    })
    .join(' ')

export const dateParser = (createdAt: any) =>
  createdAt ? dayjs(createdAt.toDate()).format('HH:mm DD/MM/YYYY') : 'Now'
