import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";

const HOSTNAME = "https://bristolpublishers.com";

const routes = [
    { url: "/", changefreq: "weekly", priority: 1.0 },

    { url: "/about", changefreq: "monthly", priority: 0.8 },

    { url: "/services/publishing", changefreq: "monthly", priority: 0.9 },
    { url: "/services/ghostwriting", changefreq: "monthly", priority: 0.9 },
    { url: "/services/formatting", changefreq: "monthly", priority: 0.9 },
    { url: "/services/cover-design", changefreq: "monthly", priority: 0.9 },
    { url: "/services/marketing", changefreq: "monthly", priority: 0.9 },
    { url: "/services/audio-book", changefreq: "monthly", priority: 0.9 },

    { url: "/portfolio", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },

    { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
    { url: "/terms-of-service", changefreq: "yearly", priority: 0.3 },
    { url: "/refund-policy", changefreq: "yearly", priority: 0.3 },
];

async function generateSitemap() {
    const sitemapPath = path.resolve("./public/sitemap.xml");
    const writeStream = createWriteStream(sitemapPath);
    const sitemapStream = new SitemapStream({ hostname: HOSTNAME });

    sitemapStream.pipe(writeStream);

    const lastmod = new Date().toISOString();
    routes.forEach((route) => {
        sitemapStream.write({ ...route, lastmod });
    });

    sitemapStream.end();
    await streamToPromise(sitemapStream);

    console.log("Sitemap generated successfully at:", sitemapPath);
}

generateSitemap().catch(console.error);