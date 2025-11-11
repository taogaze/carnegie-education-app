<template>
  <div class="home">
    <!-- Banner 组件 -->
    <Banner />
    
    <!-- 课程列表组件 -->
    <CourseList />
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import CourseList from '../components/CourseList.vue'

export default {
  name: 'Home',
  components: {
    Banner,
    CourseList
  }
}
</script>

<style scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>