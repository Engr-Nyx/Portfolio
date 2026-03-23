import fs from 'fs';
fs.copyFileSync('dist/index.html', 'dist/404.html');
console.log('Successfully copied index.html to 404.html for GitHub Pages fallback.');
