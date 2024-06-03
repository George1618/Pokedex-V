<script setup lang='ts'>
import strings from '@/assets/strings';
import { getPokemon } from '@/services/pokemon.service';
import { usePartyStore } from '@/stores/party';
import type { pokemon } from '@/types/pokemon.type';
import type { pokemonType } from '@/types/pokemonType.enum';
import Color from '@/utils/Color.util';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import { onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const pokemonStrings = strings.pokemon;
const routeString = strings.nav.routePokemon;

const route = useRoute();

const pokemon = ref<pokemon | undefined>(undefined)

// pega o id dos parâmetros da página e obtém os dados do pokémon
function updatePokemon() {
    getPokemon(Number.parseInt(route.params['id'] as string)).then((value) => {
        pokemon.value = value
    })
} 

// no primeiro acesso
onMounted(() => {updatePokemon()})

// nas navegações dentro do componente
watch(route, () => {updatePokemon()})

// controla adição e remoção no time
const partyStore = usePartyStore();
const party = partyStore.party;

function partyHas(pokemonUrl: string) { // verifica se o pokémon está ou não no time
    return party.findIndex(url => url===pokemonUrl)>=0
}
function addPokemon(pokemon: pokemon) { // tenta adicionar ao time; não dando certo, emite um alerta
    let added = partyStore.addPokemon(pokemon.url);
    if (added===false) {alert(pokemonStrings.notAdded)}
}
function removePokemon(pokemon: pokemon) { // remove do time
    partyStore.removePokemon(pokemon.url)
}

// dá o background apenas para o primeiro tipo do pokémon
function typeBackground(type: pokemonType) {
    return `background: ${Color.getColor(type)}`;
}
// usado para normalizar os valores dos stats em porcentagens
const r = 100/255;
function ratio(stat: number) {
    return Math.max(2, Math.ceil(stat*r));
}

</script>
<template>
    <header v-if="pokemon!==undefined" :style="typeBackground(pokemon.type1)">
        <img :src="pokemon.icon" :alt="pokemon.name">
        <div>
            <h1>{{ pokemon.name.toUpperCase() }}</h1>
            <Button v-if="partyHas(pokemon.url)" class="RemoveButton"
                @click="() => removePokemon(pokemon!)">{{ pokemonStrings.buttonRemove }}</Button>
            <Button v-else class="AddButton"
                @click="() => addPokemon(pokemon!)">{{ pokemonStrings.buttonAdd }}</Button>
        </div>
        <RouterLink v-if="pokemon.id>1" :to="`${routeString}${pokemon.id-1}`">
            {{ "< #"+`${pokemon.id-1}`.padStart(4, '0') }}
        </RouterLink>
        <RouterLink v-if="pokemon.id<151" :to="`${routeString}${pokemon.id+1}`">
            {{ "#"+`${pokemon.id+1}`.padStart(4, '0') + " >" }}
        </RouterLink>
    </header>
    <section v-if="pokemon!==undefined" class="flex flex-wrap">
        <label id="labelType">{{ pokemonStrings.labelType }}</label>
        <span class="Type" aria-labelledby="labelType"
            :style="typeBackground(pokemon.type1)"
            >{{ pokemon.type1 }}</span>
        <span class="Type" v-if="pokemon.type2!==undefined" aria-labelledby="labelType"
            :style="typeBackground(pokemon.type2)"
            >{{ pokemon.type2 }}</span>
        <div>
            <label id="labelHeight">{{ pokemonStrings.labelHeight }}</label>
            <span aria-labelledby="labelHeight">{{ pokemon.height }}</span>
            <label id="labelWeight">{{ pokemonStrings.labelWeight }}</label>
            <span aria-labelledby="labelWeight">{{ pokemon.weight }}</span>
        </div>
        <p id="labelStats">{{ pokemonStrings.labelStats }}</p>
        <label id="labelHP">{{ pokemonStrings.labelHP }}</label>
        <ProgressBar id="valueHP" :value="ratio(pokemon.stats.hp)" aria-labelledby="labelHP">
            {{ pokemon.stats.hp }}
        </ProgressBar>
        <label id="labelATK">{{ pokemonStrings.labelATK }}</label>
        <ProgressBar id="valueATK" :value="ratio(pokemon.stats.attack)" aria-labelledby="labelATK">
            {{ pokemon.stats.attack }}
        </ProgressBar>
        <label id="labelDEF">{{ pokemonStrings.labelDEF }}</label>
        <ProgressBar id="valueDEF" :value="ratio(pokemon.stats.defense)" aria-labelledby="labelDEF">
            {{ pokemon.stats.defense }}
        </ProgressBar>
        <label id="labelSPA">{{ pokemonStrings.labelSPA }}</label>
        <ProgressBar id="valueSPA" :value="ratio(pokemon.stats['special-attack'])" aria-labelledby="labelSPA">
            {{ pokemon.stats['special-attack'] }}
        </ProgressBar>
        <label id="labelSPD">{{ pokemonStrings.labelSPD }}</label>
        <ProgressBar id="valueSPD" :value="ratio(pokemon.stats['special-defense'])" aria-labelledby="labelSPD">
            {{ pokemon.stats['special-defense'] }}
        </ProgressBar>
        <label id="labelSPE">{{ pokemonStrings.labelSPE }}</label>
        <ProgressBar id="valueSPE" :value="ratio(pokemon.stats.speed)" aria-labelledby="labelSPE">
            {{ pokemon.stats.speed }}
        </ProgressBar>
    </section>
</template>
<style scoped>
    h1, button, a, label, p, .Type {
        font-weight: bolder;
    }

    header {
        height: 30%;
        display: flex;
    }
    header > img {
        height: 30vh;
        width: 30vh;
    }
    header > div {
        width: calc(100% - 60vh);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    header > div > h1 {
        height: 60%;
        font-size: 2rem;
        align-content: flex-end;
    }
    header > div > button {
        height: 20%;
        width: fit-content;
        padding: 5px 10px;
        border: 2px solid white;
        border-radius: 1vh;
    }
    header > a {
        height: 100%;
        width: 15vh;
        font-size: 3vh;
        color: white;
        text-align: center;
    }

    .AddButton {border-color: lightgreen; background: rgba(144, 238, 144, 0.7);}
    .RemoveButton {border-color: lightcoral; background: rgba(240, 128, 128,0.7);}

    section {
        height: 60%;
        padding: 5vh 1vw;
    }

    section label {
        display: inline-block;
        height: 5vh;
        width: 5rem;
        text-align: center;
        align-content: center;
    }

    section > div {
        width: calc(100% - 2vw);
    }

    .Type {
        height: 5vh;
        width: 10rem;
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 1vh;
        text-align: center;
        align-content: center;
        margin-right: 1vw;
        color: white;
    }

    #labelStats {
        width: 98vw;
    }

    .p-progressbar {
        display: inline-block;
        height: 5vh;
        width: calc(50vw - 5rem);
        margin-right: 48vw;
        background: inherit;
    }
    .p-progressbar > :deep(.p-progressbar-value) {
        background: #222;
        border-radius: inherit;
    }

    #labelHP  { text-decoration: yellow underline;}
    #labelATK { text-decoration: red underline;}
    #labelDEF { text-decoration: royalblue underline;}
    #labelSPA { text-decoration: aqua underline;}
    #labelSPD { text-decoration: pink underline;}
    #labelSPE { text-decoration: greenyellow underline;}

    #valueHP  { border: 2px solid yellow;}
    #valueATK { border: 2px solid red;}
    #valueDEF { border: 2px solid royalblue;}
    #valueSPA { border: 2px solid aqua;}
    #valueSPD { border: 2px solid pink;}
    #valueSPE { border: 2px solid greenyellow;}
    
</style>