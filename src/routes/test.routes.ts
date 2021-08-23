import { Application } from "express";
import asyncMethod from "../shared/async-method";
import test from "../app/testMethod";
const creditRouter = require("./creditRouter");

export default (app: Application): void => {
  app.get("/test", asyncMethod(test));
  app.use("/credit-search", creditRouter);
};
