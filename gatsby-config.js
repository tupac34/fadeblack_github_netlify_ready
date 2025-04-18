module.exports = {
    siteMetadata: {
      title: `FadeBlack`,
      description: `Launch your own print-on-demand store with FadeBlack.`,
      author: `@fadeblack`,
      siteUrl: `https://fadeblack.netlify.app`,
    },
    plugins: [
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `FadeBlack Store Platform`,
          short_name: `FadeBlack`,
          start_url: `/`,
          background_color: `#000000`,
          theme_color: `#ffffff`,
          display: `standalone`,
          icon: `src/images/icon.png`, // Add your icon file
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `products`,
          path: `${__dirname}/src/products/`, // For markdown/JSON-based product storage
        },
      },
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          trackingIds: [
            "G-XXXXXXXXXX", // 🔁 Replace with your Google Analytics ID
          ],
          pluginConfig: {
            head: true,
          },
        },
      },
    ],
  };
  