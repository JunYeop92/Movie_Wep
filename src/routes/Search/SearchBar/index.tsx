import { useState } from 'react'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  const [value, setValue] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <input type='search' value={value} onChange={handleChange} />
      <button type='submit'>검색</button>
    </form>
  )
}
