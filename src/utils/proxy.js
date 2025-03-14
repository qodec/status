import fs from "fs";
import path from "path";

// For ViteConfig to list out sites in sites.json (proxy)
const isProd = process.env.NODE_ENV === "production";
const fp = path.resolve(__dirname, isProd ? "../../public/status/sites.json" : "../../public/sites.json");
const sites = JSON.parse(fs.readFileSync(fp, "utf-8"));

export const sitesProxy = sites.reduce((acc, { domain }) => {
  // const domainName = domain.replace(/^https?:\/\//, ''); // Extract the domain by removing 'https://' or 'http://'
  acc["/" + domain] = {
    target: "https://" + domain,
    changeOrigin: true,
    rewrite: (path) => "",
  };
  return acc;
}, {});
