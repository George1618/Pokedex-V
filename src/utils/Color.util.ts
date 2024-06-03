import { PokeColors } from "@/types/colors.enum";
import { pokemonType } from "@/types/pokemonType.enum";

export default class Color {
    static getColor(type: pokemonType) {
        let typeKey = type.toLowerCase() as keyof typeof pokemonType;
        return PokeColors[typeKey];
    }
}