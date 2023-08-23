import express from "express";
import { reverseRouters } from "./routers/index.js";
import {
  loggingMiddleware,
  errorHandler,
  notFoundHandler,
} from "./middlewares/index.js";

const app = express();

app.use(loggingMiddleware);
app.use(express.json());
app.use(errorHandler);
app.use("/reverse", reverseRouters);
app.use(notFoundHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
