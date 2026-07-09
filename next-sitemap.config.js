/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kalchevwinery.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: "public",
  autoLastmod: true,

  alternateRefs: [
    { href: "https://kalchevwinery.com", hreflang: "x-default" },
    { href: "https://kalchevwinery.com", hreflang: "en" },
    { href: "https://kalchevwinery.com", hreflang: "mk" },
    { href: "https://kalchevwinery.com", hreflang: "el" },
  ],

  changefreq: {
    "/": "weekly",
  },
  priority: {
    "/": 1.0,
  },

  transform: async (config, path) => {
    const defaultEntry = {
      loc: path,
      changefreq: config.changefreq[path] || "monthly",
      priority: config.priority[path] || 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };

    if (path === "/") {
      return {
        ...defaultEntry,
        images: [
          {
            loc: new URL("https://kalchevwinery.com/opengraph-image"),
            caption: "Kalchev Family Winery – Premium Macedonian Wines",
          },
        ],
      };
    }

    return defaultEntry;
  },

  additionalPaths: async (config) => [await config.transform(config, "/")],

  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
