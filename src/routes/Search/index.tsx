import Logo from './Logo'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import styles from './Search.module.scss'

export default function Search() {
  return (
    <>
      <header className={styles.header}>
        <Logo />
        <SearchBar />
      </header>
      <main className={styles.main}>
        <SearchResult />
      </main>
    </>
  )
}
