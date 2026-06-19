import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function inlineCssPlugin(): Plugin {
  let collectedCss = "";
  return {
    name: "inline-css",
    apply: "build",
    generateBundle(_options, bundle) {
      for (const [name, chunk] of Object.entries(bundle)) {
        if (name.endsWith(".css") && chunk.type === "asset") {
          collectedCss += chunk.source as string;
          delete bundle[name];
        }
      }
    },
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html
          .replace(/<link rel="stylesheet"[^>]*>/g, "")
          .replace("</head>", `<style>${collectedCss}</style>\n</head>`);
      },
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    inlineCssPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "src/assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
          ],
        },
      },
    },
  },
  server: {
    port: 5000,
    host: "0.0.0.0",
  },
  preview: {
    port: 5000,
    host: "0.0.0.0",
  },
});
