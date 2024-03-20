import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  optimizeDeps: {
    include: ["quill-blot-formatter", "quill-image-uploader"],
  },
});
