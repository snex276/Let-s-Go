const fs = require("fs");
const path = require("path");

const domain = "https://letsgonext.com";

let urls = [];

function scanFolder(folder) {
    const files = fs.readdirSync(folder);

    files.forEach(file => {
        const fullPath = path.join(folder, file);

        if (fs.statSync(fullPath).isDirectory()) {

            // Ignore assets folder
            if (file !== "assets") {
                scanFolder(fullPath);
            }

        } else if (file.endsWith(".html")) {

            let urlPath = fullPath
                .replace(__dirname, "")
                .replace(/\\/g, "/");

            if (urlPath === "/index.html") {
                urlPath = "/";
            }

            urls.push(`${domain}${urlPath}`);
        }
    });
}


scanFolder(__dirname);


let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;


urls.forEach(url => {

    sitemap += `
<url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
`;

});


sitemap += `
</urlset>`;


fs.writeFileSync("sitemap.xml", sitemap);


console.log(`Sitemap generated with ${urls.length} pages`);