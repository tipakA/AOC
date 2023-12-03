interface FoundPosition {
  idxL: number;
  idxC: number;
}

type FoundNumber = FoundPosition & { num: string };
type FoundSymbol = FoundPosition & { symbol: string };

function parseNumbersAndSymbols(lines: Array<string>) {
  let idxL = 0;

  const foundNumbers: Array<FoundNumber> = [];
  const foundSymbols: Array<FoundSymbol> = [];

  for (const line of lines) {
    let idxC = 0;
    const currNum = {
      val: '',
      pos: -1,
    };

    for (const char of line.split('')) {
      const matchNum = char.match(/[0-9]/);

      if (matchNum) {
        currNum.val += char;
        if (currNum.pos === -1) currNum.pos = idxC;
      } else {
        if (currNum.val !== '') {
          foundNumbers.push({ idxL, idxC: currNum.pos, num: currNum.val });
          currNum.val = '';
          currNum.pos = -1;
        }
        if (char !== '.') {
          foundSymbols.push({ idxL, idxC, symbol: char });
        }
      }

      idxC++;
    }

    if (currNum.val !== '') foundNumbers.push({ idxL, idxC: currNum.pos, num: currNum.val });

    idxL++;
  }

  return { foundNumbers, foundSymbols };
}

function findNeighboring<T extends FoundPosition>(iterable: Array<T>, numbers: Array<FoundNumber>) {
  const res = [];

  for (const find of iterable) {
    const positions: Record<number, [number, number]> = {};
    positions[find.idxL - 1] = [ find.idxC - 1, find.idxC + 1 ];
    positions[find.idxL] = [ find.idxC - 1, find.idxC + 1 ];
    positions[find.idxL + 1] = [ find.idxC - 1, find.idxC + 1 ];

    const filtered = numbers.filter(f => {
      const relevantColumns = positions[f.idxL];
      if (!relevantColumns) return false;

      if (relevantColumns[0] <= f.idxC + f.num.length - 1 && relevantColumns[1] >= f.idxC) return true;

      // if (f.idxC >= relevantColumns[0] && (f.idxC + f.num.length - 1) <= relevantColumns[1]) return true;

      return false;
    });

    res.push(filtered);
  }

  return res;
}

function part1(foundNumbers: Array<FoundNumber>, foundSymbols: Array<FoundSymbol>) {
  const found = findNeighboring(foundSymbols, foundNumbers);

  return found.flat().reduce((a, b) => a + parseInt(b.num), 0);
}

function part2(foundNumbers: Array<FoundNumber>, foundSymbols: Array<FoundSymbol>) {
  let sum = 0;

  const foundNeigbors = findNeighboring(foundSymbols.filter(s => s.symbol === '*'), foundNumbers);

  for (const neighbors of foundNeigbors) {
    if (neighbors.length !== 2) continue;
    sum += parseInt(neighbors[0].num) * parseInt(neighbors[1].num);
  }

  return sum;
}

export default function d3({ lines }: { lines: Array<string> }) {
  const { foundNumbers, foundSymbols } = parseNumbersAndSymbols(lines);

  const part1Res = part1(foundNumbers, foundSymbols);
  const part2Res = part2(foundNumbers, foundSymbols);

  return { p1: part1Res, p2: part2Res };
}
