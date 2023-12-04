/* eslint-disable no-implicit-coercion */
function part1(lines: Array<string>) {
  let sum = 0;

  for (const line of lines) {
    const [ , _numbers ] = line.split(': ');
    const [ _winning, _owned ] = _numbers.split(' | ');

    const winning = new Set(_winning.trim().split(/ +/).map(n => parseInt(n)));
    const owned = _owned.trim().split(/ +/).map(n => parseInt(n.trim()));

    let multiplier = 1;
    let shouldDouble = false;
    for (const number of owned) {
      if (winning.has(number)) {
        sum += 1 * multiplier;
        if (shouldDouble) multiplier *= 2;
        else shouldDouble = true;
      }
    }
  }

  return sum;
}

function part2(lines: Array<string>) {
  const cards: Record<number, number> = {};

  for (const line of lines) {
    const [ _card, _numbers ] = line.split(': ');
    const [ , _id ] = _card.split(/ +/);
    const [ _winning, _owned ] = _numbers.split(' | ');

    const id = parseInt(_id);
    const winning = new Set(_winning.trim().split(/ +/).map(n => parseInt(n)));
    const owned = _owned.trim().split(/ +/).map(n => parseInt(n.trim()));

    if (!cards[id]) cards[id] = 1;
    let wins = 0;

    for (const number of owned) {
      if (winning.has(number)) {
        wins++;
        const currCardCount = cards[id];
        const wonCardCountInPile = cards[id + wins] ?? 1;
        cards[id + wins] = wonCardCountInPile + 1 * currCardCount;
      }
    }
  }

  return Object.values(cards).reduce((a, b) => a + b, 0);
}

export default function d4({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res, p2: part2Res };
}
