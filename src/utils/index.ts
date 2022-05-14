export const favorStorage = {
  getItem: (key: string) => {
    const value = localStorage.getItem(key)
    if (!value) return []

    return JSON.parse(value)
  },
  setItem: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
}
