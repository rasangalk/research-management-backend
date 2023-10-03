const jwt = require('jsonwebtoken');
const { UserRefreshClient } = require('google-auth-library');
const googleOAuth2Client = require('../config/GoogleOAuth2Client');

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: 'Authorization required' });
  }
  next();
};

exports.googleOauth2 = async (req, res, next) => {
  try {
    const { tokens } = await googleOAuth2Client.getToken(req.body.code);
    console.dir(tokens);

    const user = await googleOAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    });
    console.dir(user.getPayload());

    req.user = user.getPayload();

    next();
  } catch (error) {
    console.dir(error);
    return res.status(400).json({ message: error.message });
  }
};

exports.refreshTokens = async (refreshToken) => {
  const user = new UserRefreshClient(
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    refreshToken
  );
  const { credentials } = await user.refreshAccessToken();
  return credentials;
};

exports.studentMiddleware = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res
      .status(400)
      .json({ error: 'Authorization fail: Access limited to students' });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(400)
      .json({ error: 'Authorization fail: Access limited to admin' });
  }
  next();
};

exports.supervisorMiddleware = (req, res, next) => {
  if (req.user.role !== 'supervisor') {
    return res
      .status(400)
      .json({ error: 'Authorization fail: Access limited to supervisor' });
  }
  next();
};

exports.coSupervisorMiddleware = (req, res, next) => {
  if (req.user.role !== 'supervisor') {
    return res
      .status(400)
      .json({ error: 'Authorization fail: Access limited to co-supervisor' });
  }
  next();
};

exports.staffMiddleware = (req, res, next) => {
  if (req.user.role !== 'staff') {
    return res
      .status(400)
      .json({ error: 'Authorization fail: Access limited to staff' });
  }
  next();
};
