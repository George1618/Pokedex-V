import { PokemonType } from "./pokemonType.enum"
import type { Stat } from "./stat.enum"

export type Pokemon = {
    id: number,
    name: string,
    icon: string,
    type1: PokemonType,
    type2: PokemonType | undefined,
    height: number,
    weight: number,
    stats: {
        -readonly [key in keyof typeof Stat]: number
    },
    url: string
}

// sobre os stats:
// key in keyof typeof Stat: entrega todas chaves do enum Stat, que são as palavras à esquerda 
// (sem o keyof, entregaria as à direita)
// -readonly: torna as chaves entregadas acima como não-readonly (por padrão entrega readonly, aí o valor não seria modificável)
