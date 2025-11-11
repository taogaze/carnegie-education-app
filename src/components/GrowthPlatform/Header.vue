<template>
  <div class="header">
    <img src="/assets/DC-logo.svg" alt="DC-logo" class="logo" />
  </div>
</template>

<script>
export default {
  name: 'Header',
};
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