import { useState } from 'react'
import styles from './SearchItem.module.scss'
import { ISearchItem } from 'types/search.d'
import Modal from 'components/Modal'
import { useSetRecoilState } from 'recoil'
import { atomSearchItems } from 'recoil/search'
import { StarFullIcon, StarIcon } from 'assets/svgs'

interface IProps {
  item: ISearchItem
}

export default function SearchItem({ item }: IProps) {
  const setItems = useSetRecoilState(atomSearchItems)
  const [isOpen, setIsOpen] = useState(false)
  const handleClickOpen = () => setIsOpen(true)
  const handleClickClose = () => setIsOpen(false)
  const handleClickFavor = (imdbID: string) => () => {
    setItems((prev) => prev.map((data) => (data.imdbID === imdbID ? { ...data, isFavor: true } : data)))
    setIsOpen(false)
  }
  const handleClickNotFavor = (imdbID: string) => () => {
    setItems((prev) => prev.map((data) => (data.imdbID === imdbID ? { ...data, isFavor: false } : data)))
    setIsOpen(false)
  }

  return (
    <li className={styles.wrapper}>
      <button type='button' onClick={handleClickOpen}>
        <div className={styles.imgWrapper}>
          <img src={item.Poster} alt='movie_poster' />
        </div>
        <ul>
          <li>
            <dt>Title</dt>
            <dd>{item.Title}</dd>
          </li>
          <li>
            <dt>Year</dt>
            <dd>{item.Year}</dd>
          </li>
          <li>
            <dt>Type</dt>
            <dd>{item.Type}</dd>
          </li>
          <li className={styles.icon}>{item.isFavor ? <StarFullIcon /> : <StarIcon />}</li>
        </ul>
      </button>
      {isOpen && (
        <Modal>
          <div className={styles.modalContent}>
            {item.isFavor ? (
              <button type='button' onClick={handleClickNotFavor(item.imdbID)}>
                즐겨찾기 제거
              </button>
            ) : (
              <button type='button' onClick={handleClickFavor(item.imdbID)}>
                즐겨찾기
              </button>
            )}
            <button type='button' onClick={handleClickClose}>
              취소
            </button>
          </div>
        </Modal>
      )}
    </li>
  )
}
