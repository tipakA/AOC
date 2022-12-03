function getPriority(item: string) {
  const priority = item.charCodeAt(0) - 96;
  if (priority > 0) return priority;
  else return priority + 58;
}

function part1(lines: Array<string>) {
  let priority = 0;

  for (const line of lines) {
    const compartments: [Array<string>, Array<string>] = [
      line.slice(0, line.length / 2).split(''),
      line.slice(line.length / 2).split(''),
    ];

    const doubled = compartments[0].find(item => compartments[1].includes(item));
    if (!doubled) throw new Error(`Nothing in ${line}`);

    priority += getPriority(doubled);
  }

  return { priority };
}

function part2(lines: Array<string>) {
  let priority = 0;

  for (let i = 2; i < lines.length; i += 3) {
    const backpacks = [
      lines[i - 2].split(''),
      lines[i - 1].split(''),
      lines[i].split(''),
    ];

    const firstTwo = backpacks[0].filter(item => backpacks[1].includes(item));
    const found = backpacks[2].find(item => firstTwo.includes(item));
    if (!found) throw new Error(`Nothing in ${backpacks}`);

    priority += getPriority(found);
  }

  return { priority };
}

export default function d3({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res.priority, p2: part2Res.priority };
}
