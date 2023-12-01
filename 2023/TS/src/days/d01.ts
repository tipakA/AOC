function part1(lines: Array<string>) {
  let sum = 0;

  for (const line of lines) {
    let firstDigit: number | null = null;
    let lastDigit: number | null = null;

    for (const char of line.split('')) {
      const parsed = parseInt(char);
      if (isNaN(parsed)) continue;

      if (firstDigit === null) firstDigit = parsed;
      else lastDigit = parsed;
    }

    if (firstDigit === null) throw new Error('First digit is null');

    if (lastDigit === null) lastDigit = firstDigit;
    sum += firstDigit * 10 + lastDigit;
  }

  return sum;
}

function part2(lines: Array<string>) {

}

export default function d1({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res };
}
