import type {
  RouteRecordRaw,
  RouteLocationPathRaw,
  RouteLocationNamedRaw,
} from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/divisions/:type",
    name: "Divisions",
    component: () => import("@/pages/Divisions.vue"),
  },
];

export const routesDivisions: Readonly<
  (RouteLocationPathRaw & RouteLocationNamedRaw)[]
> = [
  { name: "ФМС", path: "/divisions/0" },
  {
    name: "ГУВД или МВД",
    path: "/divisions/1",
  },
  { name: "УВД или ОВД", path: "/divisions/2" },
  {
    name: "Отделений полиции",
    path: "/divisions/3",
  },
];

export const navigation: Readonly<
  (RouteLocationPathRaw & RouteLocationNamedRaw)[]
> = [
  {
    name: "Главная",
    path: "/",
  },
  ...routesDivisions,
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
