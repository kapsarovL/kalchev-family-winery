/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kalchevwinery.com",
  generateRobotsTxt: true,
  outDir: "public",
  autoLastmod: true,

  exclude: ["/opengraph-image", "/admin/**", "/api/**", "/_not-found", "/checkout", "/order/**"],

  additionalPaths: async (config) => {
    return [
      {
        loc: "/",
        changefreq: "weekly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
        images: [
          {
            loc: new URL("https://kalchevwinery.com/opengraph-image"),
            caption: "Kalchev Family Winery – Premium Macedonian Wines",
          },
        ],
      },
    ];
  },

  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
