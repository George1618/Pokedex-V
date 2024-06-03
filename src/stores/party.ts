import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePartyStore = defineStore('party', () => {
    // salva as url's de cada pokémon da party, pois o PokemonCard usa a url para obter os dados
    const party = ref<string[]>([])

    // adiciona o pokémon ao primeiro slot vazio; se estiver cheio (max. 6), retorna que não adicionou
    function addPokemon(pokemonUrl: string) {
        // primeiro verifica se o pokémon já está na party
        if (party.value.findIndex(url => url===pokemonUrl)>=0) return;
        // para a party, seguindo a regra de negócio dos jogos princiais, será limitado a 6 slots de pokémon
        if (party.value.length<6) {party.value.push(pokemonUrl); return true;}
        else {return false};
    }

    // remove o pokémon pela sua url
    function removePokemon(pokemonUrl: string) {
        let index = party.value.findIndex(url => url===pokemonUrl);
        if (index>=0) party.value.splice(index, 1);
    }

    return { party, addPokemon, removePokemon }
});
