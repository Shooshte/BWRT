export function round(value: number, decimals: number) {
  // @ts-expect-error - adding e to a number is valid
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

export function formatCurrency(value: number) {
  const [integer, decimal] = value.toString().split(".");
  const cleanedInteger = integer.replace("-", "");

  const start = cleanedInteger.length % 3;

  let integerString = "";

  if (cleanedInteger.length <= 3) {
    integerString = cleanedInteger;
  } else {
    integerString = cleanedInteger.slice(0, start);
    if (start > 0) {
      integerString += ",";
    }
    const remainingInteger = cleanedInteger.slice(start, cleanedInteger.length);

    for (let i = 0; i < remainingInteger.length; i++) {
      if (i % 3 === 0 && i > 0) {
        integerString += ",";
      }

      integerString += remainingInteger.at(i);
    }
  }

  if (cleanedInteger.length !== integer.length) {
    integerString = "-" + integerString;
  }

  if (decimal) {
    return `${integerString}.${decimal}`;
  }

  return integerString;
}
