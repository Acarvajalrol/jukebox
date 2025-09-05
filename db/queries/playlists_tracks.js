import db from "#db/client";

export async function createPlaylistsTracks(playlistId, trackId) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const { rows: playlistTrack } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack[0];
}

export async function getPlaylistsTracks(id) {
  const SQL = `
  SELECT * 
  FROM playlists_tracks 
  WHERE playlist_id = $1
  `;
  const { rows: playlistsTracks } = await db.query(SQL, [id]);
  //   console.log(playlistsTracks);
  return playlistsTracks;
}
