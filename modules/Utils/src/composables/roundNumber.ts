export function roundNumber(number: number, step: number): number {
    return Math.round(number / step) * step;
}
