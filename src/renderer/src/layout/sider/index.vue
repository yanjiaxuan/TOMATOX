<template>
  <n-menu :options="menuOptions" :value="route.path"></n-menu>
</template>

<script lang="ts" setup>
import { MenuOption, NIcon } from 'naive-ui'
import {
  FireOutlined,
  PlayCircleOutlined,
  HeartOutlined,
  HistoryOutlined,
  SettingOutlined,
  StarOutlined
} from '@vicons/antd'
import { Component, h } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/recommend' }, { default: () => '推荐' }),
    key: '/recommend',
    icon: renderIcon(FireOutlined)
  },
  {
    label: () => h(RouterLink, { to: '/iptv' }, { default: () => '直播' }),
    key: '/iptv',
    icon: renderIcon(PlayCircleOutlined)
  },
  {
    label: () => h(RouterLink, { to: '/collect' }, { default: () => '收藏' }),
    key: '/collect',
    icon: renderIcon(HeartOutlined)
  },
  {
    label: () => h(RouterLink, { to: '/history' }, { default: () => '历史' }),
    key: '/history',
    icon: renderIcon(HistoryOutlined)
  },
  {
    label: () => h(RouterLink, { to: '/setting' }, { default: () => '设置' }),
    key: '/setting',
    icon: renderIcon(SettingOutlined)
  },
  {
    label: () => h(RouterLink, { to: '/about' }, { default: () => '关于' }),
    key: '/about',
    icon: renderIcon(StarOutlined)
  }
]
</script>
