function findMarker(input: string, markerSize: number) {
  if (markerSize > input.length) throw new Error('Marker size cannot be larger than input');
  let packets = [...input.slice(0, markerSize)];

  const earlyCheck = new Set(packets);
  if (earlyCheck.size === markerSize) return markerSize;

  for (let i = markerSize; i !== input.length; i++) {
    const char = input[i];

    packets = [ ...packets.slice(1), char ];

    const check = new Set(packets);
    if (check.size === markerSize) return i + 1;
  }

  return -1;
}

function part1(input: string) {
  const marker = findMarker(input, 4);
  if (marker === -1) throw new Error('Marker of size 4 not found in the input');

  return { packetMarkerEnd: marker };
}

function part2(input: string) {
  const marker = findMarker(input, 14);
  if (marker === -1) throw new Error('Marker of size 14 not found in the input');

  return { messageMarkerEnd: marker };
}

export default function d6({ input }: { input: string }) {
  const part1Res = part1(input);
  const part2Res = part2(input);

  return { p1: part1Res.packetMarkerEnd, p2: part2Res!.messageMarkerEnd };
}
