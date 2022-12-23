<template>
  <n-layout class="global-layout">
    <n-layout-header :bordered="true">
      <t-header />
    </n-layout-header>
    <n-layout has-sider class="sider-content-layout">
      <n-layout-sider :width="160" :bordered="true">
        <sider />
      </n-layout-sider>
      <n-layout-content>
        <router-view v-slot="{ Component }">
          <transition name="scale-slide">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import THeader from './header/index.vue'
import Sider from './sider/index.vue'
</script>

<style scoped lang="less">
.global-layout {
  height: 100%;
  .n-layout-header {
    height: 70px;
    -webkit-app-region: drag;
    //-webkit-app-region: no-drag;
  }
  .sider-content-layout {
    height: calc(100% - 70px);

    .n-layout-sider {
      //background-color: #f6f7f8;
    }
  }
}
</style>
