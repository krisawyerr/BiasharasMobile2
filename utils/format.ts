export function formatDollarAmount(amount: string | number, currencyIcon: string): string {
    const number = parseFloat(amount as string);
    if (isNaN(number)) throw new Error("Invalid input: must be a valid number");

    if (Math.abs(number) >= 1e11) {
        return `${number < 0 ? `-${currencyIcon}` : `${currencyIcon}`}${Math.abs(number).toExponential(0)}`;
    }

    return `${number < 0 ? `-${currencyIcon}` : `${currencyIcon}`}${Math.abs(number).toFixed(2)}`;
}
