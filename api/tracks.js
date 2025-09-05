import { getTrackById, getTracks } from "#db/queries/tracks";
import express from "express";
const router = express.Router();
export default router;

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;

  const track = await getTrackById(id);
  if (!track) {
    return res.status(404).send("Track does not exist");
  } else {
    return res.send(track);
  }
});
