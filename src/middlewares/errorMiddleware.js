export const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
};
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
};
