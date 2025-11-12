import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 通过环境变量控制 base：
// - 默认值用于项目页部署：/carnegie-education-app/
// - 根域部署时（taogaze.github.io）可在构建前设置 VITE_BASE=/
const BASE = process.env.VITE_BASE || '/carnegie-education-app/'

export default defineConfig({
  base: BASE,
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 3000,
    // 自动打开到正确的 base 子路径，避免空白页
    open: '/carnegie-education-app/'
  }
})