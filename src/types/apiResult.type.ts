export type apiResult = {
    count: number,
    next: string,
    previous: string,
    results: {name: string, url: string}[]
}