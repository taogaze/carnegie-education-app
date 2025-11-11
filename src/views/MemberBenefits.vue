<template>
  <div class="member-benefits">
    <div class="page-header">
      <h1>会员权益</h1>
      <p>专享特权，解锁更多可能</p>
    </div>
    
    <div class="benefits-content">
      <!-- 会员状态 -->
      <div class="member-status">
        <div class="status-card">
          <div class="member-level">
            <div class="level-icon">👑</div>
            <div class="level-info">
              <h3>黄金会员</h3>
              <p>有效期至 2024年12月31日</p>
            </div>
          </div>
          <div class="member-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 75%"></div>
            </div>
            <p>距离白金会员还需 250 积分</p>
          </div>
        </div>
      </div>
      
      <!-- 专享权益 -->
      <div class="exclusive-benefits">
        <h2>专享权益</h2>
        <div class="benefits-grid">
          <div class="benefit-card active">
            <div class="benefit-icon">🎯</div>
            <h3>优先学习</h3>
            <p>新课程优先体验权</p>
            <div class="benefit-status">已开通</div>
          </div>
          
          <div class="benefit-card active">
            <div class="benefit-icon">💬</div>
            <h3>专属客服</h3>
            <p>1对1专属学习顾问</p>
            <div class="benefit-status">已开通</div>
          </div>
          
          <div class="benefit-card active">
            <div class="benefit-icon">📚</div>
            <h3>资料下载</h3>
            <p>课程资料免费下载</p>
            <div class="benefit-status">已开通</div>
          </div>
          
          <div class="benefit-card locked">
            <div class="benefit-icon">🏆</div>
            <h3>认证加速</h3>
            <p>认证考试优先通道</p>
            <div class="benefit-status">白金专享</div>
          </div>
        </div>
      </div>
      
      <!-- 会员等级 -->
      <div class="member-levels">
        <h2>会员等级</h2>
        <div class="levels-container">
          <div class="level-item completed">
            <div class="level-badge">🥉</div>
            <h4>青铜会员</h4>
            <p>0-99 积分</p>
            <ul>
              <li>基础课程学习</li>
              <li>社区交流权限</li>
            </ul>
          </div>
          
          <div class="level-item completed">
            <div class="level-badge">🥈</div>
            <h4>白银会员</h4>
            <p>100-499 积分</p>
            <ul>
              <li>进阶课程解锁</li>
              <li>学习资料下载</li>
            </ul>
          </div>
          
          <div class="level-item current">
            <div class="level-badge">🥇</div>
            <h4>黄金会员</h4>
            <p>500-999 积分</p>
            <ul>
              <li>全部课程访问</li>
              <li>专属客服支持</li>
              <li>优先体验新功能</li>
            </ul>
          </div>
          
          <div class="level-item locked">
            <div class="level-badge">💎</div>
            <h4>白金会员</h4>
            <p>1000+ 积分</p>
            <ul>
              <li>认证考试优先通道</li>
              <li>专家一对一指导</li>
              <li>定制学习计划</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 积分商城 -->
      <div class="points-mall">
        <h2>积分商城</h2>
        <div class="mall-grid">
          <div class="mall-item">
            <div class="item-image">🎁</div>
            <h4>学习礼包</h4>
            <p class="item-price">100 积分</p>
            <button class="redeem-btn">兑换</button>
          </div>
          
          <div class="mall-item">
            <div class="item-image">📖</div>
            <h4>电子书籍</h4>
            <p class="item-price">200 积分</p>
            <button class="redeem-btn">兑换</button>
          </div>
          
          <div class="mall-item">
            <div class="item-image">🏅</div>
            <h4>认证券</h4>
            <p class="item-price">500 积分</p>
            <button class="redeem-btn">兑换</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberBenefits'
}
</script>

<style scoped>
.member-benefits {
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

.benefits-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* 会员状态 */
.member-status {
  margin-bottom: 40px;
}

.status-card {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 16px;
  padding: 24px;
  color: white;
}

.member-level {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.level-icon {
  font-size: 48px;
  margin-right: 16px;
}

.level-info h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.level-info p {
  font-size: 14px;
  opacity: 0.9;
}

.progress-bar {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  height: 8px;
  margin-bottom: 8px;
}

.progress-fill {
  background: white;
  border-radius: 10px;
  height: 100%;
  transition: width 0.3s ease;
}

.member-progress p {
  font-size: 12px;
  opacity: 0.9;
}

/* 专享权益 */
.exclusive-benefits {
  margin-bottom: 40px;
}

.exclusive-benefits h2 {
  font-size: 22px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.benefit-card.active:hover {
  transform: translateY(-2px);
}

.benefit-card.locked {
  opacity: 0.6;
  filter: grayscale(0.5);
}

.benefit-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.benefit-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.benefit-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.benefit-status {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-block;
}

.benefit-card.active .benefit-status {
  background: #E8F5E8;
  color: #4CAF50;
}

.benefit-card.locked .benefit-status {
  background: #FFF3E0;
  color: #FF9800;
}

/* 会员等级 */
.member-levels {
  margin-bottom: 40px;
}

.member-levels h2 {
  font-size: 22px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.levels-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.level-item {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.level-item.current {
  border: 2px solid #FFD700;
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
}

.level-item.locked {
  opacity: 0.6;
  filter: grayscale(0.5);
}

.level-badge {
  font-size: 48px;
  margin-bottom: 16px;
}

.level-item h4 {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.level-item > p {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.level-item ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.level-item li {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;
}

.level-item li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4CAF50;
}

/* 积分商城 */
.points-mall h2 {
  font-size: 22px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.mall-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.mall-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-image {
  font-size: 48px;
  margin-bottom: 16px;
}

.mall-item h4 {
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.item-price {
  font-size: 14px;
  color: #FF9800;
  font-weight: bold;
  margin-bottom: 16px;
}

.redeem-btn {
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.redeem-btn:hover {
  background: #1976D2;
}

@media (max-width: 768px) {
  .member-benefits {
    padding: 16px;
  }
  
  .benefits-grid,
  .levels-container,
  .mall-grid {
    grid-template-columns: 1fr;
  }
  
  .member-level {
    flex-direction: column;
    text-align: center;
  }
  
  .level-icon {
    margin-right: 0;
    margin-bottom: 16px;
  }
}
</style>