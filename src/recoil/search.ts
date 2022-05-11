import { atom } from 'recoil'

export const searchInput = atom({
  key: 'searchInput',
  default: '',
})

export const isInitSearch = atom({
  key: 'isInitSearch',
  default: false,
})
