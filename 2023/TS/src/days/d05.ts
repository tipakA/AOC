function part1(lines: Array<string>) {
  const seeds = lines[0].replace('seeds: ', '').split(' ').map(s => parseInt(s));
  const maps: Record<string, Array<[[number, number], [number, number]]>> = {
    soil: [],
    fertilizer: [],
    water: [],
    light: [],
    temperature: [],
    humidity: [],
    location: [],
  };

  const modes = Object.keys(maps);

  let modeIdx = 0;
  let mode = modes[modeIdx] as keyof typeof maps;

  for (const line of lines.slice(2)) {
    if (line.endsWith(':')) continue;
    if (line === '') {
      modeIdx++;
      mode = modes[modeIdx] as keyof typeof maps;
      continue;
    }

    const [ _dest, _src, _range ] = line.split(' ').map(x => parseInt(x));
    maps[mode].push([
      [ _src, _src + _range - 1 ],
      [ _dest, _dest + _range - 1 ],
    ]);
  }

  let mapped: Record<number, Record<keyof typeof maps, number>> = {}

  for (const _seed of seeds) {
    modeIdx = 0;
    mode = modes[modeIdx] as keyof typeof maps;

    if (!mapped[_seed]) mapped[_seed] = {};

    while (mode) {
      let seed = mapped[_seed][modes[modeIdx - 1]] ?? _seed;

      for (const [ source, dest ] of maps[mode]) {
        if (seed >= source[0] && seed <= source[1]) {
          const offset = seed - source[0];
          mapped[_seed][mode] = dest[0] + offset;
        }
      }
      
      if (!mapped[_seed][mode]) mapped[_seed][mode] = seed;

      modeIdx++;
      mode = modes[modeIdx];
    }
  }

  // console.log(mapped);

  let lowest = Infinity;

  for (const { location } of Object.values(mapped)) {
    if (location < lowest) lowest = location;
  }

  return lowest;
}

function part2(lines: Array<string>) {

}

export default function d5({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res };
}
