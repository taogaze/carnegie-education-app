import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // GitHub Pages项目仓库部署需要设置base为仓库名路径
  // 访问地址将是：https://<用户名>.github.io/carnegie-education-app/
  base: '/carnegie-education-app/',
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 3000,
    open: true
  }
})