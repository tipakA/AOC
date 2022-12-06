function part1(lines: string) {
  let packets = [...lines.slice(0, 4)];

  const earlyCheck = new Set(packets);
  if (earlyCheck.size === 4) return { markerEnd: 4 };

  for (let i = 4; i !== lines.length; i++) {
    const char = lines[i];

    // packets.shift();
    // packets.push(char);
    packets = [ ...packets.slice(1), char ];

    const check = new Set(packets);
    if (check.size === 4) return { markerEnd: i + 1 };
  }

  return { markerEnd: null };
}

function part2(lines: string) {

}

export default function d6({ input }: { input: string }) {
  const part1Res = part1(input);
  const part2Res = part2(input);

  return { p1: part1Res.markerEnd };
}
