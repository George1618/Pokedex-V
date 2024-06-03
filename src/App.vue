<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

import Tabmenu, { type TabMenuChangeEvent } from 'primevue/tabmenu';
import type { MenuItem } from 'primevue/menuitem';

import strings from './assets/strings';
import router from './router';
import { ref, watch } from 'vue';

const navStrings = strings.nav;

// verifica a rota no primeiro carregamento para detectar o tab ativo
const activeIndex = ref<number | undefined>(undefined);
watch(useRoute(), (to) => {
    console.log(to.path)
    switch (to.path) {
        case navStrings.routePokedex: activeIndex.value = 0; break;
        case navStrings.routeParty: activeIndex.value = 1; break;
        case navStrings.routeTrainerCard: activeIndex.value = 2; break;
        default: break;
    }
})

// nomes das rotas de navegação, para o tabmenu que funciona como a navbar
const navItems: MenuItem[] = [
    {label: navStrings.labelPokedex, index: 0},
    {label: navStrings.labelParty, index: 1},
    {label: navStrings.labelTrainerCard, index: 2}
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
        <Tabmenu :activeIndex="activeIndex" :model="navItems" @tab-change="navigate"></Tabmenu>
    </nav>
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
nav {
    width: 100vw;
    height: 10vh;
    display: flex;
    justify-content: center;
}
:deep(.p-tabmenu) {
    width: fit-content;
}
:deep(.p-tabmenu-ink-bar) {
    height: 4px;
}

main {
    width: 100vw;
    height: 90vh;
    overflow: auto;
}
</style>
