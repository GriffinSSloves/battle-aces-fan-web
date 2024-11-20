export const delayMs = (ms: number) => {
    const _ms = ms < 0 ? 1 : ms
    return new Promise((resolve) => setTimeout(resolve, _ms))
}
