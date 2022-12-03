function part1(lines: Array<string>) {
  let current = 0;
  const highest: [number, number, number] = [ 0, 0, 0 ];
  for (const line of lines) {
    if (line === '') {
      current = 0;
      continue;
    }

    const value = parseInt(line);
    const newValue = current + value;
    current = newValue;

    if (newValue > highest[2]) {
      highest[2] = newValue;
    }
    if (highest[2] > highest[1]) {
      const temp = highest[1];
      highest[1] = highest[2];
      highest[2] = temp;
    }
    if (highest[1] > highest[0]) {
      const temp = highest[0];
      highest[0] = highest[1];
      highest[1] = temp;
    }
  }

  return { highest: highest[0], highest3: highest };
}

function part2(data: [number, number, number]) {
  return { sum: data.reduce((a, b) => a + b, 0) };
}

export default function d1({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(part1Res.highest3);

  return { p1: part1Res.highest, p2: part2Res.sum };
}
