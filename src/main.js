import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { ViteSSG } from "vite-ssg";
// import { createHead } from "@vueuse/head";

const app = createApp(App);
// const head = createHead()

app.use(router);
// app.use(head);
//一定最后挂载
app.mount("#app");

// export const createApp = ViteSSG(App, { routes }, ({ app, router }) => {
//   const head = createHead();
//   app.use(head);
//   // 如果有其他插件，比如 router，也可以一起在这里注册
//   app.use(router);
// });
