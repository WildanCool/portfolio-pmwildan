
import fs from "node:fs";
import path from "node:path";

const folder = "./public/images/sequence";

const files = fs.readdirSync(folder);

const frames = files
  .filter((file) => /^frame_\d+.*\.jpg$/i.test(file))
  .sort((a, b) => {
    const numberA = Number(a.match(/^frame_(\d+)/i)[1]);
    const numberB = Number(b.match(/^frame_(\d+)/i)[1]);

    if (numberA !== numberB) {
      return numberA - numberB;
    }

    return a.localeCompare(b, undefined, {
      numeric: true,
    });
  });

const output = `export const frames = ${JSON.stringify(
  frames.map((file) => `/images/sequence/${file}`),
  null,
  2
)} as const;
`;

fs.mkdirSync("./src/data", { recursive: true });

fs.writeFileSync("./src/data/frames.ts", output);

console.log(`Berhasil membuat ${frames.length} frame!`);
