import { PokeColors } from "@/types/colors.enum";
import { PokemonType } from "@/types/pokemonType.enum";

export default class Color {
    static getColor(type: PokemonType) {
        let typeKey = type.toLowerCase() as keyof typeof PokemonType;
        return PokeColors[typeKey];
    }
}