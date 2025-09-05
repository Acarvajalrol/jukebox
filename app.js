import express from "express";
const app = express();
export default app;

import playlistsTracksRoutes from "./api/playlists_tracks.js";
import playlistsRoutes from "./api/playlists.js";
import tracksRoutes from "./api/tracks.js";

app.use(express.json());

app.use("/", playlistsTracksRoutes);
app.use("/playlists", playlistsRoutes);
app.use("/tracks", tracksRoutes);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send(err);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
