import resso from 'resso'

const store = resso<{ theme: 'dark' | 'light' }>({
  theme: 'light'
})

export default store
