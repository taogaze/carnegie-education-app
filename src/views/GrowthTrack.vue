<template>
  <div class="growth-track page">
    <!-- 顶部系统导航栏（微信小程序规范） -->
    <header
      class="system-nav"
      :class="{ 'is-fixed': fixedActive }"
      role="banner"
      aria-label="页面导航"
      ref="systemNav"
    >
      <!-- 状态栏占位：自动适配 iOS 刘海、安全区；在非 iOS/PC 环境会为 0 -->
      <div class="status-bar" aria-hidden="true"></div>
      <!-- 标题栏：固定 44px，高度与微信原生保持一致 -->
      <div class="title-bar">
        <div class="inner">
          <div class="nav-title">成长轨迹</div>
        </div>
      </div>
    </header>

    <!-- 搜索栏（容器使用纯白背景，模拟“margin 区域”也是白色） -->
    <section class="search-section" role="search">
      <div class="search-bar">
        <button class="city-chip" aria-label="当前城市">厦门</button>
        <!-- Figma: 城市下拉小三角 (6x3) -->
        <svg class="city-caret" viewBox="0 0 6 3" aria-hidden="true">
          <path d="M0 0 L3 3 L6 0 Z" fill="rgba(0,0,0,0.9)"/>
        </svg>
        <span class="divider" aria-hidden="true"></span>
        <svg class="search-icon" viewBox="0 0 1024 1024" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 858.3168c-194.816 0-352-166.2464-352-370.4832S317.184 117.3504 512 117.3504s352 166.2464 352 370.4832-157.184 370.4832-352 370.4832z m0-64c158.6688 0 288-136.8576 288-306.4832 0-169.6768-129.3312-306.4832-288-306.4832S224 318.1568 224 487.8336c0 169.6256 129.3312 306.4832 288 306.4832zM717.312 799.9488a32 32 0 0 1 46.4896-43.9808l91.4432 96.7168a32 32 0 0 1-46.4896 43.9808l-91.4432-96.768z" fill="currentColor" />
        </svg>
        <input
          v-model="q"
          class="search-input"
          type="text"
          placeholder="搜索社群名称"
          aria-label="搜索社群名称"
        />
      </div>
    </section>

    <!-- 热门社群模块（来自 Figma：标题“热门社群” + 横向列表），放置在搜索框与标签栏之间 -->
    <section class="hot-section" aria-label="热门社群">
      <div class="hot-title">热门社群</div>
      <div class="hot-scroll" role="list">
        <a
          v-for="(c, i) in hotCommunities"
          :key="i"
          class="hot-item"
          role="listitem"
          href="javascript:void(0)"
          aria-label="热门社群卡片"
        >
          <div class="hot-cover">
            <img v-if="c.cover" :src="resolveAsset(c.cover)" :alt="c.name" loading="lazy" />
          </div>
          <div class="hot-name">{{ c.name }}</div>
        </a>
      </div>
    </section>

    <!-- 分类标签：顶部滑块动画，参考“成长平台”Tabs -->
    <nav
      class="category-tabs"
      aria-label="分类切换"
      ref="categoryTabs"
      :class="{ 'is-fixed': fixedActive }"
    >
      <div class="tab-items-container">
        <button
          v-for="t in tabs"
          :key="t.id"
          ref="tabItems"
          class="tab"
          :class="{ active: currentTab === t.id }"
          @click="currentTab = t.id"
          :aria-pressed="currentTab === t.id"
        >
          <span>{{ t.name }}</span>
        </button>
      </div>
      <!-- 顶部滑块：宽度与位置根据激活项文字动态变化 -->
      <div class="active-bar" :style="activeBarStyle" aria-hidden="true"></div>
    </nav>
    <!-- 当 nav 固定定位时，用占位元素维持原有文档流高度，避免内容跳动 -->
    <div class="nav-placeholder" aria-hidden="true" :style="{ height: fixedActive ? (navHeight + 'px') : '0px' }"></div>

    <!-- 活动列表（来自 Figma 结构的卡片样式） -->
    <section class="activity-list">
      <article v-for="item in filteredActivities" :key="item.id" class="activity-card">
        <div class="thumb" :style="{ backgroundImage: `url('${resolveAsset(item.image)}')` }"></div>
        <div class="info">
          <div class="text-box">
            <h3 class="title">{{ item.title }}</h3>
            <p class="meta">{{ joinCounts[item.id] }}人加入</p>
          </div>
          <!-- 头像占位图（按 Figma 1-332 添加，16x16 叠放） -->
          <div class="avatar-row" aria-label="joined members avatars (placeholder)">
            <span class="avatar"></span>
            <span class="avatar"></span>
            <span class="avatar"></span>
            <span class="avatar"></span>
            <span class="avatar"></span>
            <span class="avatar"></span>
          </div>
        </div>
      </article>
      <!-- 列表底部留白模块（参考“成长平台”课程列表的处理），避免最后一条被遮挡 -->
      <div class="list-footer">
        <div class="list-footer-logo" :style="footerLogoStyle"></div>
        诚邀您亲身体验逾百年卓越教学精粹
      </div>
    </section>
  </div>
  
