function part1(lines: Array<string>) {
  let result = 0;

  for (const line of lines) {
    const compartments: [Array<string>, Array<string>] = [
      line.slice(0, line.length / 2).split(''),
      line.slice(line.length / 2).split(''),
    ];

    const doubled = compartments[0].find(item => compartments[1].includes(item));
    if (!doubled) throw new Error(`Nothing in ${line}`);

    const newPriority = doubled.charCodeAt(0) - 96;
    if (newPriority > 0) result += newPriority;
    else result += newPriority + 58;
  }

  return { result };
}

export default function d3({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);

  return { p1: part1Res.result };
}
