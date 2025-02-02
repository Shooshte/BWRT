export function round(value: number, decimals: number) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

export function formatCurrency(value: number) {
  if (value % 1 === 0) {
    return value.toString();
  }

  const [integer, decimal] = value.toString().split(".");

  let integerString = "";
  for (let i = 0; i < integer.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      integerString += ",";
    }
    integerString += integer[i];
  }

  return `${integerString}.${decimal}`;
}
