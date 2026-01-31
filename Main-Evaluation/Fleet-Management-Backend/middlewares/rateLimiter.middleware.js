import rateLimit from "express-rate-limit";

export const vehicleLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: "Too many requests, try again later"
});
