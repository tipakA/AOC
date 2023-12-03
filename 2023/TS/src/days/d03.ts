interface FoundPosition {
  idxL: number;
  idxC: number;
}

type FoundNumber = FoundPosition & { num: string };
type FoundSymbol = FoundPosition & { symbol: string };

function part1(lines: Array<string>) {
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

  const parsed = [];

  for (const find of foundSymbols) {
    const positions: Record<number, [number, number]> = {};
    positions[find.idxL - 1] = [ find.idxC - 1, find.idxC + 1 ];
    positions[find.idxL] = [ find.idxC - 1, find.idxC + 1 ];
    positions[find.idxL + 1] = [ find.idxC - 1, find.idxC + 1 ];


    const filtered = foundNumbers.filter(f => {
      const relevantColumns = positions[f.idxL];
      if (!relevantColumns) return false;

      if (relevantColumns[0] <= f.idxC + f.num.length - 1 && relevantColumns[1] >= f.idxC) return true;

      // if (f.idxC >= relevantColumns[0] && (f.idxC + f.num.length - 1) <= relevantColumns[1]) return true;

      return false;
    });

    for (const fN of filtered) parsed.push(parseInt(fN.num));
  }

  return parsed.reduce((a, b) => a + b, 0);
}

function part2(lines: Array<string>) {

}

export default function d3({ lines }: { lines: Array<string> }) {
  const part1Res = part1(lines);
  const part2Res = part2(lines);

  return { p1: part1Res };
}
