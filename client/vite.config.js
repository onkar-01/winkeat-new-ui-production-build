import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      proxy: {
        "/api/v1": "http://localhost:4000/",
      },
    },
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1600,
    },
  });
};
