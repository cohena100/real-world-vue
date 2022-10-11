import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "nprogress/nprogress.css";

const app = createApp(App);
app.use(store).use(router);
router.$store = store;
app.mount("#app");
