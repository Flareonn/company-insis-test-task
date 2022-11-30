<script setup lang="ts">
import { navigation as routes } from "@/plugins/router";
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img
        src="@/assets/images/logo-big.png"
        alt="Логотип компании"
        class="sidebar-logo__image"
      />
      <span class="sidebar-logo__text">виртуальная АТС</span>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li class="sidebar-nav__item" v-for="route in routes">
          <router-link :to="route.path">
            <span>
              {{ route.name }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
  <router-view class="main"></router-view>
</template>
