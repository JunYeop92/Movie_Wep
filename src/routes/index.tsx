import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'
import Search from './Search'
import Favorites from './Favorites'
import BottomTabBar from 'components/common/BottomTabBar'

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='search' element={<Search />} />
          <Route path='favorites' element={<Favorites />} />
        </Routes>
        <footer>
          <BottomTabBar />
        </footer>
      </div>
    </div>
  )
}
