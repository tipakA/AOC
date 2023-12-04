/* eslint-disable no-implicit-coercion */
interface ParsedCard {
  id: number;
  winning: Set<number>;
  owned: Array<number>;
}

function parseCards(lines: Array<string>): Array<ParsedCard> {
  const parsed = [];

  for (const line of lines) {
    const [ _card, _numbers ] = line.split(': ');
    const [ , _id ] = _card.split(/ +/);
    const [ _winning, _owned ] = _numbers.split(' | ');

    const id = parseInt(_id);
    const winning = new Set(_winning.trim().split(/ +/).map(n => parseInt(n)));
    const owned = _owned.trim().split(/ +/).map(n => parseInt(n.trim()));

    parsed.push({ id, winning, owned });
  }

  return parsed;
}

function part1(cards: Array<ParsedCard>) {
  let sum = 0;

  for (const { owned, winning } of cards) {
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

function part2(cards: Array<ParsedCard>) {
  const deck: Record<number, number> = {};

  for (const { id, owned, winning } of cards) {
    if (!deck[id]) deck[id] = 1;
    let wins = 0;

    for (const number of owned) {
      if (winning.has(number)) {
        wins++;
        const currCardCount = deck[id];
        const wonCardCountInPile = deck[id + wins] ?? 1;
        deck[id + wins] = wonCardCountInPile + 1 * currCardCount;
      }
    }
  }

  return Object.values(deck).reduce((a, b) => a + b, 0);
}

export default function d4({ lines }: { lines: Array<string> }) {
  const parsed = parseCards(lines);

  const part1Res = part1(parsed);
  const part2Res = part2(parsed);

  return { p1: part1Res, p2: part2Res };
}
