import { readdir, readFile } from 'fs/promises';
import path from 'path';

const args = process.argv.slice(2);

async function main() {
  const dayFiles = await readdir(path.join(__dirname, './days')).then(files => files.filter(file => file.endsWith('.js')));

  for (const dayFile of dayFiles) {
    const number = dayFile.slice(0, -3);
    if (args.length && !args.includes(number)) continue;

    const { default: day } = await import(`./days/${dayFile}`);
    const dayInput = await readFile(`./input/${number}.txt`, 'utf8');
    const lines = dayInput.replaceAll(/\r/g, '').split('\n').slice(0, -1);

    console.time(number);
    console.log(number, await day({ input: dayInput, lines }));
    console.timeEnd(number);
  }
}

main();
