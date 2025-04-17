const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const admin = require("firebase-admin");
let initialized = false;

function initFirebase() {
  if (!initialized) {
    let serviceAccount;
    if (process.env.FIREBASE_SERVICE_JSON) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_JSON);
    } else {
      serviceAccount = require("./service-account.json");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    initialized = true;
  }
}

exports.handler = async (event) => {
  try {
    initFirebase();
    const body = JSON.parse(event.body);
    const { recipient, items } = body;

    const response = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipient, items })
    });

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
