import { defineStore } from 'pinia'

const useGlobalSettingStore = defineStore('global-setting', {
  state: () => ({ theme: 'light' }),
  getters: {
    curTheme: (state) => state.theme
  },
  actions: {
    setTheme(newTheme: string) {
      this.theme = newTheme
    }
  }
})

export default useGlobalSettingStore
