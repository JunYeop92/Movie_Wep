import FavorContent from './FavorContent'
import styles from './Favorites.module.scss'

export default function Favorites() {
  return (
    <>
      <header className={styles.header}>
        <span className={styles.title}>My Favorites</span>
      </header>
      <main className={styles.main}>
        <FavorContent />
      </main>
    </>
  )
}
