import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
import express from "express";
const router = express.Router();
export default router;

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) {
      return res.status(400).send("Missing request body");
    } else if (!req.body.name || !req.body.description) {
      return res.status(400).send("Missing required fields");
    } else {
      try {
        const { name, description } = req.body;

        const playlist = await createPlaylist(name, description);

        return res.status(201).send(playlist);
      } catch (e) {
        return res.status(400).send(e);
      }
    }
  });

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylistById(id);
  if (!playlist) {
    return res.status(404).send("Playlist does not exist");
  } else {
    return res.status(200).send(playlist);
  }
});
