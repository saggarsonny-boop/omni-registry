const { execSync } = require('child_process');

console.log('--- Starting O.M.N.I. Production Build Process ---');

// 1. Generate sitemap
console.log('Generating dynamic sitemap...');
execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });

// 2. Run standard next build
console.log('Running next build...');
execSync('next build', { stdio: 'inherit' });

// 3. Run next-on-pages if not recursively invoked
if (process.env.CF_PAGES_RECURSION === '1') {
  console.log('Detected recursive Vercel build invocation. Skipping next-on-pages packaging.');
} else {
  console.log('Packaging for Cloudflare Pages (next-on-pages)...');
  process.env.CF_PAGES_RECURSION = '1';
  execSync('npx @cloudflare/next-on-pages', { stdio: 'inherit', env: process.env });
}

console.log('--- O.M.N.I. Build Process Completed Successfully ---');
