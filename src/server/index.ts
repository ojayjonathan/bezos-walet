import path from "path";
import express, { Request, Response, NextFunction, Express } from "express";
import compression from "compression";
import { config } from "dotenv";

import MiddlewareError from "./utils/MiddlewareError";
import apiRouter from "./routes/api";

config();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST: string = process.env.HOST || "localhost";
const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Environment variable for database was not set.");
}

const app: Express = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(compression());

/* STATIC SERVER */
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.resolve(__dirname, "./../client")));
}

/* ROUTES */
app.use("/api", apiRouter);

// Using default 404 page for now
/* GLOBAL ERROR HANDLER */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (err: MiddlewareError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    const defaultClientError: MiddlewareError = new MiddlewareError(
      "Unknown server error. Please check server log.",
      500
    );
    const clientError: MiddlewareError =
      err instanceof MiddlewareError
        ? Object.assign(defaultClientError, err)
        : defaultClientError;

    res
      .status(clientError.status)
      .send(JSON.stringify({ error: clientError.error }));
  }
);

/* INIT SERVER */
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, HOST, () =>
    console.log(`Server listening on http://${HOST}:${PORT}`)
  );
}

export default app;
