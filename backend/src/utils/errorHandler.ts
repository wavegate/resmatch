export const handleError = (res, error, message = "Internal Server Error") => {
  console.error(message, error, "status=500");
  res.status(500).json({ error: message });
};
