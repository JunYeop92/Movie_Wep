import { FormEvent, ChangeEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { searchState } from 'recoil/search'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const setSearchVal = useSetRecoilState(searchState)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchVal(value)
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
