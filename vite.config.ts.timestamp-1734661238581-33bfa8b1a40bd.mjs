// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/vite@5.4.10_@types+node@22.8.7_less@4.2.0_sass-embedded@1.81.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/unplugin-auto-import@0.19.0_@vueuse+core@12.0.0_typescript@5.6.3__rollup@4.24.3/node_modules/unplugin-auto-import/dist/vite.js";
import vue from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.10_@types+node@22.8.7_less@4.2.0_sass-embedded@1.81.0_terse_lqp4vil5keli6ocxfrh6yuefg4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.4.10_@types+node@22.8.7_less@4.2.0_sass-embedded@1.81.0_t_s5ikh5tci6b53n3lfyo2phjsny/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@4.24.3_vue@3.5.12_typescript@5.6.3__webpack-sources@3.2.3/node_modules/unplugin-vue-components/dist/vite.js";
import {
  ElementPlusResolver,
  VantResolver
} from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@4.24.3_vue@3.5.12_typescript@5.6.3__webpack-sources@3.2.3/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.10_@types+node@22.8.7_less@4.2.0_sass-embedded@1.81.0_terser@5.36.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import mockDevServerPlugin from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/vite-plugin-mock-dev-server@1.8.0_esbuild@0.21.5_rollup@4.24.3_vite@5.4.10_@types+node@22.8.7_vrnc2vribovwhwpa4sv5dmlub4/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import viteCompression from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.10_@types+node@22.8.7_less@4.2.0_sass-embedded@1.81.0_terser@5.36.0_/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.10_@types+node@22.8.7_less@4.2.0_sass-embedded@1.81.0_terser@5.36.0_/node_modules/vite-plugin-html/dist/index.mjs";

