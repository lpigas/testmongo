const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");

const configuration = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins(
  [[optimizedImages, { inlineImageLimit: 1 }], [withFonts]],
  configuration
);
module.exports = {
  env: {
    API_PRODUCTDATA: process.env.API_PRODUCTDATA,
    MONGODB_DB: process.env.MONGODB_DB,
  },
  images: {
    domains: ["images.prom.ua", "cdn-icons-png.flaticon.com"],
  },
};
