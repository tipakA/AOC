// A, X - Rock
// B, Y - Paper
// C, Z - Scissors

const POINTS = Object.freeze({
  draw: 3,
  lose: 0,
  win: 6,

  X: 1,
  Y: 2,
  Z: 3,
});

function part1(lines: Array<string>) {
  let score = 0;

  for (const line of lines) {
    const [ att, def ] = line.split(' ');

    const pickPoints = POINTS[def as keyof typeof POINTS];
    score += pickPoints;

    switch (att) {
      case 'A': {
        if (def === 'X') score += POINTS.draw;
        if (def === 'Y') score += POINTS.win;
        if (def === 'Z') score += POINTS.lose;
        break;
      }
      case 'B': {
        if (def === 'X') score += POINTS.lose;
        if (def === 'Y') score += POINTS.draw;
        if (def === 'Z') score += POINTS.win;
        break;
      }
      case 'C': {
        if (def === 'X') score += POINTS.win;
        if (def === 'Y') score += POINTS.lose;
        if (def === 'Z') score += POINTS.draw;
        break;
      }
    }
  }

  return { score };
}

function getWinPick(att: string): keyof typeof POINTS {
  if (att === 'A') return 'Y';
  if (att === 'B') return 'Z';
  return 'X';
}

function getDrawPick(att: string): keyof typeof POINTS {
  if (att === 'A') return 'X';
  if (att === 'B') return 'Y';
  return 'Z';
}

function getLosingPick(att: string): keyof typeof POINTS {
  if (att === 'A') return 'Z';
  if (att === 'B') return 'X';
  return 'Y';
}

function part2(lines: Array<string>) {
  let score = 0;

  for (const line of lines) {
    const [ att, def ] = line.split(' ');

    switch (def) {
      case 'X': { // lose
        score += POINTS.lose;
        score += POINTS[getLosingPick(att)];
        break;
      }
      case 'Y': { // draw
        score += POINTS.draw;
        score += POINTS[getDrawPick(att)];
        break;
      }
      case 'Z': { // win
        score += POINTS.win;
        score += POINTS[getWinPick(att)];
        break;
      }
    }
  }

  return { score };
}

export default function d2({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res.score, p2: part2Res.score };
}
