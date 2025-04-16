const admin = require("firebase-admin");
let initialized = false;
function initFirebase() {
  if (!initialized) {
    const serviceAccount = require("./service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    initialized = true;
  }
}

exports.handler = async (event) => {
  try {
    initFirebase();
    const { order } = JSON.parse(event.body);
    const db = admin.firestore();

    await db.collection("upgrades").add({
      email: order.payer.email_address,
      orderID: order.id,
      name: order.payer.name.given_name,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ Upgrade stored successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};