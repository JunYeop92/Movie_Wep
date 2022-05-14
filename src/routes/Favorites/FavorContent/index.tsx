import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { favorItemsAtom } from 'recoil/search'
import { favorStorage } from 'utils'
import List from 'components/List'

export default function FavorContent() {
  const [items, setItems] = useRecoilState(favorItemsAtom)
  useEffect(() => {
    setItems(favorStorage.getItem('favorItems'))
  }, [setItems])

  return <List items={items} isFavorType />
}
