/* Backend Setup:
Set up a Node.js server using Express.js.
Write an end point to fetch the most active groups from the "groups" and "posts" collections.
*/

import express, { Express } from "express";
import { set, connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

/* CONFIG */
dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("short"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ROUTES */
app.use("/", routes);

const port = process.env.PORT ?? 3000;

set({ strictQuery: false });

async function run() {
  try {
    await connect(process.env.MONGODB_URI ?? "");
    app.listen(port, () => console.log("✅ Server running on PORT", port));
  } catch (err) {
    console.error("❌ Couldn't start the server\n", err);
  }
}

run();
