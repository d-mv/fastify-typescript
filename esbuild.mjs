/* eslint-disable no-console */
import { build } from 'esbuild';

build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
  minify: true,
  bundle: true,
  platform: 'node',
  target: 'node16',
})
  .catch(reason => {
    console.log(`Build caught error:`);
    console.dir(reason, { depth: 15, color: true });
    process.exit(1);
  })
  .finally(() => {
    console.log('Build is done.');
  });
