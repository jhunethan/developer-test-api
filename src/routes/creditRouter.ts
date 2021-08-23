import {apiRequest, getCreditor} from "../app/creditMethod";

const creditRouter = require("express").Router();


creditRouter.get("/", (req, res) => {
  const output = {};
  res.status(200).send(output);
});

creditRouter.post("/", async (req, res) => {
  const creditor = await getCreditor(req.body)
  res.status(200).send(creditor)
});

module.exports = creditRouter;
