// -*- coding: utf-8 -*-
const fs = require('fs');
const path = require('path');

const codesDir = path.join(__dirname, '../data/codes');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

console.log("Generating dynamic sitemap.xml with 50+ seed clinical codes...");

try {
  const jsonFiles = fs.readdirSync(codesDir).filter(f => f.endsWith('.json'));
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://omni.universaldocument.org/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://omni.universaldocument.org/browse</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://omni.universaldocument.org/convert</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://omni.universaldocument.org/governance</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://omni.universaldocument.org/paper</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://omni.universaldocument.org/api</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://omni.universaldocument.org/integrate</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Add all 53 medical codes dynamically
  jsonFiles.forEach(file => {
    const rawContent = fs.readFileSync(path.join(codesDir, file), 'utf8');
    const codeObj = JSON.parse(rawContent);
    const id = codeObj.omni_id;
    
    xml += `  <url>
    <loc>https://omni.universaldocument.org/code/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  xml += `</urlset>\n`;
  
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Successfully generated dynamic sitemap.xml with ${jsonFiles.length + 6} pages indexed!`);
} catch (err) {
  console.error("Failed to generate sitemap.xml dynamically:", err);
  process.exit(1);
}
