<template>
  <div class="growth-platform">
    <Header />
    <Tabs @tab-change="handleTabChange" />
    <ProductList :category="currentCategory" />
  </div>
</template>

<script>
import Header from '../components/GrowthPlatform/Header.vue';
import Tabs from '../components/GrowthPlatform/Tabs.vue';
import ProductList from '../components/GrowthPlatform/ProductList.vue';

export default {
  name: 'GrowthPlatform',
  components: {
    Header,
    Tabs,
    ProductList,
  },
  data() {
    return {
      currentCategory: 'enterprise',
    };
  },
  methods: {
    handleTabChange(category) {
      this.currentCategory = category;
    },
  },
};
</script>

<style scoped>
.growth-platform {
  background-color: #f8f8f9;
}
</style>