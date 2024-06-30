const { AuthorizationCode } = require('simple-oauth2');
require('dotenv').config();
const client = new AuthorizationCode({
  client: {
    id: process.env.OUTLOOK_CLIENT_ID,
    secret: process.env.OUTLOOK_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token',
  },
});

// Generate a URL for user authorization
const getAuthUrl = () => {
  const authorizationUri = client.authorizeURL({
    redirect_uri: process.env.OUTLOOK_REDIRECT_URI,
    scope: ['https://outlook.office.com/mail.read', 'https://outlook.office.com/mail.send'],
    response_type: 'code',
  });
  return authorizationUri;
};

// Get tokens after user authorization
const getTokens = async (code) => {
  const tokenParams = {
    code,
    redirect_uri: process.env.OUTLOOK_REDIRECT_URI,
    scope: ['https://outlook.office.com/mail.read', 'https://outlook.office.com/mail.send'],
  };

  const accessToken = await client.getToken(tokenParams);
  return accessToken.token;
};

module.exports = { getAuthUrl, getTokens };
