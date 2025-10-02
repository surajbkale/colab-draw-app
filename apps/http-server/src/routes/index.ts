import { Router } from "express";
import { apiRoutes } from "./v1";

const appRoutes: Router = Router();

appRoutes.use("/v1", apiRoutes);

export { appRoutes };