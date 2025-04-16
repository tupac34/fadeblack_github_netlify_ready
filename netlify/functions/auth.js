exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const { email, action } = body;

    if (!email || !action) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing email or action" })
      };
    }

    // ✅ Log or handle actions
    console.log(`📨 ${action.toUpperCase()} - ${email}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `✅ ${action} logged for ${email}` })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("./service-account.json"); // ⛳ Add your private key
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const admin = require("firebase-admin");

let initialized = false;
function initFirebase() {
  if (!initialized) {
    const serviceAccount = require("./service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    initialized = true;
  }
}

exports.handler = async function (event) {
  try {
    initFirebase();

    const { email, action } = JSON.parse(event.body);

    if (!email || !action) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing email or action" })
      };
    }

    const db = admin.firestore();
    await db.collection("activity").add({
      email,
      action,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `✅ ${action} logged for ${email}` })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
