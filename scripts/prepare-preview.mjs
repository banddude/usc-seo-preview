import { readdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const previewUrl = "https://banddude.github.io/usc-seo-preview";
const output = path.resolve("out");
const routes = [];
const htmlFiles = [];
async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.name === "CNAME") throw new Error("CNAME must not be published in the preview");
    if (entry.isDirectory()) await visit(file);
    else if (entry.name.endsWith(".html")) {
      htmlFiles.push(file);
      const html = await readFile(file, "utf8");
      if (!/<meta name="robots" content="noindex, nofollow"\s*\/?\s*>/.test(html)) {
        throw new Error(`Missing noindex, nofollow: ${file}`);
      }
      if (entry.name === "index.html") {
        const relative = path.relative(output, dir).split(path.sep).join("/");
        routes.push(`${previewUrl}/${relative ? `${relative}/` : ""}`);
      }
    }
  }
}
await visit(output);
routes.sort();
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(url => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(path.join(output, "sitemap.xml"), xml);
const robots = await readFile(path.join(output, "robots.txt"), "utf8");
if (!/^Disallow: \/$/m.test(robots) || /^Allow:/m.test(robots)) throw new Error("Preview robots.txt must disallow all crawling");
for (const route of ["services", "collective", "fashion-film-production", "fashion-film-production-cost"]) {
  await access(path.join(output, route, "index.html"));
  if (!routes.includes(`${previewUrl}/${route}/`)) throw new Error(`Missing sitemap route: ${route}`);
}
console.log(`Verified noindex, nofollow on ${htmlFiles.length} HTML files; sitemap includes all ${routes.length} exported pages; robots disallows crawling; no CNAME.`);
