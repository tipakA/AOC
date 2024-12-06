function part1(lines: Array<string>) {
  let safeReports = 0;

  for (const report of lines) {
    const levels = report.split(' ').map(n => parseInt(n));

    let increasing: boolean | null = null;
    let safe: boolean | null = null;

    for (let i = 0; i !== levels.length; i++) {
      const currentLevel = levels[i];
      const nextLevel = levels[i + 1] ?? null;
      if (nextLevel === null) continue;

      const difference = currentLevel - nextLevel;

      if (difference === 0) {
        safe = false;
        break;
      }

      if (Math.abs(difference) > 3) {
        safe = false;
        break;
      }

      if (currentLevel > nextLevel) {
        if (increasing === true) {
          safe = false;
          break;
        }
        increasing = false;
      } else {
        if (increasing === false) {
          safe = false;
          break;
        }
        increasing = true;
      }

      if (safe === null) safe = true;
    }

    if (safe) safeReports++;
  }

  return safeReports;
}

function part2(lines: Array<string>) {

}

export default function d0({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res };
}
