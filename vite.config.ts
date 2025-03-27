import { defineConfig, UserConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./__tests__/vitest.setup.ts",
    // Exclude files in c8
    coverage: {
      exclude: ["vitest.setup.ts"],
    },
  },
  
} as UserConfig);
