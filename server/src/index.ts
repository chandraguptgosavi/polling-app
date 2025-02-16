import express from "express";
import cors from "cors";
import { CLIENT_URL, PORT } from "./../config";
import pollRouter from "./routes/poll";

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.use("/polls", pollRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
