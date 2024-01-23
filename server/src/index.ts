import express from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});
