const admin = require("firebase-admin");
let initialized = false;
function initFirebase() {
  if (!initialized) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_JSON);
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
    let serviceAccount;
    if (process.env.FIREBASE_SERVICE_JSON) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_JSON);
    } else {
      serviceAccount = require("./service-account.json");
    }
    
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