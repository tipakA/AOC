const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

function part1(lines: Array<string>) {
  let sum = 0;

  for (const line of lines) {
    const [ _game, _hands ] = line.split(':');
    const [ , _id ] = _game.split(' ');
    const hands = _hands.split(';')
      .map(hand => hand.trim().split(', '));

    let gameValid = true;

    for (const hand of hands) {
      for (const aaa of hand) {
        const [ _amount, _color ] = aaa.split(' ');
        const amount = parseInt(_amount);
        const colorLimit = LIMITS[_color as keyof typeof LIMITS];

        if (amount > colorLimit) {
          gameValid = false;
          break;
        }
      }
    }
    if (gameValid) sum += parseInt(_id);
  }

  return sum;
}

function part2(lines: Array<string>) {

}

export default function d2({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res };
}
