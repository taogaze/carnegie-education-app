<template>
  <div class="member-benefits page">
    <!-- 头部封面（来自 Figma：11:296） -->
    <section class="hero" aria-label="会员权益封面">
      <div class="hero-cover" :style="{ backgroundImage: `url('${coverUrl}')` }"></div>
      <!-- 用户信息（距离页面顶部 125px） -->
      <div class="profile" role="region" aria-label="用户信息">
        <div class="avatar" :style="avatarStyle">
          <img v-if="user.avatar" :src="userAvatarUrl" alt="用户头像" />
        </div>
        <div class="meta">
          <div class="name">{{ user.name }}</div>
          <div class="phone">{{ maskedPhone }}</div>
        </div>
      </div>
    </section>

    <div class="content-wrap">
      <!-- 会员卡（来自 Figma：11:377） -->
      <section class="member-card" aria-label="会员卡" :style="{ backgroundImage: `url('${memberCardUrl}')` }">
        <div class="card-content">
          <!-- Figma 11:516 内容实现 -->
          <div class="tier-vertical">
            <div class="tier-header">
              <img class="tier-icon" :src="tierIconUrl" alt="会员等级图标" />
              <div class="spacer-4" aria-hidden="true"></div>
              <div class="tier-label">实践学员</div>
            </div>
            <div class="tier-subrow">
              <div class="tier-note">萌芽学员享受以下权益</div>
              <button class="more-btn" type="button">更多权益</button>
            </div>
          </div>
        </div>
        <!-- 卡片底部装饰图片 -->
        <img class="card-bottom-overlay" :src="cardBottomUrl" alt="" aria-hidden="true" />
      </section>

      <!-- 功能区（设计稿：我的福利等入口；此处给出示例占位） -->
      <div class="features-container">
        <section class="features" aria-label="我的福利">
          <h3 class="features-title">我的福利</h3>
          <div class="features-grid">
            <button class="feature" type="button">
              <img class="feat-icon" :src="giftIconUrl" alt="礼包中心" />
              <span class="feat-name">礼包中心</span>
            </button>
            <button class="feature" type="button">
              <img class="feat-icon" :src="courseIconUrl" alt="课程权益" />
              <span class="feat-name">课程权益</span>
            </button>
            <button class="feature" type="button">
              <img class="feat-icon" :src="consultantIconUrl" alt="专属顾问" />
              <span class="feat-name">专属顾问</span>
            </button>
            <button class="feature" type="button">
              <img class="feat-icon" :src="certIconUrl" alt="认证加速" />
              <span class="feat-name">认证加速</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberBenefits',
  data() {
    return {
      // 可替换为实际数据来源（Vuex/Pinia/接口返回）
      user: {
        name: '张三',
        phone: '13800138000',
        avatar: 'assets/member-benefits/user-avatar.webp'
      }
    }
  },
  computed: {
    coverUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/member-benefits-cover.png'
    },
    cardUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/member-card.png'
    },
    memberCardUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/member-card-bg.jpg'
    },
    tierIconUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/tier-icon.svg'
    },
    cardBottomUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/member-card-bottom.png'
    },
    giftIconUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/deal nav.svg'
    },
    courseIconUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/rights nav.svg'
    },
    consultantIconUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/wechat.svg'
    },
    certIconUrl() {
      return import.meta.env.BASE_URL + 'assets/member-benefits/activ nav.svg'
    },
    maskedPhone() {
      const p = this.user.phone || ''
      // 简单掩码：保留前三位与后四位
      return p.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
    },
    userAvatarUrl() {
      const a = this.user.avatar
      if (!a) return ''
      // 绝对地址或以 / 开头，直接使用；否则拼接 BASE_URL
      if (/^https?:\/\//.test(a) || a.startsWith('/')) return a
      return import.meta.env.BASE_URL + a
    },
    avatarStyle() {
      return { backgroundColor: 'transparent' }
    }
  }
}
</script>

<style scoped>
.member-benefits {
  background: #F8F8F9;
  min-height: 100vh;
}

.hero {
  position: relative;
  width: 100%;
  min-height: 200px;
}
.hero-cover {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

/* 用户信息卡片（绝对定位到距离页面顶部 125px，居中） */
.profile {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 12px;
  padding: 16px 16px;
  background: transparent;
  backdrop-filter: none;
  border-radius: 0;
  box-shadow: none;
  z-index: 1;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-weight: 600;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.meta { display: grid; grid-auto-rows: min-content; }
.name { font-size: 20px; line-height: 28px; font-weight: 600; color: #FFFFFF; }
.phone { font-size: 14px; line-height: 20px; color: #FFFFFF; }

.content-wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}

.features-container {
  width: 100%;
  max-width: 100%;
}

.member-card {
  position: relative;
  height: 223px;
  border-radius: 24px;
  overflow: hidden;
  margin: 0px 0 16px;
  background: #F5F5F5;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-bottom-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  pointer-events: none;
}
.card-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
}
.tier-vertical { display: flex; flex-direction: column; gap: 12px; width: 100%; }
.tier-header { display: flex; align-items: center; gap: 0; }
.tier-icon { width: 24px; height: 24px; object-fit: contain; }
.spacer-4 { width: 4px; flex: 0 0 4px; display: inline-block; }
.tier-label { font-family: 'PingFang SC'; font-weight: 500; font-size: 21px; line-height: 1em; color: #1C1C1D; }
.tier-subrow { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: 0; }
.tier-note { font-family: 'PingFang SC'; font-weight: 400; font-size: 12px; line-height: 1em; color: #7A8294; }
.more-btn { font-family: 'PingFang SC'; font-weight: 500; font-size: 12px; line-height: 1em; color: #F3D09F; background: #1F222C; border: none; border-radius: 99px; padding: 6px 12px; }
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 8px 0;
}
.tier-list { display: grid; grid-auto-rows: min-content; gap: 6px; }
.tier-item { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #1A1A1A; }
.tier-dot { width: 6px; height: 6px; border-radius: 50%; background: #D2D2D2; display: inline-block; }

.features {
  background: #FFFFFF;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 0px;
}
.features-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 12px 0;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 12px;
  border-radius: 8px;
  background: transparent;
  border: none;
}
.feat-icon { 
  width: 28px; 
  height: 28px; 
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(18%) sepia(4%) saturate(15%) hue-rotate(319deg) brightness(95%) contrast(88%);
}
.feat-name { 
  font-size: 12px; 
  line-height: 18px;
  color: #8F8F8F; 
  text-align: center; 
}


</style>