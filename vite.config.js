import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';


const viteConfig = defineConfig({
    plugins: [
        {enforce: 'pre', ...mdx({})},
        react({include: /\.(jsx|js|mdx|md|tsx|ts)$/})
    ],
    assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.gif'],
    server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          },
          '/img': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/img/, '')
          }
        }
      },
})

export default viteConfig;