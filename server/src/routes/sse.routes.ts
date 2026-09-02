import express from "express";
import { addClient } from "../services/sse.service";

const router = express.Router();

router.get("/updates", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  addClient(res);

  res.write(
    `data: ${JSON.stringify({
      type: "CONNECTED",
      message: "Live updates connected",
    })}\n\n`
  );
});

export default router;