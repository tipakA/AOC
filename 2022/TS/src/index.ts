import { readdir, readFile } from 'fs/promises';
import path from 'path';

async function main() {
  const dayFiles = await readdir(path.join(__dirname, './days')).then(files => files.filter(file => file.endsWith('.js')));

  for (const dayFile of dayFiles) {
    const number = dayFile.slice(0, -3);
    const { default: day } = await import(`./days/${dayFile}`);
    const dayInput = await readFile(`./input/${number}.txt`, 'utf8');

    console.log(number, await day(dayInput));
    console.timeEnd(number.toString());
  }
}

main();
