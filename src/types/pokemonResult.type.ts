export type pokemonResult = {
    height: number,
    id: number,
    name: string,
    sprites: {
        front_default: string
    },
    stats: {
        base_stat: number,
        effort: number,
        stat: {
            name: string
        }
    }[],
    types: {
        slot: number,
        type: {
            name: string,
        }
    }[],
    weight: number
}