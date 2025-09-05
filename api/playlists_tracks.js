import { getPlaylistById } from "#db/queries/playlists";
import {
  createPlaylistsTracks,
  getPlaylistsTracks,
} from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import express from "express";
const router = express.Router();
export default router;

router
  .route("/playlists/:id/tracks")
  .get(async (req, res) => {
    const { id } = req.params;
    const playlist = await getPlaylistById(id);
    if (playlist) {
      const tracks = await getPlaylistsTracks(id);
      try {
        return res.status(200).send(tracks);
      } catch (e) {
        return res.status(400).send(e);
      }
    } else {
      return res.status(404).send("Playlist does not exists");
    }
  })

  .post(async (req, res) => {
    const { id } = req.params;
    if (!req.body) {
      return res.status(400).send("You are missing the request body.");
    }
    const { trackId } = req.body;
    const playlist = await getPlaylistById(id);

    if (!playlist) {
      return res.status(404).send("Playlist id does not exist.");
    } else if (!req.body) {
      return res.status(400).send("You are missing the request body.");
    } else if (!req.body.trackId) {
      return res.status(400).send("You are missing the required fields.");
    }

    try {
      console.log(req.body);
      const playlistTrack = await createPlaylistsTracks(playlist.id, trackId);
      return res.status(201).send(playlistTrack);
    } catch (e) {
      return res.status(400).send(e);
    }
  });
