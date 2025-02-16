import express from "express";
import cors from "cors";
import { PORT } from "./../config";
import pollRouter from "./routes/poll";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/polls", pollRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
