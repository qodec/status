import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { sitesProxy as proxy } from "./src/utils/proxy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue()],
  server: {
    cors: false,
    allowedHosts: ["p11099.cronusweb.com"],
    // proxy,
  },
});
