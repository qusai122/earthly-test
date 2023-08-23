import express from "express";

const app = express();

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;
  console.log(`[${timestamp}] ${method} ${path}`);
  next();
});

app.use(express.json());

function validateReversMessage(req, res, next) {
  const message = req.body.message;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message format" });
  }
  if (message.length < 2 || message.length > 100) {
    return res
      .status(400)
      .json({ error: "Message length should be between (2,100)" });
  }

  next();
}

app.post("/reverse", validateReversMessage, (req, res) => {
  const reversedMessage = req.body.message.split("").reverse().join("");

  res.json({ reversedMessage });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
