function part1(lines: Array<string>) {
  const leftList: Array<number> = [];
  const rightList: Array<number> = [];

  for (const line of lines) {
    const [ left, right ] = line.split('   ');
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
  }

  const sortedLeftList = leftList.toSorted((a, b) => a - b);
  const sortedRightList = rightList.toSorted((a, b) => a - b);

  let totalDistance = 0;

  for (let i = 0; i !== sortedLeftList.length; i++) {
    totalDistance += Math.abs(sortedLeftList[i] - sortedRightList[i]);
  }

  return totalDistance;
}

function part2(lines: Array<string>) {

}

export default function d0({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res };
}
