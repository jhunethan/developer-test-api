import express from "express"
import { getCreditorInfo } from "../app/creditMethod";

const creditRouter = express.Router();

creditRouter.get("/", (req, res) => {
  const output = {};
  res.status(200).send(output);
});

creditRouter.post("/", async (req, res) => {
  const creditor = await getCreditorInfo(req.body);
  res.status(200).send(creditor);
});

export default creditRouter;
