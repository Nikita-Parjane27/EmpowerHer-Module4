export const validateCustomer = (req, res, next) => {
  const { full_name, email, phone } = req.body;
  if (!full_name || !email || !phone) {
    return res.status(400).json({ message: "All fields required" });
  }
  next();
};
