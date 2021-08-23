import { Application } from "express";
import asyncMethod from "../shared/async-method";
import test from "../app/testMethod";
import creditRouter from "./creditRouter"

export default (app: Application): void => {
  app.get("/test", asyncMethod(test));
  app.use("/credit-search", creditRouter);
};
