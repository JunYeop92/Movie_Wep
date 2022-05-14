import _ from 'lodash'

export const favorStorage = {
  getItem: (key: string) => {
    const value = localStorage.getItem(key)
    if (!value) return []

    return JSON.parse(value)
  },
  setItem: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
}

export const getOverlapCount = (arr: any[], key: string) => {
  const groupBy = _.groupBy(arr, (item) => item[key])

  const overlapCount = _.reduce(
    groupBy,
    (acc, group) => {
      if (group.length > 2) {
        return acc + group.length - 1
      }
      return acc
    },
    0
  )
  return overlapCount
}
