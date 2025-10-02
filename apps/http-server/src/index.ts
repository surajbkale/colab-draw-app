import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { appRoutes } from "./routes";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", appRoutes);

const PORT = 3200;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});