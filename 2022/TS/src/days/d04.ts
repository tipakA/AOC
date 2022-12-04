function visualize(min: number, max: number) {
  let out = '';

  out += '.'.repeat(min - 1);
  out += 'X'.repeat(max - min + 1);
  out = out.padEnd(100, '.');

  return out;
}


function part1(lines: Array<string>) {
  let count = 0;

  for (const line of lines) {
    const assignments = line.split(',');
    const [ min1, max1 ] = assignments[0].split('-').map(x => parseInt(x));
    const [ min2, max2 ] = assignments[1].split('-').map(x => parseInt(x));

    let shouldAdd = false;

    if (min1 >= min2 && max1 <= max2) shouldAdd = true;
    if (min1 <= min2 && max1 >= max2) shouldAdd = true;

    if (shouldAdd) count++;
  }

  return { count };
}

function part2(lines: Array<string>) {
  let count = 0;

  for (const line of lines) {
    const assignments = line.split(',');
    const [ min1, max1 ] = assignments[0].split('-').map(x => parseInt(x));
    const [ min2, max2 ] = assignments[1].split('-').map(x => parseInt(x));

    let shouldAdd = false;

    if (min1 >= min2 && max2 >= min1) shouldAdd = true;
    if (min2 >= min1 && max1 >= min2) shouldAdd = true;

    if (shouldAdd) count++;
  }

  return { count };
}

export default function d0({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res.count, p2: part2Res.count };
}
