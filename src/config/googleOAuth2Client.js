const { OAuth2Client } = require("google-auth-library");

const googleOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    "http://localhost:1234"
);

module.exports = googleOAuth2Client;