</template>

<script>
export default {
  name: 'GrowthTrack',
  data() {
    return {
      q: '',
      currentTab: 'all',
      // 触发 active-bar 计算的挂载标记（$refs 非响应式，需要一个响应式依赖）
      componentMounted: false,
      // 分类标签元数据（用于生成滑块与按钮）
      tabs: [
        { id: 'all', name: '全部社群' },
        { id: 'joined', name: '我加入的' }
      ],
      // 滚动吸顶控制
      fixedActive: false,
      headerHeight: 0,
      navInitTop: 0,
      navHeight: 0,
      _scrollRaf: null,
      // 为每个活动生成一次性的随机加入人数（稳定显示，不在每次渲染时变化）
      joinCounts: {},
      // 热门社群：封面 + 名称（封面暂用示例图，后续可替换为 Figma/接口图片）
      hotCommunities: [
        { name: '企业家交流俱乐部', cover: '../../素材/热门社群封面/Frame 427321936.jpg' },
        { name: '口才实战演练社群', cover: '../../素材/热门社群封面/Frame 427321937.jpg' },
        { name: '自律互助群', cover: '../../素材/热门社群封面/Frame 427321938.jpg' },
        { name: '职场快速提升', cover: '../../素材/热门社群封面/Frame 427321939.jpg' },
        { name: '亲子沟通指导群', cover: '../../素材/热门社群封面/feed.jpg' }
      ],
      activities: [
        {
          id: 1,
          title: '社群沙龙 · 沟通与影响力',
          meta: '本周六 · 厦门思明区',
          image: 'assets/banner/banner2.jpg',
          joined: true
        },
        {
          id: 2,
          title: '城市路演 · 公众表达训练',
          meta: '11月 · 厦门湖里区',
          image: 'assets/Frame 427321926.jpg',
          joined: false
        },
        {
          id: 3,
          title: '成长营 · 7天自我管理挑战',
          meta: '12月 · 线上',
          image: 'assets/banner/banner2.jpg',
          joined: true
        },
        {
          id: 4,
          title: '社群分享 · 领导力提升',
          meta: '本周日 · 厦门集美区',
          image: 'assets/Frame 427321926.jpg',
          joined: false
        },
        {
          id: 5,
          title: '主题交流 · 高效会议',
          meta: '11月 · 厦门海沧区',
          image: 'assets/banner/banner2.jpg',
          joined: true
        },
        {
          id: 6,
          title: '体验课 · 情绪管理',
          meta: '11月 · 厦门翔安区',
          image: 'assets/Frame 427321926.jpg',
          joined: false
        },
        {
          id: 7,
          title: '线上讲座 · 时间管理',
          meta: '12月 · 线上',
          image: 'assets/banner/banner2.jpg',
          joined: true
        },
        {
          id: 8,
          title: '工作坊 · 团队协作',
          meta: '12月 · 厦门同安区',
          image: 'assets/Frame 427321926.jpg',
          joined: false
        },
        {
          id: 9,
          title: '读书会 · 沟通艺术',
          meta: '本周三 · 厦门湖里区',
          image: 'assets/banner/banner2.jpg',
          joined: true
        },
        {
          id: 10,
          title: '公益活动 · 社区服务',
          meta: '下周 · 厦门思明区',
          image: 'assets/Frame 427321926.jpg',
          joined: false
        }
      ]
    }
  },
  mounted() {
    // 初次测量并监听滚动/尺寸变化
    this.$nextTick(() => {
      this.measureLayout()
      // 标记组件已挂载，激活 active-bar 的计算
      this.componentMounted = true
      window.addEventListener('scroll', this.onScroll, { passive: true })
      window.addEventListener('resize', this.onResize, { passive: true })
      this.onScroll()
    })
    // 从 URL 读取小程序传入的状态栏高度（推荐在 web-view src 上拼接 statusBarHeight 或 sb）
    const params = new URL(window.location.href).searchParams
    const sb = params.get('statusBarHeight') || params.get('sb')
    if (sb && !Number.isNaN(Number(sb))) {
      document.documentElement.style.setProperty('--status-bar-height', `${Number(sb)}px`)
    } else {
      // 回退策略：根据设备与分辨率大致判断是否为刘海机型
      const ua = navigator.userAgent || ''
      const isIOS = /iPhone|iPad|iPod/i.test(ua)
      const h = window.screen?.height || 0
      const w = window.screen?.width || 0
      const hasNotch = isIOS && (h >= 812 || w >= 812) // iPhone X 及以上机型常见分辨率
      // iOS 刘海机型使用 44px 近似值；其他平台为 0
      document.documentElement.style.setProperty('--status-bar-height', hasNotch ? '44px' : '0px')
    }

    // 生成稳定的随机加入人数（20~200），仅在首次挂载时生成
    const min = 20, max = 200
    const counts = {}
    this.activities.forEach(a => {
      counts[a.id] = Math.floor(Math.random() * (max - min + 1)) + min
    })
    this.joinCounts = counts
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    if (this._scrollRaf) cancelAnimationFrame(this._scrollRaf)
  },
  computed: {
    // 顶部滑块样式：参考 GrowthPlatform Tabs 的实现，平滑过渡 left/width
    activeBarStyle() {
      // 依赖 componentMounted，确保挂载后重新计算（因 $refs 非响应式）
      const mounted = this.componentMounted
      // $refs.tabItems 只有在渲染后才可用
      const items = this.$refs.tabItems
      if (!items || items.length === 0) return {}
      const idx = this.tabs.findIndex(t => t.id === this.currentTab)
      if (idx < 0) return {}
      const el = items[idx]
      if (!el) return {}
      const textEl = el.querySelector('span')
      const barWidth = 18
      const textWidth = textEl ? textEl.offsetWidth : el.offsetWidth
      // 将滑块宽度固定为 18px，并居中对齐到当前标签按钮
      const left = el.offsetLeft + (el.offsetWidth - barWidth) / 2
      return {
        width: `${barWidth}px`,
        left: `${left}px`,
        transition: 'left 0.2s ease-in-out, width 0.2s ease-in-out'
      }
    },
    filteredActivities() {
      const q = this.q.trim().toLowerCase()
      const base = this.currentTab === 'joined'
        ? this.activities.filter(a => a.joined)
        : this.activities
      if (!q) return base
      return base.filter(a =>
        a.title.toLowerCase().includes(q) || a.meta.toLowerCase().includes(q)
      )
    },
    footerLogoUrl() {
      // 使用项目中的 banner/logo 素材（相对当前视图文件路径）
      return new URL('../../素材/banner/logo/DC-logo 1.svg', import.meta.url).href
    },
    footerLogoStyle() {
      const url = this.footerLogoUrl
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
      }
    }
  },
  methods: {
    measureLayout() {
      // 标题栏总高度（状态栏 + 标题栏）
      const headerEl = this.$refs.systemNav
      this.headerHeight = headerEl ? headerEl.offsetHeight : 44
      // nav 初始到文档顶部的距离与自身高度
      const navEl = this.$refs.categoryTabs
      if (navEl) {
        const rect = navEl.getBoundingClientRect()
        this.navInitTop = rect.top + window.scrollY
        this.navHeight = navEl.offsetHeight
      }
    },
    onScroll() {
      if (this._scrollRaf) return
      this._scrollRaf = requestAnimationFrame(() => {
        this._scrollRaf = null
        const threshold = this.navInitTop - this.headerHeight
        const shouldFix = window.scrollY >= threshold
        if (shouldFix !== this.fixedActive) {
          this.fixedActive = shouldFix
        }
      })
    },
    onResize() {
      this.measureLayout()
      this.onScroll()
    },
    // 统一解析资源路径：
    // - public/assets 下的静态资源使用 BASE_URL
    // - 项目源码中的“素材/...”等相对路径使用 import.meta.url（由 Vite 打包）
    resolveAsset(p) {
      try {
        if (p.startsWith('assets/')) {
          return new URL(p, import.meta.env.BASE_URL).href
        }
        // 其他路径按相对当前文件解析（例如 ../../素材/...）
        return new URL(p, import.meta.url).href
      } catch (e) {
        return p
      }
    }
  }
}
</script>

