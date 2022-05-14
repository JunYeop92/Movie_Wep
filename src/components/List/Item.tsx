import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { searchItemsAtom, favorItemsAtom } from 'recoil/search'
import { ISearchItem } from 'types/search.d'

import styles from './Item.module.scss'
import { StarFullIcon, StarIcon } from 'assets/svgs'
import Modal from 'components/Modal'
import { favorStorage } from 'utils'

interface IProps {
  item: ISearchItem
  isFavorType?: boolean
}

export default function Item({ item, isFavorType = false }: IProps) {
  const setItems = useSetRecoilState(searchItemsAtom)
  const setFavorItems = useSetRecoilState(favorItemsAtom)
  const [isOpen, setIsOpen] = useState(false)
  const handleClickOpen = () => setIsOpen(true)
  const handleClickClose = () => setIsOpen(false)

  const handleClickFavor = () => {
    const localDatas = favorStorage.getItem('favorItems')
    favorStorage.setItem('favorItems', [...localDatas, { ...item, isFavor: true }])

    setItems((prev) => prev.map((data) => (data.imdbID === item.imdbID ? { ...data, isFavor: true } : data)))
    setIsOpen(false)
  }
  const handleClickNotFavor = () => {
    const localDatas = favorStorage.getItem('favorItems')
    favorStorage.setItem(
      'favorItems',
      localDatas.filter((data: ISearchItem) => data.imdbID !== item.imdbID)
    )
    if (isFavorType) setFavorItems((prev) => prev.filter((data) => data.imdbID !== item.imdbID))
    else setItems((prev) => prev.map((data) => (data.imdbID === item.imdbID ? { ...data, isFavor: false } : data)))
    setIsOpen(false)
  }

  return (
    <li className={styles.wrapper}>
      <button type='button' onClick={handleClickOpen}>
        <div className={styles.imgWrapper}>
          <img src={item.Poster} alt='movie_poster' />
        </div>
        <ul className={styles.infoList}>
          <li className={styles.title}>{item.Title}</li>
          <li className={styles.info}>
            <span>{item.Year}</span>
            <span>/</span>
            <span>{item.Type}</span>
          </li>
          <li className={styles.icon}>{item.isFavor && <StarFullIcon fill='currentColor' />}</li>
        </ul>
      </button>
      {isOpen && (
        <Modal>
          <div className={styles.modalContent}>
            {item.isFavor ? (
              <button type='button' onClick={handleClickNotFavor}>
                Delete Favorites
              </button>
            ) : (
              <button type='button' onClick={handleClickFavor}>
                Favorites
              </button>
            )}
            <button type='button' onClick={handleClickClose}>
              Cancle
            </button>
          </div>
        </Modal>
      )}
    </li>
  )
}
