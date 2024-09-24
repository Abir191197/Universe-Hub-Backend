import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { initSocket } from "./socket"; // Ensure this path is correct

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });

    // Initialize Socket.IO with the HTTP server
    initSocket(server);
  } catch (err) {
    console.error(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 Unhandled rejection detected, shutting down...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.log(`😈 Uncaught exception detected, shutting down...`, err);
  process.exit(1);
});
