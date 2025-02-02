import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
// import { sitesProxy as proxy } from "./src/utils/proxy";

export default defineConfig(({ mode }) => {
  return {
    plugins: [tailwindcss(), vue()],
    base: mode === "production" ? "/status/" : "/",
    server: {
      cors: false,
      allowedHosts: true,
    },
  };
});

// export default defineConfig({
//   plugins: [tailwindcss(), vue()],
//   base: "/status/",
//   server: {
//     cors: false,
//     allowedHosts: true,
//     // allowedHosts: ["p11099.cronusweb.com"],
//     // proxy,
//   },
// });
