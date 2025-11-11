<template>
  <div class="growth-track">
    <div class="page-header">
      <h1>成长轨迹</h1>
      <p>记录每一步成长足迹</p>
    </div>
    
    <div class="track-content">
      <!-- 成长时间线 -->
      <div class="growth-timeline">
        <h2>成长历程</h2>
        <div class="timeline">
          <div class="timeline-item completed">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">2024年1月</div>
              <h3>开始学习之旅</h3>
              <p>注册账号，完成个人资料设置</p>
            </div>
          </div>
          
          <div class="timeline-item completed">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">2024年2月</div>
              <h3>完成基础课程</h3>
              <p>掌握了核心技能基础，获得第一个证书</p>
            </div>
          </div>
          
          <div class="timeline-item completed">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">2024年3月</div>
              <h3>参与实战项目</h3>
              <p>完成第一个实战项目，提升实际应用能力</p>
            </div>
          </div>
          
          <div class="timeline-item current">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">2024年4月</div>
              <h3>进阶学习阶段</h3>
              <p>正在学习高级课程，挑战更复杂的项目</p>
            </div>
          </div>
          
          <div class="timeline-item future">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">2024年5月</div>
              <h3>专家认证</h3>
              <p>目标获得专家级认证</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 成就徽章 -->
      <div class="achievements">
        <h2>获得成就</h2>
        <div class="badge-grid">
          <div class="badge-item earned">
            <div class="badge-icon">🎓</div>
            <div class="badge-name">学习新手</div>
            <div class="badge-desc">完成第一门课程</div>
          </div>
          <div class="badge-item earned">
            <div class="badge-icon">⭐</div>
            <div class="badge-name">坚持学习</div>
            <div class="badge-desc">连续学习7天</div>
          </div>
          <div class="badge-item earned">
            <div class="badge-icon">🏆</div>
            <div class="badge-name">项目达人</div>
            <div class="badge-desc">完成3个实战项目</div>
          </div>
          <div class="badge-item locked">
            <div class="badge-icon">💎</div>
            <div class="badge-name">专家认证</div>
            <div class="badge-desc">获得专家级认证</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GrowthTrack'
}
</script>

<style scoped>
.growth-track {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.page-header p {
  font-size: 16px;
  color: #666;
}

.track-content {
  max-width: 800px;
  margin: 0 auto;
}

.growth-timeline {
  margin-bottom: 40px;
}

.growth-timeline h2 {
  font-size: 22px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-dot {
  position: absolute;
  left: -37px;
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e0e0e0;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #e0e0e0;
}

.timeline-item.completed .timeline-dot {
  background: #4CAF50;
  box-shadow: 0 0 0 2px #4CAF50;
}

.timeline-item.current .timeline-dot {
  background: #2196F3;
  box-shadow: 0 0 0 2px #2196F3;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 2px #2196F3, 0 0 0 4px rgba(33, 150, 243, 0.3);
  }
  50% {
    box-shadow: 0 0 0 2px #2196F3, 0 0 0 8px rgba(33, 150, 243, 0.1);
  }
  100% {
    box-shadow: 0 0 0 2px #2196F3, 0 0 0 4px rgba(33, 150, 243, 0.3);
  }
}

.timeline-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.timeline-date {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.timeline-content h3 {
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.timeline-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.achievements h2 {
  font-size: 22px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.badge-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.badge-item.earned:hover {
  transform: translateY(-2px);
}

.badge-item.locked {
  opacity: 0.5;
  filter: grayscale(1);
}

.badge-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.badge-name {
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.badge-desc {
  font-size: 12px;
  color: #666;
}

@media (max-width: 768px) {
  .growth-track {
    padding: 16px;
  }
  
  .timeline {
    padding-left: 20px;
  }
  
  .timeline-dot {
    left: -27px;
  }
  
  .badge-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>