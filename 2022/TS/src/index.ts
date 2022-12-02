import path from 'path';
import { readdir } from 'fs/promises';

async function main() {
  const dayFiles = await readdir(path.join(__dirname, './days')).then(files => files.filter(file => file.endsWith('.js')));

  for (const dayFile of dayFiles) {
    const number = dayFile.slice(0, -3);
    const { default: day } = await import(`./days/${dayFile}`);

    console.log(number, await day());
  }
}

main();
