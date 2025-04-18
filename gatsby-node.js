// gatsby-node.js

const path = require("path");
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_JSON); // from Netlify

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const siteTemplate = path.resolve(`./src/templates/storefront.js`);

  const snapshot = await db.collection("stores").get();

  snapshot.forEach(doc => {
    const store = doc.data();
    createPage({
      path: `/site/${store.store}`,
      component: siteTemplate,
      context: {
        storeData: store
      }
    });
  });
};
