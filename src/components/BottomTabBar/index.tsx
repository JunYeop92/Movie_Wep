import { NavLink } from 'react-router-dom'
import { cx } from 'styles'
import styles from './BottomTabBar.module.scss'

export default function BottomTabBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.active]: isActive })}>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to='favorites' className={({ isActive }) => cx({ [styles.active]: isActive })}>
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
