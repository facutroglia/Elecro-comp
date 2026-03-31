import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL || "http://localhost:3000/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/assets": {
          target: env.VITE_BACKEND_PUBLIC || "http://localhost:3000/public/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/assets/, ""),
        },
      },
    },
  };
});
