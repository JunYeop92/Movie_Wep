import styles from './BottomTabBar.module.scss'

export default function BottomTabBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>Search</li>
        <li>Favorites</li>
      </ul>
    </nav>
  )
}
