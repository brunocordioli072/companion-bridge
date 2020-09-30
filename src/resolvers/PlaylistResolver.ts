import { ApolloError } from "apollo-server-lambda";
import { VoidResolver } from "graphql-scalars";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Playlist } from "../entities/Playlist";
import { Track } from "../entities/Track";
import { SpotifyService } from "../services/SpotifyService";

@Resolver()
export class PlaylistResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Mutation(() => VoidResolver, { nullable: true })
  async insertPlaylist(
    @Arg("playlistName", { nullable: true }) playlistName: string
  ): Promise<void> {
    let playlists: Playlist[] = [];
    let playlistSearch = await this.spotifyService.getUserPlaylists();
    playlists = playlistSearch.body.items;
    let playlistNames = playlistSearch.body.items.map((p) => p.name);
    if (!playlistNames.includes(playlistName)) {
      let userSearch = await this.spotifyService.getMe();
      let user = userSearch.body;
      await this.spotifyService.createPlaylist(user.id, playlistName, {
        public: true,
      });
    } else {
      throw new ApolloError("Playlist Not Found", "404");
    }
  }

  @Mutation(() => VoidResolver, { nullable: true })
  async insertArtistsToPlaylist(
    @Arg("playlistId", { nullable: true }) playlistId: string,
    @Arg("artistIds", (type) => [String], { nullable: true })
    artistIds: string[]
  ): Promise<void> {
    let tracks: Track[] = [];
    for (let index = 0; index < artistIds.length; index++) {
      const artistId = artistIds[index];
      let trackSearch = await this.spotifyService.getArtistTopTracks(
        artistId,
        "GB"
      );
      tracks.push(...trackSearch.body.tracks);
    }
    let tracksURIs = tracks.map((t: SpotifyApi.TrackObjectFull) => t.uri);
    await this.spotifyService.addTracksToPlaylist(playlistId, tracksURIs);
  }

  @Mutation(() => VoidResolver, { nullable: true })
  async deletePlaylist(
    @Arg("playlistId", { nullable: true }) playlistId: string
  ): Promise<void> {
    await this.spotifyService.unfollowPlaylist(playlistId);
  }

  @Mutation(() => VoidResolver, { nullable: true })
  async cleanPlaylistTracks(
    @Arg("playlistId", { nullable: true }) playlistId: string
  ): Promise<void> {
    let trackSearch = await this.spotifyService.getPlaylistTracks(playlistId);
    let tracks = trackSearch.body.items;
    let tracksURIs = tracks.map((t) => {
      return { uri: t.track.uri };
    });
    if (tracksURIs.length > 0) {
      await this.spotifyService.removeTracksFromPlaylist(
        playlistId,
        tracksURIs
      );
    } else {
      throw new ApolloError("Playlist Not Found", "404");
    }
  }
}
