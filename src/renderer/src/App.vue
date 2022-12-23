<template>
  <n-config-provider
    style="width: 100%; height: 100%"
    :theme="globalSettingStore.theme === 'dark' ? darkTheme : ''"
    :theme-overrides="themeConfig"
  >
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import useGlobalSettingStore from './store'
import { reactive } from 'vue'

const globalSettingStore = useGlobalSettingStore()

const themeConfig = reactive<GlobalThemeOverrides>({
  common: {
    // primaryColor: '#2b8cf7'
  }
})
</script>

<style lang="less">
@import './assets/css/styles.less';
</style>
