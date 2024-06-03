<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from 'primevue/card';
import type { pokemon } from '@/types/pokemon.type';
import { getPokemonByUrl } from '@/services/pokemon.service';
import { PokeColors } from '@/types/colors.enum';
import type { pokemonType } from '@/types/pokemonType.enum';
import Color from '@/utils/Color.util';

const props = defineProps<{
    pokemonUrl: string;
    action: (id: number) => void;
}>();

const pokemon = ref<pokemon | undefined>(undefined)

onMounted(() => {
    // aqui se obtém os dados do pokémon
    getPokemonByUrl(props.pokemonUrl).then(value => {
        pokemon.value = value;
    })
});

// adicional: calcula as cores para o background do Card ir além do branco
function typeGradient(type1: pokemonType, type2: pokemonType | undefined) {
    let color1 = Color.getColor(type1);
    let color2 = type2===undefined ? color1 : Color.getColor(type2);
    return `background: linear-gradient(135deg, ${color1}, 2%, #fff, 96%, ${color2});`;
}

</script>
<template>
    <Card v-if="pokemon!==undefined" 
        :style="typeGradient(pokemon.type1, pokemon.type2)"
        @click="() => {if (pokemon!==undefined) action(pokemon.id)}"
    >
        <template #header>
            <img :alt="pokemon.name" :src="pokemon.icon" />
        </template>
        <template #title><p>{{ pokemon.name.toUpperCase() }}</p></template>
        <template #subtitle>  
            <p>
                <span>{{ "#"+`${pokemon.id}`.padStart(4, '0')+" | " }}</span>
                <span>{{ pokemon.type1 }}</span>
                <span>{{ pokemon.type2 ? "/"+pokemon.type2 : "" }}</span>
            </p>
        </template>
    </Card>
    <Card v-else class="EmptyCard"></Card>
</template>
<style scoped>
    .EmptyCard {
        background: rgba(0,0,0,0.1);
    }

    .p-card {
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
    .p-card:hover {
        background: rgba(0, 0, 0, 0.2) !important;
    }
    .p-card:hover p {
        color: black;
    }
    
    :deep(.p-card-header), :deep(.p-card-body) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    :deep(.p-card-caption) {
        width: fit-content;
    }
</style>