import { Router } from "express";
import { userRouter } from "./user-routes";
import { roomRouter } from "./room-routes";

const apiRoutes: Router = Router();

apiRoutes.use("/user", userRouter);
apiRoutes.use("/room", roomRouter);

export { apiRoutes };
