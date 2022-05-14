import { FormEvent, ChangeEvent, useState, useRef, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { searchInputAtom, isInitSearchAtom } from 'recoil/search'
import styles from './SearchBar.module.scss'
import { SearchIcon } from 'assets/svgs'

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const setSearchInput = useSetRecoilState(searchInputAtom)
  const setIsInitSearch = useSetRecoilState(isInitSearchAtom)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

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
      <input type='search' placeholder='Search Movie' ref={inputRef} value={value} onChange={handleChange} />
      <button type='submit'>
        <SearchIcon fill='currentColor' />
      </button>
    </form>
  )
}
