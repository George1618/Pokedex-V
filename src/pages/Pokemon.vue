<script setup lang='ts'>
import strings from '@/assets/strings';
import router from '@/router';
import { usePartyStore } from '@/stores/party';

const partyStore = usePartyStore();

function navToPokemon(id: number) {
    router.push(strings.nav.routePokemon+`${id}`)
}

</script>
<template>
    <div class="flex flex-wrap">
    </div>
</template>
<style scoped>
    div {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .PokemonCard {
        height: 33%;
        width: 50%;
    }
</style>