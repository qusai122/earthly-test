const validateReversMessage = (req, res, next) => {
  const message = req.body.message;
  const contentType = req.get("Content-Type");

  if (contentType !== "application/json") {
    return res
      .status(400)
      .json({ error: "Invalid Content-Type. Expected application/json." });
  }

  if (!message) {
    return res
      .status(400)
      .json({ error: "Missing message field in the request body" });
  }

  if (typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message format" });
  }

  if (message.length < 2 || message.length > 100) {
    return res
      .status(400)
      .json({ error: "Message length should be between (2,100)" });
  }

  next();
};

export default validateReversMessage;
