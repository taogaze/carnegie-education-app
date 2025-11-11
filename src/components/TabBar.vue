<template>
  <div class="tab-bar">
    <div 
      v-for="tab in tabs" 
      :key="tab.id"
      class="tab-item"
      :class="{ active: activeTab === tab.id }"
      @click="switchTab(tab.id)"
    >
      <div class="tab-content">
        <svg class="tab-icon" width="24" height="24" :viewBox="tab.viewBox || '0 0 24 24'" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 单个path的情况 -->
          <path v-if="tab.iconPath" :d="tab.iconPath" :fill="activeTab === tab.id ? '#1A1A1A' : '#DBDBDB'" />
          <!-- 多个paths的情况 -->
          <path v-else v-for="(path, index) in tab.iconPaths" :key="index" :d="path" :fill="activeTab === tab.id ? '#1A1A1A' : '#DBDBDB'" />
        </svg>
        <span class="tab-label">{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      tabs: [
        {
          id: 1,
          label: '关于卡内基',
          route: '/',
          iconPath: 'M156.248 99.9965C156.248 89.6189 164.644 81.2122 175 81.2122V24.8381H174.027C136.707 24.8381 105.759 52.1633 100 87.9305C94.2335 52.1633 63.286 24.8381 25.9658 24.8381H25V81.2122C35.3558 81.2122 43.7447 89.6189 43.7447 99.9965C43.7447 110.381 35.3558 118.788 25 118.788V175.162H25.9658C63.286 175.162 94.2335 147.837 100 112.063C105.759 147.837 136.707 175.162 174.027 175.162H175V118.788C164.644 118.788 156.248 110.381 156.248 99.9965Z',
          viewBox: '0 0 200 200'
        },
        {
          id: 2,
          label: '成长平台',
          route: '/growth-platform',
          iconPaths: [
            'M70.8333 100H129.167L129.167 175H70.8333L70.8333 100Z',
            'M54.1667 25C64.0158 25 73.7685 26.9399 82.8679 30.709C91.9673 34.4781 100.236 40.0024 107.2 46.9668C114.164 53.9312 119.689 62.1994 123.458 71.2988C127.227 80.3982 129.167 90.1509 129.167 100H70.8337C70.8337 90.7953 63.3715 83.333 54.1667 83.333V25Z',
            'M145.833 41.6667C135.984 41.6667 126.231 43.6067 117.132 47.3757C108.033 51.1448 99.7644 56.6692 92.8 63.6335C85.8356 70.5979 80.3113 78.8661 76.5422 87.9656C72.7731 97.065 70.8332 106.818 70.8332 116.667L129.166 116.667C129.166 107.462 136.628 99.9998 145.833 99.9998L145.833 41.6667Z',
            'M29.1667 25H54.1667V83.3333C40.3596 83.3333 29.1667 72.1404 29.1667 58.3333V25Z',
            'M145.833 41.6667H170.833V75.0001C170.833 88.8072 159.64 100 145.833 100V41.6667Z'
          ],
          viewBox: '0 0 200 200'
        },
        {
          id: 3,
          label: '成长轨迹',
          route: '/growth-track',
          iconPaths: [
            'M175 91.6667C175 101.516 173.059 111.269 169.29 120.368C165.521 129.467 159.997 137.736 153.032 144.7C146.068 151.664 137.8 157.189 128.701 160.958C119.602 164.727 109.849 166.667 100 166.667L100 112.5C111.326 112.5 120.541 103.462 120.826 92.2048L120.833 91.6667L175 91.6667Z',
            'M25.001 91.6667C25.001 101.516 26.9409 111.269 30.71 120.368C34.4791 129.467 40.0034 137.736 46.9678 144.7C53.932 151.664 62.1997 157.189 71.2988 160.958C80.3982 164.727 90.1518 166.667 100.001 166.667L100.001 112.5L100 112.5C88.674 112.5 79.4593 103.462 79.1738 92.2048L79.167 91.6668L25.001 91.6667Z',
            'M175 33.3333L175 91.6666L120.833 91.6666L120.833 87.4999C120.833 57.5845 145.085 33.3333 175 33.3333Z',
            'M25.0001 33.3332C54.9155 33.3333 79.1667 57.5845 79.1667 87.4999L79.1667 91.6666L25.0001 91.6666L25.0001 33.3332Z'
          ],
          viewBox: '0 0 200 200'
        },
        {
          id: 4,
          label: '会员权益',
          route: '/member-benefits',
          iconPaths: [
            'M175 162.5C175 152.651 173.06 142.898 169.291 133.799C165.522 124.699 159.998 116.431 153.033 109.467C146.069 102.502 137.801 96.9781 128.701 93.209C119.602 89.4399 109.849 87.5 100 87.5L100 141.667C111.326 141.667 120.541 150.705 120.826 161.962L120.833 162.5L175 162.5Z',
            'M25 162.5C25 152.651 26.9399 142.898 30.709 133.799C34.4781 124.699 40.0024 116.431 46.9668 109.467C53.9312 102.502 62.1994 96.9781 71.2988 93.209C80.3982 89.4399 90.1509 87.5 100 87.5L100 141.667C88.674 141.667 79.4592 150.705 79.1738 161.962L79.167 162.5L25 162.5Z',
            'M70.8333 49.9999C70.8333 33.8916 83.8916 20.8333 99.9999 20.8333C116.108 20.8333 129.167 33.8916 129.167 49.9999C129.167 66.1082 116.108 79.1666 99.9999 79.1666C83.8916 79.1666 70.8333 66.1082 70.8333 49.9999Z'
          ],
          viewBox: '0 0 200 200'
        }
      ]
    }
  },
  computed: {
    // 根据当前路由确定活跃标签
    activeTab() {
      const currentRoute = this.$route.path
      const activeTabItem = this.tabs.find(tab => tab.route === currentRoute)
      return activeTabItem ? activeTabItem.id : 1
    }
  },
  methods: {
    switchTab(tabId) {
      const tab = this.tabs.find(t => t.id === tabId)
      if (tab && tab.route !== this.$route.path) {
        // 使用Vue Router进行页面切换
        this.$router.push(tab.route)
      }
    }
  }
}
</script>

<style scoped>
.tab-bar {
  display: flex;
  background-color: #ffffff;
  border-top: 0.5px solid #EDEFF0;
  padding: 12px 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 56px;
  z-index: 100;
  box-sizing: border-box;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 8px;
  margin: 0;
  /* 禁用点击高亮效果 */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-item.active {
  /* 移除背景色高亮 */
}

.tab-icon {
  margin-bottom: 0;
  width: 24px !important;
  height: 24px !important;
}

.tab-label {
  font-size: 11px;
  line-height: 15px;
  color: #6A6B6B;
  font-weight: 500;
}

.tab-item.active .tab-label {
  color: #1A1A1A;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 320px) {
  .tab-label {
    font-size: 11px;
    line-height: 15px;
  }
  
  .tab-icon {
    width: 24px;
    height: 24px;
  }
}
</style>