const jwt = require("jsonwebtoken");

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
