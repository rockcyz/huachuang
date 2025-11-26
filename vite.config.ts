import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // GitHub Pages部署时使用仓库名作为base路径
    // 如果仓库名是 username.github.io，则使用根路径 '/'
    // 否则使用 /仓库名/
    let base = '/';
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      // 如果不是 username.github.io 格式，添加仓库名作为base路径
      if (!repoName.includes('.github.io')) {
        base = `/${repoName}/`;
      }
    } else if (process.env.NODE_ENV === 'production') {
      // 如果本地构建用于 GitHub Pages，默认使用仓库名
      // 这里可以根据实际情况调整
      base = '/huachuang/';
    }
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
