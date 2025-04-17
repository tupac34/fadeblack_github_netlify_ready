const nodemailer = require("nodemailer");
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
      credential: admin.credential.cert(serviceAccount)
    });
    initialized = true;
  }
}

exports.handler = async function(event) {
  initFirebase();
  const { name, url, catalogURL } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `📦 New Supplier Submission: ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Website:</strong> <a href="${url}">${url}</a></p>
      <p><strong>Catalog:</strong> <a href="${catalogURL}">View File</a></p>
    `
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "✅ Email sent" })
  };
};
