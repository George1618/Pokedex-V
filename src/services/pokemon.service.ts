import type { apiResult } from "@/types/apiResult.type";
import api, { baseURL } from "./api.service";
import type { pokemon } from "@/types/pokemon.type";
import type { pokemonResult } from "@/types/pokemonResult.type";
import { pokemonType } from "@/types/pokemonType.enum";
import { Stat } from "@/types/stat.enum";

// limita aos primeiros 151 pokémon, conforme requisitado
const limit = 151;
// ignora essa quantidade de pokémon do início, e pode ser usado com o limite acima para paginação
const offset = 0;

// pega o pokémon pelo seu id (que equivale ao número na pokédex nacional)
export async function getPokemon(id: number) {
    let subroute = `pokemon/${id}`;
    try {
        if (id<=0) return;
        const data = (await api.get(subroute)).data
        return toPokemon(data, baseURL+subroute);
    } catch (error) {
        console.error(error)
    }
}
// pega o pokémon pelo sua url (que equivale ao número na pokédex nacional)
export async function getPokemonByUrl(url: string) {
    try {
        const data = (await api.get(url)).data
        return toPokemon(data, url);
    } catch (error) {
        console.error(error)
    }
}

// entrega todos os pokémon
export async function getAllPokemon() {
    try {
        return (await api.get(`pokemon?limit=${limit}&offset=${offset}`)).data as apiResult
    } catch (error) {
        console.error(error);
    }
}

// simplifica o retorno de 1 pokémon da api para o tipo pokemon
function toPokemon(data: pokemonResult, url: string) : pokemon | undefined {
    try {
        // calcula os tipos
        let type1: pokemonType | undefined = undefined, type2: pokemonType | undefined = undefined;
        if (data.types===undefined) {console.info(data.id)}
        data.types.forEach(({slot, type}) => {
            if (slot===1) type1 = pokemonType[type.name as keyof typeof pokemonType];
            else if (slot===2) type2 = pokemonType[type.name as keyof typeof pokemonType];
        });
        // calcula os stats
        let stats: {-readonly [stat in keyof typeof Stat]: number} = {
            hp: 0, 
            attack: 0, 
            defense: 0, 
            "special-attack": 0, 
            "special-defense": 0,
            speed: 0
        }
        data.stats.forEach(({base_stat, stat}) => {stats[stat.name as keyof typeof Stat] = base_stat});

        if (type1!==undefined) return {
            id: data.id,
            name: data.name,
            icon: data.sprites.front_default,
            type1: type1,
            type2: type2,
            stats: stats,
            height: data.height,
            weight: data.weight,
            url: url
        }
    } catch (error) {
        console.error(error)
        return undefined;
    }
}