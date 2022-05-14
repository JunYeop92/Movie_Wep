import { atom, selectorFamily } from 'recoil'
import { fetchSearchData } from 'services/search'
import { ISearchItem, ISearchParams } from 'types/search'

export const searchInputAtom = atom({
  key: 'searchInputAtom',
  default: '',
})

export const isInitSearchAtom = atom({
  key: 'isInitSearchAtom',
  default: false,
})

export const searchItemsAtom = atom<ISearchItem[]>({
  key: 'searchItemsAtom',
  default: [],
})

export const favorItemsAtom = atom<ISearchItem[]>({
  key: 'favorItemsAtom',
  default: [],
})

type SelectorMapper<Type> = {
  [Property in keyof Type]: Type[Property]
}

export const asyncSearchSelector = selectorFamily({
  key: 'asyncSearchSelector',
  get: (param: SelectorMapper<ISearchParams>) => async () => {
    return fetchSearchData(param.s, param.page)
  },
})
