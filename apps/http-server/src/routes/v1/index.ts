import { Router } from "express";
import { userRouter } from "./user-routes";



const apiRoutes: Router = Router();

apiRoutes.use("/user", userRouter);



export { apiRoutes }