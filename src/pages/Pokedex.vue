<script setup lang='ts'>
import strings from '@/assets/strings';
import PokemonCard from '@/components/PokemonCard.vue';
import router from '@/router';
import { usePokedexStore } from '@/stores/pokedex';

const pokedexStore = usePokedexStore();

// ao clicar no Card, vai à página específica dele
function navToPokemon(id: number) {
    router.push(strings.nav.routePokemon+`${id}`);
}

</script>
<template>
    <div class="flex flex-wrap">
        <PokemonCard class="PokemonCard" v-for="(pokemon, index) in pokedexStore.pokedex" 
            :pokemonUrl="pokemon.url"
            :action="(id: number) => navToPokemon(id)"
            :key="index"
            />
    </div>
</template>
<style scoped>
    .PokemonCard {
        height: 25%;
        width: 25%;
    }
</style>