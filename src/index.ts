import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemRouter } from "./newitems";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/items", itemRouter);

// Server Activation
app.listen(PORT, () => {
  console.log(
    `\n ⚡️--> Server started on port ${PORT} => Docker Container at port 13000`
  );
});
