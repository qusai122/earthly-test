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

app.post("/reverse", (req, res) => {
  if (!req.body.message) {
    return res
      .status(400)
      .json({ error: "Missing message field in the request body" });
  }

  const reversedMessage = req.body.message.split("").reverse().join("");

  res.json({ reversedMessage });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
