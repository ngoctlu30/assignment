const path = require('path');
import reactRefresh from '@vitejs/plugin-react-refresh';
import WindiCSS from 'vite-plugin-windicss';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

module.exports = ({ mode }) => {
  return {
    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        }
      }
    },
    plugins: [
      WindiCSS(),
      react(),
    ],
    define: {
      'process.env': process.env
    },
    server: {
      port: 5000,
      hot: true
    },
  }
}

