const sensitiveKeys = new Set([
  "password",
  "email",
  "googleId",
  "redditId",
  "discordId",
]);

function removeSensitiveFieldsMiddleware(req, res, next) {
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

    // Recursively remove password and email fields from the response data
    const removeSensitiveFields = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(removeSensitiveFields);
      } else if (obj !== null && typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
          if (sensitiveKeys.has(key)) {
            delete obj[key];
          } else if (typeof obj[key] === "object") {
            obj[key] = removeSensitiveFields(obj[key]);
          }
        });
      }
      return obj;
    };

    data = removeSensitiveFields(data);

    // Convert back to JSON if it was originally a string
    return originalSend.call(this, JSON.stringify(data));
  };

  next();
}

export default removeSensitiveFieldsMiddleware;
