import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { atomFavorItems } from 'recoil/search'
import { favorStorage } from 'utils'
import List from 'components/List'

export default function FavorContent() {
  const [items, setItems] = useRecoilState(atomFavorItems)
  useEffect(() => {
    setItems(favorStorage.getItem('favorItems'))
  }, [setItems])

  return <List items={items} isFavorType />
}
