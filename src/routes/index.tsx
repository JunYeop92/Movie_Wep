import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'
import BottomTabBar from 'components/common/BottomTabBar'
import Search from './Search'
import Favorites from './Favorites'

export default function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
      <footer>
        <BottomTabBar />
      </footer>
    </div>
  )
}
