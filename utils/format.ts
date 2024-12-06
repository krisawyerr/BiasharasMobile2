export function formatDollarAmount(amount: string | number): string {
    const number = parseFloat(amount as string);
    if (isNaN(number)) throw new Error("Invalid input: must be a valid number");

    if (Math.abs(number) >= 1e11) {
        return `${number < 0 ? '-$' : '$'}${Math.abs(number).toExponential(0)}`;
    }

    return `${number < 0 ? '-$' : '$'}${Math.abs(number).toFixed(2)}`;
}
