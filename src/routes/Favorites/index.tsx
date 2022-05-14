import FavorContent from './FavorContent'
import styles from './Favorites.module.scss'

export default function Favorites() {
  return (
    <>
      <header className={styles.header}>내 즐겨찾기</header>
      <main className={styles.main}>
        <FavorContent />
      </main>
    </>
  )
}
