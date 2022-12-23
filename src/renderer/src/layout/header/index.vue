<template>
  <div class="header-wrapper">
    <div class="header-logo">
      <n-image :src="Logo" width="50" />
      <span>TOMATOX</span>
      <n-select
        v-model:value="videoSource"
        class="header-select"
        :options="[
          { label: '视频源1', value: '1' },
          { label: '视频源2', value: '2' }
        ]"
        :consistent-menu-width="false"
      />
      <n-select
        v-model:value="videoType"
        class="header-select"
        :options="[
          { label: '全部', value: '1' },
          { label: '电视剧', value: '2' },
          { label: '综艺', value: '3' }
        ]"
        :consistent-menu-width="false"
      />
    </div>
    <div class="header-option">
      <n-input :bordered="false" placeholder="搜索你感兴趣的视频">
        <template #suffix>
          <n-icon size="22" :component="SearchOutlined" style="cursor: pointer" />
        </template>
      </n-input>
      <n-thing>
        <n-icon :component="MinusOutlined" size="22" @click="sendDirective('WINDOW_MIN')" />
        <n-icon
          v-if="isWindowMax"
          :component="FullscreenExitOutlined"
          size="22"
          @click="sendDirective('WINDOW_MAX')"
        />
        <n-icon
          v-else
          :component="FullscreenOutlined"
          size="22"
          @click="sendDirective('WINDOW_MAX')"
        />
        <n-icon :component="CloseOutlined" size="22" @click="sendDirective('WINDOW_CLOSE')" />
      </n-thing>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@renderer/assets/icons/icon.svg'
import {
  SearchOutlined,
  MinusOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  CloseOutlined
} from '@vicons/antd'
import { ref } from 'vue'

const isWindowMax = ref(false)
const videoSource = ref('1')
const videoType = ref('1')

function sendDirective(directive: string) {
  if (directive === 'WINDOW_MAX') {
    isWindowMax.value = !isWindowMax.value
  }
  window.electron.ipcRenderer.send(directive)
}
</script>

<style lang="less" scoped>
.header-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .header-logo {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 20px;
    span {
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
      margin-left: 5px;
      margin-right: 40px;
    }
    .header-select {
      margin-left: 20px;
      -webkit-app-region: no-drag;
      max-width: 250px;
    }
  }
  .header-option {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    .n-input {
      border-radius: 4px;
      -webkit-app-region: no-drag;
      width: 300px;
      height: 35px;
      background-color: rgba(#ccc, 0.2);
    }
    .n-thing {
      margin-left: 40px;
      padding-top: 5px;
      .n-icon {
        -webkit-app-region: no-drag;
        margin-right: 15px;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          background-color: rgba(#ccc, 0.4);
        }
      }
    }
  }
}
</style>
