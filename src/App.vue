<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

import Tabmenu, { type TabMenuChangeEvent } from 'primevue/tabmenu';
import type { MenuItem } from 'primevue/menuitem';

import strings from './assets/strings';
import router from './router';
import { ref } from 'vue';

const navStrings = strings.nav;
// verifica a rota no primeiro carregamento para detectar o tab ativo
let currentRoute: number | undefined = undefined; 
switch (router.currentRoute.value.path) {
  case navStrings.routePokedex: currentRoute = 0; break;
  case navStrings.routeParty: currentRoute = 1; break;
  case navStrings.routeTrainerCard: currentRoute = 2; break;
  default: break;
}
const activeIndex = ref(currentRoute);

// nomes das rotas de navegação, para o tabmenu que funciona como a navbar
const navItems: MenuItem[] = [
  {label: navStrings.labelPokedex},
  {label: navStrings.labelParty,},
  {label: navStrings.labelTrainerCard}
];

// faz a navegação entre as rotas
function navigate(ev: TabMenuChangeEvent) {
  activeIndex.value = ev.index;
  switch (ev.index) {
    case 0: router.push(navStrings.routePokedex); break;
    case 1: router.push(navStrings.routeParty); break;
    case 2: router.push(navStrings.routeTrainerCard); break;
    default: activeIndex.value=undefined; break;
  }
}
</script>

<template>
  <nav>
    <Tabmenu :active-index="activeIndex" :model="navItems" @tab-change="navigate"></Tabmenu>
  </nav>
  <RouterView />
</template>

<style scoped>
  nav {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  :deep(.p-tabmenu) {
    width: fit-content;
  }
  :deep(.p-tabmenu-ink-bar) {
    height: 4px;
  }
</style>
