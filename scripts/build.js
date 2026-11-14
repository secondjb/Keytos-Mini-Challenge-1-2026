import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('⚡ Building CSS with Tailwind...');
execSync('npx tailwindcss -i ./src/index.css -o ./dist/tailwind.css --minify', { stdio: 'inherit' });

console.log('⚡ Bundling JS with esbuild...');
execSync('npx esbuild src/main.tsx --bundle --outfile=dist/bundle.js --loader:.ts=ts --loader:.tsx=tsx --minify --define:process.env.NODE_ENV=\\"production\\"', { stdio: 'inherit' });

console.log('⚡ Generating dist/index.html...');
const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CloudPulse Enterprise — Billing & Subscription Center</title>
    <link rel="stylesheet" href="./tailwind.css" />
  </head>
  <body class="bg-slate-950 text-slate-100 min-h-screen selection:bg-rose-500 selection:text-white">
    <div id="root"></div>
    <script defer src="./bundle.js"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent, 'utf-8');

console.log('✅ Build completed successfully for production deployment!');
