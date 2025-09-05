import db from "#db/client";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistsTracks } from "./queries/playlists_tracks.js";
import { createTrack } from "./queries/tracks.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 20; i++) {
    const name = faker.music.songName();
    const duration_ms = faker.number.int({ min: 0, max: 10 });
    await createTrack(name, duration_ms);
  }
  for (let i = 0; i < 10; i++) {
    const name = faker.music.album();
    const description = faker.music.genre();
    await createPlaylist(name, description);
  }
  for (let i = 0; i < 15; i++) {
    const playlistId = faker.number.int({ min: 1, max: 10 });
    const trackId = faker.number.int({ min: 1, max: 20 });
    await createPlaylistsTracks(playlistId, trackId);
  }
}
