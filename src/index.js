import express from "express";
import { reverseRouters } from "./routers/index.js";
import { loggingMiddleware } from "./middlewares/index.js";
const app = express();
app.use(loggingMiddleware);
app.use(express.json());

function validateReversMessage(req, res, next) {
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
}

app.use("/reverse", reverseRouters);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
