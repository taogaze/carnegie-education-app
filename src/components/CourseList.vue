<template>
  <div class="course-list">
    <div class="section-header">
      <h2>
        <span class="text-jingxuan">精选</span><span class="text-kecheng">课程</span><span class="text-tiyan">体验</span>
      </h2>
    </div>
    
    <div class="courses">
      <div 
        v-for="course in courses" 
        :key="course.id" 
        class="course-card"
        @click="selectCourse(course)"
      >
        <div class="course-image">
          <img :src="course.image" :alt="course.title" />
        </div>
        <div class="course-info">
          <h3 class="course-title">{{ course.title }}</h3>
          <p class="course-subtitle">{{ course.description }}</p>
          <div class="course-price">
            <!-- 付费课程样式 -->
            <template v-if="course.price > 0">
              <span class="currency">¥</span><span class="price-number">{{ course.price }}</span>
            </template>
            <!-- 免费课程样式 -->
            <template v-else>
              <span class="free-label">免费</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  data() {
    return {
      courses: [
        {
          id: 1,
          title: '做不操心的父母，养育高情商、更自信的孩子',
          description: '克服紧张情绪，掌握演讲技巧',
          duration: '4周',
          level: '初级',
          price: 299,
          originalPrice: 399,
          color: '#FF6B6B',
          image: import.meta.env.BASE_URL + 'assets/banner/课程素材/Frame 427320713.jpg'
        },
        {
          id: 2,
          title: '漫谈系列青少年教育XVII',
          description: '建立良好人际关系的秘诀',
          duration: '6周',
          level: '中级',
          price: 0,
          originalPrice: 499,
          color: '#4ECDC4',
          image: import.meta.env.BASE_URL + 'assets/banner/课程素材/Frame 427321977.jpg'
        },
        {
          id: 3,
          title: '职场晋级蜕变系列直播课',
          description: '成为优秀领导者的必修课',
          duration: '8周',
          level: '高级',
          price: 599,
          originalPrice: 799,
          color: '#45B7D1',
          image: import.meta.env.BASE_URL + 'assets/banner/课程素材/Frame 427321978.jpg'
        }
      ]
    }
  },
  methods: {
    selectCourse(course) {
      console.log('选择课程:', course.title)
      // 这里可以添加课程选择的逻辑
    }
  }
}
</script>

<style scoped>
.course-list {
  flex: 1;
  padding: 24px 20px 20px 20px;
  background-color: #f8f9fa;
  overflow-y: auto;
  scroll-behavior: smooth;
  /* 为WebKit浏览器优化滚动条样式 */
  -webkit-overflow-scrolling: touch;
}

.section-header {
  text-align: left;
  margin-bottom: 0;
}

.section-header h2 {
  font-size: 20px;
  line-height: 28px;
  color: #333;
  margin-bottom: 16px;
}

.text-jingxuan {
  color: #23ADA3;
}

.text-kecheng {
  color: #7DBC52;
}

.text-tiyan {
  color: #2684B9;
}

.section-header p {
  color: #666;
  font-size: 14px;
}

.courses {
  display: grid;
  gap: 20px;
  /* 添加底部padding确保最后一个课程完整显示 */
  padding-bottom: calc(80px + 20px + 44px + env(safe-area-inset-bottom));
}

.course-card {
  background: transparent;
  border-radius: 12px;
  padding: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0;
}

.course-image {
  width: 100%;
  aspect-ratio: 335/193;
  overflow: hidden;
  border-radius: 2px;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.course-info {
  padding: 8px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.course-title {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0;
  text-align: left;
  line-height: 24px;
}

.course-subtitle {
  font-size: 12px;
  line-height: 18px;
  color: #999A9A;
  margin-bottom: 0;
  text-align: left;
}

.course-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.4;
  text-align: left;
}

.course-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
}

.course-duration,
.course-level {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #f0f0f0;
  color: #666;
}

.course-price {
  display: flex;
  align-items: flex-end;
  gap: 2px;
}

.currency {
  font-size: 13px;
  font-weight: bold;
  font-family: 'JetBrains Mono', 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  color: #e74c3c;
  line-height: 24px;
  font-feature-settings: 'tnum' 1; /* 等宽数字 */
}

.price-number {
  font-size: 16px;
  font-weight: bold;
  font-family: 'JetBrains Mono', 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  color: #e74c3c;
  line-height: 24px;
  font-feature-settings: 'tnum' 1; /* 等宽数字 */
}

.free-label {
  font-size: 16px;
  font-weight: bold;
  color: #e74c3c;
  line-height: 24px;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

@media (max-width: 480px) {
  .course-card {
    flex-direction: column;
    text-align: center;
  }
  
  .course-image {
    align-self: center;
  }
}
</style>