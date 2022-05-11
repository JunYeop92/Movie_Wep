import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import Search from './Search'
import Favorites from './Favorites'
import BottomTabBar from 'components/common/BottomTabBar'

export default function App() {
  return (
    <div className={styles.app}>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='favorites' element={<Favorites />} />
        </Routes>
        <footer>
          <BottomTabBar />
        </footer>
      </Suspense>
    </div>
  )
}
