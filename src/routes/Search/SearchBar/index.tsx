import { FormEvent, ChangeEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { searchInputAtom, isInitSearchAtom } from 'recoil/search'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const setSearchInput = useSetRecoilState(searchInputAtom)
  const setIsInitSearch = useSetRecoilState(isInitSearchAtom)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchInput(value)
    setIsInitSearch(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <input type='search' value={value} onChange={handleChange} />
      <button type='submit'>검색</button>
    </form>
  )
}
