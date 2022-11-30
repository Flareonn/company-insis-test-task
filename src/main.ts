import { createApp } from "vue";
import "reset-css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "@/assets/style/index.less";
import PrimeVue from "primevue/config";

import App from "@/App.vue";
import VueRouter from "@/plugins/router";
import VueAxios from "vue-axios";
import VueStore from "@/plugins/store";
import axios from "@/plugins/axios";
import DivisionService from "@/services/divisions.service";

import { AxiosKey, DivisionKey } from "@/utils/keys";

const divisionsService = new DivisionService("66");
createApp(App)
  .use(PrimeVue)
  .use(VueRouter)
  .use(VueStore)
  .use(VueAxios, axios)
  .provide(AxiosKey, axios)
  .provide(DivisionKey, divisionsService)
  .mount("#app");

const filter = (input: string, array: DivisionUnit[]) => {
  const formdattedInput = input.toLowerCase();
  return array.filter(
    (division) =>
      division.name.toLowerCase().includes(formdattedInput) ||
      division.code.includes(formdattedInput)
  );
};
