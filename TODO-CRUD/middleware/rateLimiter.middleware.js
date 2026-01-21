const requests = {};
const LIMIT = 15;
const WINDOW = 60 * 1000;

module.exports = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests[ip]) {
    requests[ip] = [];
  }

  requests[ip] = requests[ip].filter(
    (time) => now - time < WINDOW
  );

  if (requests[ip].length >= LIMIT) {
    return res.status(429).json({
      error: "Too many requests, please try again later",
    });
  }

  requests[ip].push(now);
  next();
};
