import { createApp } from "vue";
import { createPinia } from "pinia";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.use(store);
app.use(router);
app.use(createPinia()); // 使用 Pinia
app.mount("#app");
