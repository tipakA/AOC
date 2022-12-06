function part1(input: string) {
  let packets = [...input.slice(0, 4)];

  const earlyCheck = new Set(packets);
  if (earlyCheck.size === 4) return { packetMarkerEnd: 4 };

  for (let i = 4; i !== input.length; i++) {
    const char = input[i];

    // packets.shift();
    // packets.push(char);
    packets = [ ...packets.slice(1), char ];

    const check = new Set(packets);
    if (check.size === 4) return { packetMarkerEnd: i + 1 };
  }

  return { packetMarkerEnd: null };
}

function part2(input: string) {
  let packets = [...input.slice(0, 14)];

  const earlyCheck = new Set(packets);
  if (earlyCheck.size === 14) return { messageMarkerEnd: 14 };

  for (let i = 14; i !== input.length; i++) {
    const char = input[i];

    packets = [ ...packets.slice(1), char ];

    const check = new Set(packets);
    if (check.size === 14) return { messageMarkerEnd: i + 1 };
  }

  return { messageMarkerEnd: null };
}

export default function d6({ input }: { input: string }) {
  const part1Res = part1(input);
  const part2Res = part2(input);

  return { p1: part1Res.packetMarkerEnd, p2: part2Res!.messageMarkerEnd };
}
