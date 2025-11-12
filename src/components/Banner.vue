<template>
  <div class="banner">
    <div class="carousel-container">
      <!-- 轮播图片 -->
      <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 25}%)` }">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          class="carousel-slide"
          :style="{ 
            backgroundImage: slide.image ? `url(${slide.image})` : `linear-gradient(135deg, ${slide.gradient[0]}, ${slide.gradient[1]})` 
          }"
        >
        </div>
      </div>
      
      <!-- 轮播指示器 -->
      <div class="carousel-indicators">
        <button 
          v-for="(slide, index) in slides.slice(0, 3)" 
          :key="index"
          class="indicator"
          :class="{ active: (currentIndex % 3) === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      currentIndex: 0,
      autoPlayTimer: null,
      isTransitioning: false,
      slides: [
        {
          id: 1,
          title: '公众演讲',
          image: import.meta.env.BASE_URL + 'assets/banner/banner2.jpg',
          gradient: ['#667eea', '#764ba2']
        },
        {
          id: 2,
          title: '人际沟通',
          image: import.meta.env.BASE_URL + 'assets/banner/banner3.jpg',
          gradient: ['#f093fb', '#f5576c']
        },
        {
          id: 3,
          title: '领导力培养',
          image: import.meta.env.BASE_URL + 'assets/banner/banner4.jpg',
          gradient: ['#4facfe', '#00f2fe']
        },
        // 复制第一张图片到末尾，用于无缝循环
        {
          id: 4,
          title: '公众演讲',
          image: import.meta.env.BASE_URL + 'assets/banner/banner2.jpg',
          gradient: ['#667eea', '#764ba2']
        }
      ]
    }
  },
  mounted() {
    this.startAutoPlay()
    // 确保初始状态正确
    console.log('Banner mounted, currentIndex:', this.currentIndex)
  },
  beforeUnmount() {
    this.stopAutoPlay()
  },
  methods: {
    goToSlide(index) {
      if (this.isTransitioning || index === this.currentIndex) return
      this.isTransitioning = true
      
      console.log(`手动切换到幻灯片: ${this.currentIndex} -> ${index}`)
      this.currentIndex = index
      this.resetAutoPlay()
      
      // 500ms后重置过渡状态，与CSS transition时间一致
      setTimeout(() => {
        this.isTransitioning = false
      }, 500)
    },
    nextSlide() {
      if (this.isTransitioning) return
      this.isTransitioning = true
      
      const oldIndex = this.currentIndex
      this.currentIndex = this.currentIndex + 1
      console.log(`轮播切换: ${oldIndex} -> ${this.currentIndex}`)
      
      // 如果到达复制的第一张图片（索引3），在过渡完成后立即跳回真正的第一张（索引0）
      if (this.currentIndex === 3) {
        setTimeout(() => {
          // 暂时禁用过渡效果
          const wrapper = document.querySelector('.carousel-wrapper')
          wrapper.style.transition = 'none'
          this.currentIndex = 0
          
          // 强制重绘后恢复过渡效果
          setTimeout(() => {
            wrapper.style.transition = 'transform 0.5s ease-in-out'
            this.isTransitioning = false
          }, 50)
        }, 500)
      } else {
        // 正常情况下500ms后重置过渡状态
        setTimeout(() => {
          this.isTransitioning = false
        }, 500)
      }
    },
    startAutoPlay() {
      this.autoPlayTimer = setInterval(() => {
        this.nextSlide()
      }, 3000) // 改回3秒，给用户足够时间观看每张图片
    },
    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer)
        this.autoPlayTimer = null
      }
    },
    resetAutoPlay() {
      this.stopAutoPlay()
      this.startAutoPlay()
    }
  }
}
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  min-width: 320px; /* 设置最小宽度320px */
  aspect-ratio: 375 / 320; /* 宽高比 375:320 */
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-wrapper {
  display: flex;
  width: 400%; /* 4个轮播项（3个真实+1个复制），每个100%宽度 */
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 25%; /* 每个轮播项占容器的1/4宽度 */
  height: 100%;
  background-size: cover; /* 使用cover确保图片填满容器 */
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* 确保图片能正确显示的备用背景 */
  background-color: #f0f0f0;
}

.carousel-slide svg {
  width: 100%;
  height: 100%;
}

/* 移除了图片覆盖层样式，因为不再需要遮罩 */

.carousel-indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

.indicator {
  border: none;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.indicator.active {
  background: #ffffff;
  width: 10px;
  height: 4px;
  border-radius: 2px;
}

/* 添加触摸滑动支持的视觉提示 */
.carousel-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%);
  pointer-events: none;
  z-index: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner {
    /* 移动端保持aspect-ratio自适应 */
  }
}

@media (max-width: 480px) {
  .banner {
    /* 小屏幕设备保持aspect-ratio自适应 */
  }
  
  .carousel-indicators {
    bottom: 12px;
  }
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .indicator {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .indicator:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
  
  .indicator.active {
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>