// build/cdn.ts
import { cdn } from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/vite-plugin-cdn2@1.1.0_rollup@4.24.3/node_modules/vite-plugin-cdn2/dist/index.mjs";
import { unpkg } from "file:///D:/myProjects/supreme-bassoon/node_modules/.pnpm/vite-plugin-cdn2@1.1.0_rollup@4.24.3/node_modules/vite-plugin-cdn2/dist/resolver/unpkg.mjs";
function enableCDN(isEnabled) {
  if (isEnabled === "true") {
    return cdn({
      resolve: unpkg(),
      modules: ["vue", "vue-demi", "pinia", "axios", "vant", "vue-router"]
    });
  }
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///D:/myProjects/supreme-bassoon/vite.config.ts";
var root = process.cwd();
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      vueJsx(),
      mockDevServerPlugin(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver()
          // 自动导入图标组件
          // IconsResolver({})
        ],
        eslintrc: {
          // 是否自动生成 eslint 规则，建议生成之后设置 false
          enabled: false,
          // 指定自动导入函数 eslint 规则的文件
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        },
        // 是否在 vue 模板中自动导入
        vueTemplate: true,
        // 指定自动导入函数TS类型声明文件路径 (false:关闭自动生成)
        dts: false
        // dts: "src/typings/auto-imports.d.ts",
      }),
      // vant 组件自动按需引入
      Components({
        dts: "src/typings/components.d.ts",
        resolvers: [VantResolver()]
      }),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      }),
      // 生产环境默认不启用 CDN 加速
      enableCDN(env.VITE_CDN_DEPS)
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      host: true,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        "^/dev-api": {
          target: ""
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvY2RuLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXlQcm9qZWN0c1xcXFxzdXByZW1lLWJhc3Nvb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15UHJvamVjdHNcXFxcc3VwcmVtZS1iYXNzb29uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teVByb2plY3RzL3N1cHJlbWUtYmFzc29vbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xyXG5pbXBvcnQge1xyXG4gIEVsZW1lbnRQbHVzUmVzb2x2ZXIsXHJcbiAgVmFudFJlc29sdmVyXHJcbn0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xyXG4vLyBpbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tIFwidW5wbHVnaW4taWNvbnMvcmVzb2x2ZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBtb2NrRGV2U2VydmVyUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXJcIjtcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XHJcbmltcG9ydCB7IGVuYWJsZUNETiB9IGZyb20gXCIuL2J1aWxkL2NkblwiO1xyXG5cclxuLy8gXHU1RjUzXHU1MjREXHU1REU1XHU0RjVDXHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0XHJcbmNvbnN0IHJvb3Q6IHN0cmluZyA9IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgLy8gXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290LCBcIlwiKTtcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogZW52LlZJVEVfUFVCTElDX1BBVEggfHwgXCIvXCIsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgbW9ja0RldlNlcnZlclBsdWdpbigpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgVnVlIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQXJlZiwgcmVhY3RpdmUsIHRvUmVmIFx1N0I0OVxyXG4gICAgICAgIGltcG9ydHM6IFtcInZ1ZVwiLCBcIkB2dWV1c2UvY29yZVwiLCBcInBpbmlhXCIsIFwidnVlLXJvdXRlclwiLCBcInZ1ZS1pMThuXCJdLFxyXG4gICAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAoXHU1RTI2XHU2ODM3XHU1RjBGKVxyXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxyXG4gICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XHJcbiAgICAgICAgICAvLyBJY29uc1Jlc29sdmVyKHt9KVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgIC8vIFx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMCBlc2xpbnQgXHU4OUM0XHU1MjE5XHVGRjBDXHU1RUZBXHU4QkFFXHU3NTFGXHU2MjEwXHU0RTRCXHU1NDBFXHU4QkJFXHU3RjZFIGZhbHNlXHJcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTFGRFx1NjU3MCBlc2xpbnQgXHU4OUM0XHU1MjE5XHU3Njg0XHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICBmaWxlcGF0aDogXCIuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uXCIsXHJcbiAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBcdTY2MkZcdTU0MjZcdTU3MjggdnVlIFx1NkEyMVx1Njc3Rlx1NEUyRFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxyXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTFGRFx1NjU3MFRTXHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0IChmYWxzZTpcdTUxNzNcdTk1RURcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTApXHJcbiAgICAgICAgZHRzOiBmYWxzZVxyXG4gICAgICAgIC8vIGR0czogXCJzcmMvdHlwaW5ncy9hdXRvLWltcG9ydHMuZC50c1wiLFxyXG4gICAgICB9KSxcclxuICAgICAgLy8gdmFudCBcdTdFQzRcdTRFRjZcdTgxRUFcdTUyQThcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjVcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgZHRzOiBcInNyYy90eXBpbmdzL2NvbXBvbmVudHMuZC50c1wiLFxyXG4gICAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXVxyXG4gICAgICB9KSxcclxuICAgICAgLy8gc3ZnIGljb25cclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHJvb3QsIFwic3JjL2ljb25zL3N2Z1wiKV0sXHJcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBIHN5bWJvbElkIFx1NjgzQ1x1NUYwRlxyXG4gICAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4MyBnemlwIFx1NTM4Qlx1N0YyOVx1OEQ0NFx1NkU5MFxyXG4gICAgICB2aXRlQ29tcHJlc3Npb24oKSxcclxuICAgICAgLy8gXHU2Q0U4XHU1MTY1XHU2QTIxXHU2NzdGXHU2NTcwXHU2MzZFXHJcbiAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xyXG4gICAgICAgIGluamVjdDoge1xyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBFTkFCTEVfRVJVREE6IGVudi5WSVRFX0VOQUJMRV9FUlVEQSB8fCBcImZhbHNlXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTlFRDhcdThCQTRcdTRFMERcdTU0MkZcdTc1MjggQ0ROIFx1NTJBMFx1OTAxRlxyXG4gICAgICBlbmFibGVDRE4oZW52LlZJVEVfQ0ROX0RFUFMpXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIC8vIFx1NEVDNVx1NTcyOCBwcm94eSBcdTRFMkRcdTkxNERcdTdGNkVcdTc2ODRcdTRFRTNcdTc0MDZcdTUyNERcdTdGMDBcdUZGMEMgbW9jay1kZXYtc2VydmVyIFx1NjI0RFx1NEYxQVx1NjJFNlx1NjIyQVx1NUU3NiBtb2NrXHJcbiAgICAgIC8vIGRvYzogaHR0cHM6Ly9naXRodWIuY29tL3Blbmd6aGFuYm8vdml0ZS1wbHVnaW4tbW9jay1kZXYtc2VydmVyXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgXCJeL2Rldi1hcGlcIjoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwic3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanNcIixcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXlQcm9qZWN0c1xcXFxzdXByZW1lLWJhc3Nvb25cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15UHJvamVjdHNcXFxcc3VwcmVtZS1iYXNzb29uXFxcXGJ1aWxkXFxcXGNkbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXlQcm9qZWN0cy9zdXByZW1lLWJhc3Nvb24vYnVpbGQvY2RuLnRzXCI7aW1wb3J0IHsgY2RuIH0gZnJvbSBcInZpdGUtcGx1Z2luLWNkbjJcIjtcclxuaW1wb3J0IHsgdW5wa2cgfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuMi9yZXNvbHZlci91bnBrZ1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUNETihpc0VuYWJsZWQ6IHN0cmluZykge1xyXG4gIGlmIChpc0VuYWJsZWQgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICByZXR1cm4gY2RuKHtcclxuICAgICAgcmVzb2x2ZTogdW5wa2coKSxcclxuICAgICAgbW9kdWxlczogW1widnVlXCIsIFwidnVlLWRlbWlcIiwgXCJwaW5pYVwiLCBcImF4aW9zXCIsIFwidmFudFwiLCBcInZ1ZS1yb3V0ZXJcIl1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStRLFNBQVMsZUFBZSxXQUFXO0FBQ2xULFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkI7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLE9BQ0s7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
