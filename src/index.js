import express from "express";
import { reverseRouters } from "./routers/index.js";
import { loggingMiddleware } from "./middlewares/index.js";
const app = express();
app.use(loggingMiddleware);
app.use(express.json());

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
