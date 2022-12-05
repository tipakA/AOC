function makeStacks(lines: Array<string>) {
  const rawStacks: Array<Array<string>> = [];
  const instructions: Array<string> = [];

  let stacksDone = false;
  for (const line of lines) {
    if (line === '') {
      stacksDone = true;
      continue;
    }

    if (!stacksDone) rawStacks.push(line.split(''));
    else instructions.push(line);
  }

  const transposed = rawStacks[0].map((col, i) => rawStacks.map(row => row[i]));
  const stacks = transposed
    .map(x => x.slice(0, -1).reverse())
    .filter(x => !x.every(y => y === ' ' || y === '[' || y === ']'))
    .map(x => x.filter(y => y !== ' '));

  return { stacks, instructions };
}

function parseInstruction(line: string) {
  const split = line.split(' ');
  const count = parseInt(split[1]);
  const src = parseInt(split[3]);
  const dst = parseInt(split[5]);

  return { count, src, dst };
}

function part1(lines: Array<string>) {
  const { stacks, instructions } = makeStacks(lines);

  for (const instruction of instructions) {
    const { count, src, dst } = parseInstruction(instruction);

    for (let i = 0; i !== count; i++) {
      const moved = stacks[src - 1].pop();
      stacks[dst - 1].push(moved!);
    }
  }

  const result = stacks.map(stack => stack.pop()).join('');

  return { result };
}

function part2(lines: Array<string>) {
  const { stacks: _stacks, instructions } = makeStacks(lines);
  const stacks = _stacks.map(stack => stack.join(''));

  for (const instruction of instructions) {
    const { count, src, dst } = parseInstruction(instruction);

    const moved = stacks[src - 1].slice(count * -1);
    stacks[src - 1] = stacks[src - 1].slice(0, count * -1);
    stacks[dst - 1] += moved;
  }

  const result = stacks.map(stack => stack.slice(-1)).join('');

  return { result };
}

export default function d5({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res.result, p2: part2Res.result };
}
