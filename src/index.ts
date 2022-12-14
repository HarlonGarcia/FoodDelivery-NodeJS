import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import http from "node:http";
import { Server } from "socket.io";
import { router } from "./router";
import "module-alias/register";

const db_url = "mongodb://0.0.0.0:27017";
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(db_url)
  .then(() => {
    const port = process.env.PORT || 3001;

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      next();
    });
    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar o MongoDB: " + error));
