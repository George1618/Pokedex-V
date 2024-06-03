import { createRouter, createWebHistory } from 'vue-router';
import Pokedex from '@/pages/Pokedex.vue';
import strings from '@/assets/strings';
import Party from '@/pages/Party.vue';

const navStrings = strings.nav;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: navStrings.routePokedex,
      name: navStrings.labelPokedex,
      component: Pokedex
    },
    {
      path: navStrings.routePokemon+":id",
      name: navStrings.labelPokemon,
      component: Pokedex
    },
    {
      path: navStrings.routeParty,
      name: navStrings.labelParty,
      component: Party
    },
    {
      path: navStrings.routeTrainerCard,
      name: navStrings.labelTrainerCard,
      component: Pokedex
    }
  ]
})

export default router
