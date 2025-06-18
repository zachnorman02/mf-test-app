// filepath: generateSignedUrl.js
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const fs = require("fs");
require('dotenv').config();

const url = process.env.CLOUDFRONT_URL;
const privateKey = fs.readFileSync("private_key.pem", "utf8").trim();
const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // ISO string

(async () => {
  try {
    const signedUrl = await getSignedUrl({
      url: url,
      keyPairId: keyPairId,
      privateKey: privateKey,
      dateLessThan: expiresAt,
    });

    console.log("✅ Signed URL:", signedUrl);
  } catch (err) {
    console.error("❌ Error generating signed URL:", err);
  }
})();
