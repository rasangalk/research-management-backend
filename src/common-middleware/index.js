const jwt = require("jsonwebtoken");
const { UserRefreshClient } = require("google-auth-library");
const googleOAuth2Client = require("../config/GoogleOAuth2Client");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};

exports.googleOauth2 = async (req, res, next) => {
  try {
    const { tokens } = await googleOAuth2Client.getToken(req.body.code);
    console.dir(tokens);

    const user = jwt.decode(tokens.id_token);
    console.dir(user);

    req.user = user;

    next();
  } catch (error) {
    console.dir(error);
    return res.status(400).json({ message: error.message });
  }
}

exports.refreshTokens = async (refreshToken) => {
  const user = new UserRefreshClient(
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    refreshToken
  );
  const { credentials } = await user.refreshAccessToken();
  return credentials;
}

exports.studentMiddleware = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(400).json({ message: "Student access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

exports.supervisorMiddleware = (req, res, next) => {
  if (req.user.role !== "supervisor") {
    return res.status(400).json({ message: "Supervisor access denied" });
  }
  next();
};

exports.staffMiddleware = (req, res, next) => {
  if (req.user.role !== "staff") {
    return res.status(400).json({ message: "Staff access denied" });
  }
  next();
};
