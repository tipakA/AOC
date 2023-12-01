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

const NUMBERS = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ];
const LONGEST_NUMBER = 5;

function part2(lines: Array<string>) {
  let sum = 0;

  for (const line of lines) {
  /*
    Apparently the numbers can overlap.
    Would be nice if the examples or explanation mentioned this more directly, actually.
  */
    //   let parsedLine = line;
    //   let idx = 1;
    //   for (const digit of NUMBERS) {
    //     parsedLine = parsedLine.replaceAll(digit, () => (idx++).toString());
    //   }

    const parsedFragments: Array<{ i: number, v: number, _s: 'W' | 'D' }> = [];

    /*
      Closer, but words can repeat.
    */
    // for (const digit of NUMBERS) {
    //   const found = line.search(digit);
    //   if (found === -1) {
    //     idxW++;
    //     continue;
    //   }

    const foundIndexes: Array<number> = [];

    for (let i = 0; i <= Math.max(line.length - LONGEST_NUMBER, 0); i++) {
      const slice = line.slice(i, i + LONGEST_NUMBER);

      let idxN = 1;
      for (const digitWord of NUMBERS) {
        const found = slice.search(digitWord);
        if (found === -1) {
          idxN++;
          continue;
        }

        const wordPosition = found + i;
        if (!foundIndexes.includes(wordPosition)) {
          parsedFragments.push({ i: wordPosition, v: idxN++, _s: 'W' });
          foundIndexes.push(wordPosition);
        }

      }

      let idxD = 0 + i;
      for (const char of slice.split('')) {
        const parsed = parseInt(char);
        if (isNaN(parsed)) {
          idxD++;
          continue;
        }

        if (!foundIndexes.includes(idxD)) {
          parsedFragments.push({ i: idxD, v: parsed, _s: 'D' });
          foundIndexes.push(idxD);
        }

        idxD++;
      }
    }

    // console.log({ parsedFragments });

    const sortedFragments = parsedFragments.sort((a, b) => {
      if (a.i > b.i) return 1;
      if (a.i < b.i) return -1;
      return 0;
    }).map(fragment => fragment.v);
    // console.log({ sortedFragments });

    let firstDigit: number | null = null;
    let lastDigit: number | null = null;

    for (const digit of sortedFragments) {
      if (firstDigit === null) firstDigit = digit;
      else lastDigit = digit;
    }

    if (firstDigit === null) throw new Error(`First digit is null for line "${line}"`);

    if (lastDigit === null) lastDigit = firstDigit;
    sum += firstDigit * 10 + lastDigit;
  }

  return sum;
}

export default function d1({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res, p2: part2Res };
}