<style scoped>
/* 页面背景与安全区域 */
.page {
  min-height: 100vh;
  background: #F8F8F9;
  padding-bottom: env(safe-area-inset-bottom);
  /* 为固定导航栏预留顶部空间（状态栏 + 标题栏 44px） */
  padding-top: calc(var(--status-bar-height, env(safe-area-inset-top)) + 44px);
}

/* 顶部系统导航栏（微信规范） */
.system-nav {
  /* 为兼容 iOS Safari 在部分设备上 sticky 失效的情况，改为固定定位 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #FFFFFF; /* 微信标准导航栏颜色 */
  border-bottom: none; /* 去掉底部线条 */
  transition: box-shadow 180ms ease, transform 180ms ease;
}
.system-nav.is-fixed {
  /* 无分隔线效果 */
  box-shadow: none;
}
.status-bar {
  /* 优先使用 JS 注入的 --status-bar-height；否则回退到 env(safe-area-inset-top) */
  height: var(--status-bar-height, env(safe-area-inset-top));
}
.title-bar {
  height: 44px; /* 微信官方标题栏高度 */
  display: flex;
  align-items: center;
}
.inner {
  /* 标准左右间距，模拟微信默认导航的左右安全边距 */
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center; /* 文本居中，与原生一致 */
}
.nav-title {
  font-size: 17px; /* 微信推荐字体大小 */
  font-weight: 600;
  line-height: 44px;
  color: rgba(0,0,0,0.9);
}

