import { getAllPokemon } from '@/services/pokemon.service';
import type { apiResult } from '@/types/apiResult.type';

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePokedexStore = defineStore('pokedex', () => {
    const pokedex = ref<{name: string, url: string}[]>([]);
  
    getAllPokemon().then((value) => {
        if (value!==undefined) pokedex.value = value.results;
    })

    return { pokedex }
})
