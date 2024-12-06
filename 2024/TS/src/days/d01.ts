function parseLines(lines: Array<string>) {
  const leftList: Array<number> = [];
  const rightList: Array<number> = [];

  for (const line of lines) {
    const [ left, right ] = line.split('   ');
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
  }

  return { leftList, rightList };
}

function part1(lines: Array<string>) {
  const { leftList, rightList } = parseLines(lines);

  const sortedLeftList = leftList.toSorted((a, b) => a - b);
  const sortedRightList = rightList.toSorted((a, b) => a - b);

  let totalDistance = 0;

  for (let i = 0; i !== sortedLeftList.length; i++) {
    totalDistance += Math.abs(sortedLeftList[i] - sortedRightList[i]);
  }

  return totalDistance;
}

function part2Filter(lines: Array<string>) {
  const { leftList, rightList } = parseLines(lines);

  let totalSimilarity = 0;

  for (const left of leftList) {
    const rightListCount = rightList.filter(right => right === left).length;

    totalSimilarity += left * rightListCount;
  }

  return totalSimilarity;
}

function part2Pre(lines: Array<string>) {
  const { leftList, rightList } = parseLines(lines);

  const preFilteredRightList: Record<number, number> = {};

  for (const right of rightList) {
    preFilteredRightList[right] = (preFilteredRightList[right] ?? 0) + 1;
  }

  let totalSimilarity = 0;

  for (const left of leftList) {
    totalSimilarity += left * (preFilteredRightList[left] ?? 0);
  }

  return totalSimilarity;
}

export default function d1({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  // const part2Res = part2Filter(lines);
  const part2Res = part2Pre(lines);

  return { p1: part1Res, p2: part2Res };
}
