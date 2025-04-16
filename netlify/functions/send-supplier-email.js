const nodemailer = require("nodemailer");

exports.handler = async function(event) {
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
