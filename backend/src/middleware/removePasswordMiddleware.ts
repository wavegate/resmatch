function removePasswordMiddleware(req, res, next) {
  const originalSend = res.send;

  res.send = function (data) {
    if (typeof data === "string") {
      try {
        // Parse the data if it's a JSON string
        data = JSON.parse(data);
      } catch (err) {
        // If parsing fails, just send the original data
        return originalSend.call(this, data);
      }
    }

    // Recursively remove password fields from the response data
    const removePassword = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(removePassword);
      } else if (obj !== null && typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
          if (key.toLowerCase().includes("password")) {
            delete obj[key];
          } else if (typeof obj[key] === "object") {
            obj[key] = removePassword(obj[key]);
          }
        });
      }
      return obj;
    };

    data = removePassword(data);

    // Convert back to JSON if it was originally a string
    return originalSend.call(this, JSON.stringify(data));
  };

  next();
}

export default removePasswordMiddleware;
