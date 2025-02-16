import { createPoll, getPolls, vote } from "@/controllers/poll";
import { Router } from "express";

const pollRouter = Router();

pollRouter.get("/", getPolls);

pollRouter.post("/", createPoll);

pollRouter.post("/:id/vote", vote);

export default pollRouter;