/* 搜索栏 */
.search-bar {
  display: flex;
  align-items: center;
  gap: 6px; /* Figma 间距更紧凑 */
  /* 由容器控制外边距，这里不再设置 margin */
  height: 40px;
  border: 1px solid #EDEFF0;
  border-radius: 999px;
  padding: 0 12px;
  background: #FFFFFF; /* 纯白背景 */
}

/* 纯白背景容器，用于让“搜索框周围的区域”也是白色 */
.search-section {
  background: #FFFFFF; /* 纯白背景，覆盖两侧与顶部区域 */
  padding-top: 12px;   /* 上 12px */
  padding-bottom: 0;   /* 下 0 */
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
}
.city-chip {
  appearance: none;
  border: 0;
  background: transparent;
  color: #6A6B6B;
  font-size: 14px; /* 用户要求：搜索框内字号改为 14 */
  font-weight: 500;
}
.divider {
  width: 1px;
  height: 12px;
  background: rgba(0,0,0,0.1);
}
.search-icon {
  width: 16px;
  height: 16px;
  color: #90939A; /* Figma: 搜索图标颜色 */
}
.city-caret {
  width: 6px;  /* Figma: 6 */
  height: 3px; /* Figma: 3 */
}
.search-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px; /* 用户要求：搜索框内字号改为 14 */
  color: #2B2B2B;
}
.search-input::placeholder {
  font-size: 14px; /* 与输入保持一致 */
  color: #BEBFBF;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  gap: 44px; /* 标签与标签之间的间距为 44px */
  /* 左右适配安全区；上下 12px 间距 */
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
  align-items: center;
  background: #FFFFFF; /* 盒子背景纯白 */
  position: relative; /* 默认相对定位 */
  transition: transform 180ms ease, box-shadow 180ms ease;
  /* 底部内部分隔线（0.5px，颜色 #EDEFF0） */
}
.tab-items-container {
  display: flex;
  align-items: center;
  gap: 44px;
  width: 100%;
}
.category-tabs::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;                /* 通过缩放实现 0.5px 细线 */
  background: #EDEFF0;
  transform: scaleY(0.5);
  transform-origin: bottom;
  pointer-events: none;
}
/* 底部滑块（与成长平台一致的动效，贴着标签栏底部且位于文字下方） */
.active-bar {
  position: absolute;
  bottom: 1px;            /* 与底部分隔线紧贴，避免覆盖分隔线 */
  height: 4px;
  background-color: #7DBC52;
  border-radius: 21px;
  z-index: 1;             /* 确保不被分隔线覆盖 */
}
.category-tabs.is-fixed {
  position: fixed;
  top: calc(var(--status-bar-height, env(safe-area-inset-top)) + 44px);
  left: 0;
  right: 0;
  z-index: 90; /* 低于固定标题栏（100），高于内容 */
  /* 无分隔线效果 */
  box-shadow: none;
}
.nav-placeholder {
  transition: height 180ms ease;
}
.tab {
  height: 20px;           /* 标签按钮高度从 32px 调整为 20px */
  padding: 0;              /* 左右 padding 为 0 */
  border-radius: 12px;
  border: none;            /* 去掉边框 */
  background: transparent; /* 去掉填充色 */
  color: #6A6B6B;          /* 未激活状态颜色 */
  font-size: 14px;         /* 字号 14 */
  line-height: 20px;       /* 行高 20 */
  font-weight: 400;        /* 未激活状态字重常规 */
}
.tab.active {
  color: #1A1A1A;          /* 激活状态颜色 */
  font-weight: 600;        /* 激活状态加粗 */
}

