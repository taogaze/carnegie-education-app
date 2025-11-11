<template>
  <div class="tabs" v-sticky="{ zIndex: 900, top: 0 }">
    <div class="tab-items-container">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        ref="tabItems"
        class="tab-item"
        :class="{ active: activeTab === tab.id }"
        @click="selectTab(tab.id)"
      >
        <span>{{ tab.name }}</span>
      </div>
    </div>
    <div class="active-bar" :style="barStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      activeTab: 'enterprise',
      tabs: [
        { id: 'enterprise', name: '企业成长' },
        { id: 'teenager', name: '个人成长' },
        { id: 'family', name: '家庭成长' },
      ],
      componentMounted: false,
    };
  },
  computed: {
    barStyle() {
      if (!this.componentMounted || !this.$refs.tabItems) {
        return {};
      }

      const activeTabIndex = this.tabs.findIndex(tab => tab.id === this.activeTab);
      if (activeTabIndex < 0) {
        return {};
      }

      const activeTabEl = this.$refs.tabItems[activeTabIndex];
      const activeTabTextEl = activeTabEl.querySelector('span');

      if (!activeTabEl || !activeTabTextEl) {
        return {};
      }

      const textWidth = activeTabTextEl.offsetWidth;
      const left = activeTabEl.offsetLeft + (activeTabEl.offsetWidth - textWidth) / 2;

      return {
        width: `${textWidth}px`,
        left: `${left}px`,
        transition: 'left 0.2s ease-in-out, width 0.2s ease-in-out',
      };
    },
  },
  mounted() {
    this.componentMounted = true;
  },
  methods: {
    selectTab(tabId) {
      this.activeTab = tabId;
      this.$emit('tab-change', tabId);
    },
  },
};
</script>

<style scoped>
.tabs {
  background-color: white;
  height: 68px;
  width: 100%;
  /* 让内部的 active-bar 作为绝对定位参考 */
  position: relative;
  z-index: 90;
  /* 视觉分隔线与阴影 */
  border-bottom: 0.5px solid #EDEFF0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  will-change: transform;
}

.tab-items-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.tab-item {
  font-family: 'Source Han Sans CN', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #929292;
  cursor: pointer;
  position: relative;
  text-align: center;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Ensure tab item is above the bar */
}

.tab-item.active {
  color: #1b1b1b;
}

.active-bar {
  position: absolute;
  bottom: 25px; /* Adjust to align with text bottom */
  height: 6px;
  background-color: #7dbc52;
  z-index: 0; /* Place bar behind the text content */
}
</style>