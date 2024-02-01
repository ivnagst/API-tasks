import assert from 'node:assert';
import { generate } from 'csv-generate';
import { parse } from 'csv-parse';
import axios from 'axios';
import fs from 'fs';

const csvPath = new URL('./tasks.csv', import.meta.url).pathname;

async function run() {
  const stream = fs.createReadStream(csvPath);
  const csvParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2, // skip the header line
  });

  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    await axios.post('http://localhost:3333/tasks', {
      title,
      description,
    });

    // Uncomment this line to see the import working in slow motion (open the db.json)
    // await wait(1000);
  }
}

run();

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
