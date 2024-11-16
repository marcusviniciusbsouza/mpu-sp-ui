export function paginate(size: number, pageActual: number): { startIndex: number; endIndex: number } {
    const startIndex = (pageActual - 1) * size;
    const endIndex = pageActual * size;
    return { startIndex, endIndex };
}