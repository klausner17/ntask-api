import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger";
import compression from "compression";
import helmet from "helmet";

module.exports = app => {
  app.set("port", process.env.PORT || 3000);
  app.use(
    morgan("common", {
      stream: {
        write: message => {
          logger.info(message);
        }
      }
    })
  );
  app.use(helmet());
  app.use(
    cors({
      origin: ["http://localhost:3001"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-type", "Authorization"]
    })
  );
  app.use(compression());
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(express.static("public"));
};
