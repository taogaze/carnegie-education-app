<template>
  <div id="app">
    <div class="container">
      <div class="content-wrapper">
        <!-- 路由视图 - 显示当前页面内容 -->
        <router-view />
      </div>
      <!-- 底部标签栏组件 -->
      <TabBar />
    </div>
  </div>
</template>

<script>
import TabBar from './components/TabBar.vue'

export default {
  name: 'App',
  components: {
    TabBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F8F8F9;
  height: 100%;
  /* 让页面内容延伸到状态栏区域 */
  padding-top: 0;
  margin-top: 0;
}

/* iOS设备状态栏处理 */
@supports (padding-top: env(safe-area-inset-top)) {
  body {
    padding-top: env(safe-area-inset-top);
  }
}

#app {
  min-height: 100vh;
  /* 在iOS设备上，让内容延伸到状态栏 */
  min-height: calc(100vh - env(safe-area-inset-top));
  display: flex;
  flex-direction: column;
  /* 让app从屏幕顶部开始 */
  margin-top: calc(-1 * env(safe-area-inset-top));
  padding-top: env(safe-area-inset-top);
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content-wrapper {
  flex: 1;
  overflow-x: hidden; /* 防止水平滚动 */
  display: flex;
  flex-direction: column;
}
</style>