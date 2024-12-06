function mul(n: number, m: number) { // eslint-disable-line no-unused-vars
  return n * m;
}

function part1(lines: Array<string>) {
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;

  let mulSum = 0;

  for (const line of lines) {
    const validMuls = line.match(mulRegex);
    if (!validMuls) break;

    for (const mulCall of validMuls) {
      mulSum += eval(mulCall);
    }
  }

  return mulSum;
}

function part2(lines: Array<string>) {

}

export default function d0({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res };
}
