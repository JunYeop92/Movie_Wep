import Logo from './Logo'
import styles from './Search.module.scss'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'

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
