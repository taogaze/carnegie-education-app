<template>
  <div class="header">
    <img :src="logoUrl" alt="DC-logo" class="logo" />
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    logoUrl() {
      // 兼容 GitHub Pages 的 base 前缀
      return import.meta.env.BASE_URL + 'assets/DC-logo.svg'
    }
  }
}
</script>

<style scoped>
.header {
  background-color: white;
  height: 106px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.logo {
  width: 74px;
  height: 42px;
  margin-top: 55px;
}
</style>