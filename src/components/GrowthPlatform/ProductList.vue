<template>
  <div class="product-list">
    <div 
      v-for="(item, index) in currentProducts" 
      :key="index" 
      class="product-item"
      :style="{ backgroundImage: `url(${item.image})` }"
    ></div>
    <div class="list-footer">
      <div class="list-footer-logo" :style="footerLogoStyle"></div>
      诚邀您亲身体验逾百年卓越教学精粹
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    category: {
      type: String,
      default: 'enterprise',
    },
  },
  data() {
    return {
      products: {
        enterprise: [
          { image: import.meta.env.BASE_URL + 'assets/Frame%20427321926.jpg' },
          { image: import.meta.env.BASE_URL + 'assets/Frame%20427321927.jpg' },
          { image: import.meta.env.BASE_URL + 'assets/Frame%20427321928.jpg' },
          { image: import.meta.env.BASE_URL + 'assets/Frame%20427321929.jpg' },
          { image: import.meta.env.BASE_URL + 'assets/Frame%20427321930.jpg' },
          { image: import.meta.env.BASE_URL + 'assets/Frame%20427321931.jpg' },
        ],
        // 个人成长（原 teenager）
        teenager: [
          { image: new URL('../../../素材/个人成长封面/Frame 427321932.jpg', import.meta.url).href },
          { image: new URL('../../../素材/个人成长封面/Frame 427321991.jpg', import.meta.url).href },
          { image: new URL('../../../素材/个人成长封面/Frame 427321992.jpg', import.meta.url).href },
          { image: new URL('../../../素材/个人成长封面/Frame 427321995.jpg', import.meta.url).href },
          { image: new URL('../../../素材/个人成长封面/Frame 427321996.jpg', import.meta.url).href },
        ],
        // 家庭成长
        family: [
          { image: new URL('../../../素材/家庭成长封面/Frame 427322072.jpg', import.meta.url).href },
          { image: new URL('../../../素材/家庭成长封面/Frame 427322073.jpg', import.meta.url).href },
          { image: new URL('../../../素材/家庭成长封面/Frame 427322074.jpg', import.meta.url).href },
          { image: new URL('../../../素材/家庭成长封面/Frame 427322076.jpg', import.meta.url).href },
          { image: new URL('../../../素材/家庭成长封面/Frame 427322077.jpg', import.meta.url).href },
        ],
      },
    };
  },
  computed: {
    currentProducts() {
      return this.products[this.category] || [];
    },
    footerLogoUrl() {
      // 使用项目中的 banner/logo 素材
      return new URL('../../../素材/banner/logo/DC-logo 1.svg', import.meta.url).href;
    },
    footerLogoStyle() {
      const url = this.footerLogoUrl;
      return {
        backgroundColor: '#D2D2D2',
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      };
    },
  },
};
</script>

<style scoped>
.product-list {
  width: 100%;
  /* 为底部固定 TabBar 预留空间，避免最后一个课程被遮挡 */
  padding-bottom: calc(80px + 44px + env(safe-area-inset-bottom));
}

.product-item {
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background-size: cover;
  background-position: center;
  height: 0;
}

.list-footer {
  font-size: 12px;
  line-height: 18px;
  color: #D2D2D2;
  text-align: center;
  padding: 24px 0;
}

.list-footer-logo {
  width: 74px;
  height: 42px;
  display: block;
  margin: 0 auto 8px;
}
</style>