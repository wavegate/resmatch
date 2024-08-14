export const handleError = (res, error, message = "Internal Server Error") => {
  console.error(message, error);
  res.status(500).json({ error: message });
};