/* 热门社群模块 */
.hot-section {
  background: #FFFFFF;
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
}
.hot-title {
  /* Figma: PingFang SC, 500, 16px, 行高约 1.375em，颜色 #1A1A1A */
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #1A1A1A;
  padding-top: 16px;
  padding-bottom: 12px;
}
/* 水平滑动封面卡片 */
.hot-scroll {
  display: flex;
  gap: 12px;
  padding-bottom: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.hot-scroll::-webkit-scrollbar { display: none; }

.hot-item {
  flex: 0 0 auto;
  width: 128px; /* Figma: 卡片宽度 128 */
  text-decoration: none;
  padding: 0; /* 用户要求：上下 padding 0 */
}
.hot-cover {
  width: 100%;
  height: 104px; /* Figma: 封面高度 104 */
  border-radius: 8px; /* Figma: 圆角 8px */
  overflow: hidden;
}
.hot-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.hot-name {
  margin-top: 8px; /* Figma: 图片与名称间距 8px */
  color: #1A1A1A; /* Figma: 文本颜色 #1A1A1A */
  font-size: 14px; /* Figma: 字体 14px */
  line-height: 20px; /* Figma: 行高 20px */
  font-weight: 500; /* Figma: 字重 500 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 活动列表 */
.activity-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 16px; /* 左右与顶部 16px */
  padding-bottom: calc(80px + 44px + env(safe-area-inset-bottom)); /* 为底部固定 TabBar 预留空间，避免最后一项被遮挡 */
}
.activity-card {
  display: grid;
  grid-template-columns: 128px 1fr; /* Figma: 左侧图宽 128 */
  align-items: start; /* 顶部对齐 */
  gap: 0; /* 按要求：左侧卡片与右侧信息之间间距为 0 */
  border: none; /* Figma: 无描边 */
  border-radius: 8px; /* Figma: 整体圆角 8px */
  background: #FFFFFF;
  overflow: hidden;
  padding: 0; /* 用户要求：上下左右 padding 均为 0 */
}
.thumb {
  width: 100%;
  height: 104px; /* Figma: 左侧图高度 104 */
  background-size: cover;
  background-position: center;
  border-radius: 8px 0 0 8px; /* Figma: 左侧图圆角 8,0,0,8 */
  position: relative; /* 为覆盖标签定位 */
}
.info {
  padding: 8px; /* 用户要求：div 内部 padding 8 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 顶部文案盒与底部头像两端对齐 */
  gap: 8px; /* 文案盒与头像之间保留间距 */
  min-height: 104px; /* 与左侧缩略图等高，保证 space-between 生效 */
}
.text-box {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;            /* 用户要求：h3 与 p 之间的间距为 4px */
  width: fit-content;   /* 盒子宽度自适应内容 */
  max-width: 100%;      /* 防止超出容器 */
  padding: 0;           /* 用户要求：上下左右 padding 均为 0 */
  border: none;         /* 用户要求：去除边框 */
  border-radius: 8px;   /* 与整体风格一致的圆角 */
  background: transparent; /* 用户要求：去除背景色 */
}
.title {
  font-size: 14px;      /* Figma: 14 */
  line-height: 20px;    /* Figma: 20 */
  font-weight: 500;     /* Figma: 500 */
  color: #1A1A1A;       /* Figma: #1A1A1A */
  margin: 0;            /* 去除默认间距，交由 gap 控制 */
}
.meta {
  font-size: 10px;      /* Figma: 10 */
  line-height: 14px;    /* Figma: 1.4em 对应约 14px 行高 */
  color: #6A6B6B;       /* Figma: #6A6B6B */
  margin: 0;
}

/* 头像占位图（16x16，-4px 重叠） */
.avatar-row {
  display: flex;
  align-items: center;
}
.avatar {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #EDEFF0; /* 占位灰 */
  border: 1px solid #FFFFFF; /* 叠放时的白色描边分隔 */
}
.avatar + .avatar {
  margin-left: -4px; /* Figma: 重叠间距 -4px */
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

@media (min-width: 768px) {
  .activity-list {
    grid-template-columns: 1fr 1fr;
  }
  /* 大屏下居中并限制最大宽度（容器内的搜索条） */
  .search-bar {
    margin: 0 auto;
    max-width: 680px;
  }
}
</style>